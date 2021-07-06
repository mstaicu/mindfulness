import React from 'react';
import { NativeModules } from 'react-native';

import styled from '@emotion/native';

import { useAppState } from '../../context';

import { BellOff, BellOn } from '../../components';

const HomeScreen = () => {
  const [{ active }, updateAppState] = useAppState();

  return (
    <PageStyled>
      {active ? (
        <BellOn
          fill="#698474"
          width={300}
          height={300}
          onPress={async () => {
            updateAppState({
              active: false,
            });

            NativeModules.Vibrate.stop();
          }}
        />
      ) : (
        <BellOff
          fill="#ffd3b6"
          width={300}
          height={300}
          onPress={() => {
            updateAppState({
              active: true,
            });

            NativeModules.Vibrate.start();
          }}
        />
      )}
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

export { HomeScreen };
