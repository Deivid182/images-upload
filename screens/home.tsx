import ProgressBar from '../src/components/progress-bar';
import Uploading from '../src/components/uploading';
import { Ionicons } from '@expo/vector-icons';
import {
  FlatList,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  ImagePickerAsset,
  MediaTypeOptions,
  launchCameraAsync,
  launchImageLibraryAsync,
} from 'expo-image-picker';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import {
  addDoc,
  collection,
  onSnapshot,
} from 'firebase/firestore';
import { storage, db } from '../firebase-config';
import { useState, useEffect } from 'react';

const HomeScreen = () => {
  const [image, setImage] = useState<ImagePickerAsset>();
  const [progress, setProgress] = useState(0);
  const [files, setFiles] = useState<Record<string, unknown>[]>([])

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'files'), (querySnapshot) => {
      querySnapshot.docChanges().forEach((change) => {
        if(change.type === 'added') {
          setFiles((prevFiles) => [...prevFiles, change.doc.data()])
        }
      })
    })
    return () => unsubscribe()
  }, [])

  const pickImage = async () => {
    let result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
      await uplodImage(result.assets[0].uri);
    }
  };

  const pickVideo = async () => {
    let result = await launchCameraAsync({
      mediaTypes: MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);
  };

  const uplodImage = async (uri: string) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    const storageRef = ref(storage, `images/${Date.now()}`);
    const uploadTask = uploadBytesResumable(storageRef, blob);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(Math.round(progress));
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log('File available at', downloadURL);
          await saveRecord(downloadURL, new Date().toISOString());
          setImage(undefined);
        });
      }
    );
  };

  const saveRecord = async (url: string, createdAt: string) => {
    try {
      const docRef = await addDoc(collection(db, 'files'), {
        url, createdAt
      })
      console.log('Document written with ID: ', docRef.id);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View
      style={{
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <FlatList
        data={files}
        renderItem={({ item }) => {
          return (
            <Image
                source={{ uri: item.url as string  }}
                style={{ width: 200, height: 200, borderRadius: 10, margin: 10 }}
            />
          )
        }}
      />
      {image?.uri && <Uploading progress={progress} imageSrc={image.uri} />}
      <TouchableOpacity
        onPress={pickImage}
        style={{
          position: 'absolute',
          bottom: 90,
          right: 20,
          width: 50,
          height: 50,
          backgroundColor: 'black',
          borderRadius: 25,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Ionicons name='image' size={24} color={'white'} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 150,
          right: 20,
          width: 50,
          height: 50,
          backgroundColor: 'black',
          borderRadius: 25,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Ionicons name='videocam' size={24} color={'white'} />
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
