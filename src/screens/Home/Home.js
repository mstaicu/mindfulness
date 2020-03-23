import React from 'react';
import styled, { css } from '@emotion/native';
import PushNotification from 'react-native-push-notification';

import { BellOff, BellOn } from '../../components';

import { useConfig } from '../../config/ConfigProvider';

export const HomeScreen = ({ navigation }) => {
  const [{ active, notification }, setConfig] = useConfig();

  const scheduleNotification = () => {
    PushNotification.localNotificationSchedule({
      ...notification,
      /**
       * Starts the notification intervals in 60 seconds
       */
      date: new Date(Date.now() + 10 * 1000)
    });

    setConfig({
      active: true
    });
  };

  const cancelNotification = () => {
    PushNotification.cancelLocalNotifications(notification);

    setConfig({
      active: false
    });
  };

  return (
    <PageStyled>
      {active ? (
        <BellOn
          fill='#fab39d'
          width={250}
          height={250}
          onPress={cancelNotification}
        />
      ) : (
        <BellOff
          fill='#fab39d'
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
  background-color: #fff;
`;
