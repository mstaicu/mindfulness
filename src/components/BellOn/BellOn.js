import React from 'react';
import { TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export const BellOn = ({ onPress = () => {}, ...rest }) => (
  <TouchableOpacity accessibilityRole="button" onPress={onPress}>
    <Svg viewBox="0 0 512 512" {...rest}>
      <Path d="M466.96 380.91c-2.033-10.857-12.483-18.009-23.341-15.974-10.856 2.035-18.009 12.485-15.975 23.341 1.51 8.055-2.031 13.795-4.275 16.5-2.239 2.697-7.215 7.223-15.38 7.223H104.397c-8.165 0-13.141-4.525-15.38-7.223-2.244-2.705-5.785-8.445-4.275-16.5 5.673-30.272 17.056-50.183 28.064-69.439C126.176 295.455 140 271.274 140 234v-30c0-63.067 51.263-115.072 114.302-115.987h3.781C320.908 88.925 372 140.93 372 204v30c0 31.723 10.377 53.552 20.104 71.523 3.62 6.688 10.5 10.484 17.606 10.484 3.215 0 6.477-.777 9.502-2.415 9.715-5.257 13.327-17.395 8.069-27.108C417.604 268.602 412 254.281 412 234v-30c0-41.161-15.943-80.037-44.894-109.466-24.81-25.222-56.667-40.96-91.106-45.304V20c0-11.046-8.954-20-20-20s-20 8.954-20 20v29.289C159.542 59.209 100 125.181 100 204v30c0 26.647-9.673 43.566-21.919 64.986-12.064 21.104-25.739 45.023-32.655 81.924-3.301 17.616 1.369 35.626 12.813 49.414C69.673 444.1 86.497 452 104.397 452h91.989c0 33.084 26.916 60 60 60s60-26.916 60-60h91.603c17.9 0 34.725-7.9 46.158-21.676 11.444-13.788 16.114-31.798 12.813-49.414zM256.387 472c-11.028 0-20-8.972-20-20h40c0 11.028-8.972 20-20 20zM108.363 45.098c-8.23-7.368-20.874-6.668-28.241 1.562C41.352 89.97 20 145.85 20 204.006c0 11.046 8.954 20 20 20s20-8.954 20-20c0-48.298 17.73-94.703 49.925-130.667 7.367-8.23 6.668-20.874-1.562-28.241zM431.878 46.66c-7.367-8.229-20.012-8.929-28.241-1.562s-8.929 20.011-1.562 28.241C434.27 109.304 452 155.708 452 204.006c0 11.046 8.954 20 20 20s20-8.954 20-20c0-58.156-21.352-114.036-60.122-157.346z" />
    </Svg>
  </TouchableOpacity>
);
