import React from 'react';
import { StatusBar } from 'react-native';

import styled from '@emotion/native';

const ConfigScreen = () => (
  <SafeArea>
    <PageStyled></PageStyled>
  </SafeArea>
);

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

export { ConfigScreen };
