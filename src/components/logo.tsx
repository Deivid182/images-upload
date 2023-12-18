import { View } from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

const Logo = () => {
  return (
    <View>
      <Svg height="100" width="100">
        <Rect x="0" y="0" width="100" height="100" fill="black" />
        <Circle cx="50" cy="50" r="30" fill="yellow" />
        <Circle cx="40" cy="40" r="4" fill="black" />
        <Circle cx="60" cy="40" r="4" fill="black" />
        <Path d="M 40 60 A 10 10 0 0 0 60 60" stroke="black" />
      </Svg>
    </View>
  );
};

export default Logo;