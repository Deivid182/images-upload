import { View } from 'react-native';
import { Rect, Svg } from 'react-native-svg';

interface Props {
  progress: number;
}

const ProgressBar = ({ progress = 0 }: Props) => {

  const barWidth = 230
  const progressWidth = (progress / 100) * barWidth

  return (
    <View>
      <Svg width={barWidth} height={'7'}>
        <Rect
          width={barWidth}
          height={'100%'}
          fill={'#eeeeee'}
        />
        <Rect
          width={progressWidth}
          height={'100%'}
          fill={'#3478f6'}
        />
      </Svg>
    </View>
  )
}

export default ProgressBar