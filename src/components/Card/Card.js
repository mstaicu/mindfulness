import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from '@emotion/native';

const Card = ({ children, onPress }) => (
  <ShadowContainer>
    <CardContainer>
      <TouchableOpacity accessibilityRole='button' onPress={onPress}>
        <CardElement>{children}</CardElement>
      </TouchableOpacity>
    </CardContainer>
  </ShadowContainer>
);

const ShadowContainer = styled.View`
  flex: 1;
  box-shadow: 0px 8px 8px #e4e7f5;
`;

const CardContainer = styled.View`
  overflow: hidden;
  border-radius: 8px;
`;

const CardElement = styled.View`
  justify-content: center;
  align-items: center;

  height: 144px;

  background-color: #fab39d;
`;

export { Card };
