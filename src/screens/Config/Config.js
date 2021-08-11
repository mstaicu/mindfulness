import React from 'react';
import { StatusBar } from 'react-native';

import styled from '@emotion/native';

import { useAppState } from '../../context';

const ConfigScreen = () => {
  const [{ repeatInterval }, updateAppState] = useAppState();

  return (
    <SafeArea>
      <PageStyled>
        <IntervalInput
          keyboardType="numeric"
          value={String(repeatInterval)}
          onChangeText={(text) =>
            updateAppState({
              repeatInterval: Number(text),
            })
          }
        />
        <IntervalLabel>Intervalul în minute</IntervalLabel>
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

const IntervalInput = styled.TextInput`
  padding: 16px;

  border-radius: 4px;

  font-size: 42px;

  background-color: white;
`;

const IntervalLabel = styled.Text`
  font-family: OpenSans;
  font-size: 24px;

  margin-top: 16px;
`;

export { ConfigScreen };
