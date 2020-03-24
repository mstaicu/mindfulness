import React from 'react';
import styled from '@emotion/native';

import { BellOff, BellOn } from '../../components';

import { useConfig, useNotifications } from '../../utils';

export const HomeScreen = ({ navigation }) => {
  const [{ active }] = useConfig();
  const { scheduleNotification, cancelNotification } = useNotifications();

  return (
    <PageStyled>
      {active ? (
        <BellOn
          fill='#ffd3b6'
          width={250}
          height={250}
          onPress={cancelNotification}
        />
      ) : (
        <BellOff
          fill='#a8e6cf'
          width={250}
          height={250}
          onPress={scheduleNotification}
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
