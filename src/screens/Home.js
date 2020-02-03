import React from 'react';
import styled, { css } from '@emotion/native';

import { Button, TouchableOpacity, Text } from 'react-native';

/**
 * TODO: Push to its own module
 */
import PushNotification from 'react-native-push-notification';

import { useConfig } from '../config/ConfigProvider';

/**
 * Notification constants
 */
const NOTIFICATION_ID = '1';
const TITLE = 'Vine maestrul';
const MESSAGE = 'Atenția la respirație';

export default ({ navigation }) => {
  /**
   * Navigation specific configuration, defines the header bar at the top of the screen
   */
  navigation.setOptions({
    headerRight: () => (
      <Button title="Config" onPress={() => navigation.navigate('Config')} />
    ),
  });

  const [config] = useConfig();

  const scheduleNotification = () => {};
  const cancelNotification = () =>
    PushNotification.cancelLocalNotifications({ id: NOTIFICATION_ID });

  /**
   *
   */

  const scheduleImmediateNotification = ({ repeatType }) =>
    PushNotification.localNotification({
      id: NOTIFICATION_ID,

      title: TITLE,
      message: MESSAGE,

      repeatType,
    });

  const scheduleDeferredNotification = ({
    repeatType,
    /**
     * Debug only, defer the notification display for 5 seconds
     */
    startDate = new Date(Date.now() + 5 * 1000),
  }) =>
    PushNotification.localNotificationSchedule({
      id: NOTIFICATION_ID,

      /**
       * The 'date' property works only with localNotificationSchedule.
       * It defines the start of the notification
       */
      date: startDate,

      title: TITLE,
      message: MESSAGE,

      repeatType,
    });

  return (
    // <View style={styles.container}>
    //   <TouchableOpacity
    //     style={styles.buttonContainer}
    //     onPress={() => scheduleDeferredNotification({ repeatType: 'minute' })}>
    //     <Text style={styles.buttonText}>Start</Text>
    //   </TouchableOpacity>
    //   <TouchableOpacity
    //     style={styles.buttonContainer}
    //     onPress={cancelNotification}>
    //     <Text style={styles.buttonText}>Stop</Text>
    //   </TouchableOpacity>
    // </View>
    <PageStyled>
      <Card title="Start" onPress={() => {}} />
      <CardSeparator />
      <Card title="Stop" onPress={() => {}} />
    </PageStyled>
  );
};

const Card = ({ title, onPress }) => (
  <ShadowContainer>
    <CardContainer>
      <TouchableOpacity accessibilityRole="button" onPress={onPress}>
        <CardElement>
          <Text
            style={css`
              color: #fff;
              font-size: 32px;
            `}>
            {title}
          </Text>
        </CardElement>
      </TouchableOpacity>
    </CardContainer>
  </ShadowContainer>
);

const PageStyled = styled.View`
  flex: 1;
  justify-content: center;

  padding: 8px;
  background-color: #fff;
`;

const ShadowContainer = styled.View`
  box-shadow: 0px 8px 5px #e4e7f5;
`;

const CardContainer = styled.View`
  overflow: hidden;
  border-radius: 8px;
`;

const CardElement = styled.View`
  justify-content: center;
  align-items: center;

  height: 136px;

  background-color: #fab39d;
`;

const CardSeparator = styled.View`
  height: 24px;
`;
