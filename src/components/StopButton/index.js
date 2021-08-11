import React from 'react';
import { TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export const StopButton = ({ onPress = () => {}, ...rest }) => (
  <TouchableOpacity accessibilityRole="button" onPress={onPress}>
    <Svg viewBox="0 0 320 320" {...rest}>
      <Path d="m288 0h-256c-17.632 0-32 14.368-32 32v256c0 17.632 14.368 32 32 32h256c17.632 0 32-14.368 32-32v-256c0-17.632-14.368-32-32-32z" />
    </Svg>
  </TouchableOpacity>
);
