import {
  Image,
  Button,
  Text,
  TouchableOpacity,
  View,
  StyleSheet
} from 'react-native'
import { BlurView } from 'expo-blur'
import { Video } from 'expo-av'
import ProgressBar from './progress-bar'

interface Props {
  progress: number
  videoSrc?: string
  imageSrc?: string
}

const Uploading: React.FC<Props> = ({ progress, videoSrc, imageSrc }) => {
  return (
    <View
      style={[StyleSheet.absoluteFill, {
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1
      }]}
    >
      <BlurView
        style={StyleSheet.absoluteFill}
        intensity={40}
        tint="dark"
      >

      </BlurView>
      <BlurView
        intensity={40}
        tint="light"
        blurReductionFactor={6}
        style={{ width: '80%', alignItems: 'center', rowGap: 12, paddingVertical: 16, borderRadius: 20, overflow: 'hidden'}} 
      >
        {videoSrc && (
          <Video
            source={{ uri: videoSrc }}
            videoStyle={{}}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            style={{ width: 200, height: 200 }}
            useNativeControls
            />
            )}

        {imageSrc && (
          <Image
            source={{ uri: imageSrc }}
            style={{ width: '80%', height: '80%', borderRadius: 6, resizeMode: 'contain'  }}
          />

        )}
        <Text style={{ fontSize: 16, color: '#202020' }}>Uploading</Text>
        <ProgressBar progress={progress}/>
        <View
          style={{
            height: 2,
            width: '100%',
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: '#00000020',
          }}
        >
        </View>
        <TouchableOpacity>
          <Text style={{fontSize: 14, color: '#3478f6'}}>
            Cancel
          </Text>
        </TouchableOpacity>
      </BlurView>
    </View>
  )
}

export default Uploading