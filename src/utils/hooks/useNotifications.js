import React from 'react';

import PushNotification from 'react-native-push-notification';

import { useConfig } from '../context';

PushNotification.configure({
  onNotification: function(notification) {
    console.log('NOTIFICATION:', notification);

    // process the notification

    // required on iOS only (see fetchCompletionHandler docs: https://github.com/react-native-community/react-native-push-notification-ios)
    notification.finish('backgroundFetchResultNewData');
  }
});

export const useNotifications = () => {
  const [{ notification }, setConfig] = useConfig();

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

  return { scheduleNotification, cancelNotification };
};
