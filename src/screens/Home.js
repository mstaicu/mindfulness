import React from 'react';

import { View, Button, TouchableOpacity, Text, StyleSheet } from 'react-native';
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
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => scheduleDeferredNotification({ repeatType: 'minute' })}>
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={cancelNotification}>
        <Text style={styles.buttonText}>Stop</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
  },
  buttonText: {},
});
