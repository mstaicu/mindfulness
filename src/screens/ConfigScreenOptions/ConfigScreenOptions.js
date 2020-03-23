import React from 'react';
import { Text, View } from 'react-native';
import styled, { css } from '@emotion/native';

import { Card, EnvelopeIcon, VibrateIcon } from '../../components';

export const ConfigScreenOptions = ({ navigation }) => (
  <PageStyled>
    <View>
      <Text
        style={css`
          text-align: center;

          font-family: 'OpenSans-Bold';
          font-size: 40px;

          color: #808080;
        `}
      >
        Choose
      </Text>
      <Text
        style={css`
          margin-top: -16px;

          text-align: center;

          font-family: 'OpenSans-Bold';
          font-size: 40px;

          color: #808080;
        `}
      >
        your setting
      </Text>
    </View>

    <View
      style={css`
        flex-direction: row;
        margin-top: 24px;
      `}
    >
      <Card onPress={() => {}}>
        <EnvelopeIcon fill='#fff' width={64} height={64} />
      </Card>

      <View
        style={css`
          flex: 0.04;
        `}
      ></View>

      <Card onPress={() => {}}>
        <VibrateIcon fill='#fff' width={64} height={64} />
      </Card>
    </View>
  </PageStyled>
);

const PageStyled = styled.View`
  flex: 1;
  justify-content: center;

  padding: 8px;
  background-color: #fff;
`;
