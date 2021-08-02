import React from 'react';
import { NativeModules } from 'react-native';

import styled from '@emotion/native';

import { Dice } from '../../components';

import { useAppState } from '../../context';

const getRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const generateVibrationPattern = () => {
  const noOfVibrations = getRandomNumber(2, 10);

  const vPattern = Array.from(
    { length: noOfVibrations * 2 },
    () =>
      // Reduce range and multiply in order to get random numbers multiple of X
      getRandomNumber(1, 5) * 50,
  );
  const vAmplitudes = vPattern.map((_, index) =>
    // For each odd index, i.e. vibration pattern, get a random amplitude multiple of 50
    index % 2 !== 0 ? getRandomNumber(1, 5) * 50 : 0,
  );

  return {
    vPattern,
    vAmplitudes,
  };
};

const ConfigScreen = () => {
  const [, updateAppState] = useAppState();

  return (
    <PageStyled>
      <Dice
        fill="#ffd3b6"
        width={300}
        height={300}
        onPress={async () => {
          const { vPattern, vAmplitudes } = generateVibrationPattern();

          NativeModules.Vibrate.test(vPattern, vAmplitudes);

          updateAppState({
            vibrationPattern: vPattern,
            vibrationAmplitudes: vAmplitudes,
            repeatInterval: 30 * 60 * 1000,
          });
        }}
      />
    </PageStyled>
  );
};

const PageStyled = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;

  padding: 8px;

  background-color: #fcf8f3;
`;

export { ConfigScreen };
