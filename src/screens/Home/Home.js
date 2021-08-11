import React, { useState } from 'react';
import { NativeModules, StatusBar } from 'react-native';

import styled from '@emotion/native';

import { useAppState } from '../../context';

import { PlayButton, StopButton } from '../../components';

const HomeScreen = () => {
  const [active, setActive] = useState(false);

  return (
    <SafeArea>
      <PageStyled>
        {active ? (
          <StopButton
            fill="#ffd3b6"
            width={300}
            height={300}
            onPress={async () => {
              setActive(false);

              NativeModules.Vibrate.stop();
            }}
          />
        ) : (
          <PlayButton
            fill="#698474"
            width={300}
            height={300}
            onPress={() => {
              setActive(true);

              NativeModules.Vibrate.start();
            }}
          />
        )}
      </PageStyled>
    </SafeArea>
  );
};

const SafeArea = styled.SafeAreaView`
  flex: 1;
  margin-top: ${StatusBar.currentHeight || 0};
`;

const PageStyled = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;

  padding: 8px;

  background-color: #fcf8f3;
`;

export { HomeScreen };
