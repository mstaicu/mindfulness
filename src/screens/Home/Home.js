import React from 'react';
import styled from '@emotion/native';

import { BellOff, BellOn } from '../../components';

import { useAppState, useNotifications } from '../../utils';

export const HomeScreen = () => {
  const [{ active }] = useAppState();
  const { scheduleNotification, cancelNotification } = useNotifications();

  return (
    <PageStyled>
      {active ? (
        <BellOn
          fill='#698474'
          width={300}
          height={300}
          onPress={cancelNotification}
        />
      ) : (
        <BellOff
          fill='#ffd3b6'
          width={300}
          height={300}
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
