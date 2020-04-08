import PushNotification from 'react-native-push-notification';

import { useAppState } from '../context';

export const useNotifications = () => {
  const [{ notification }, dispatch] = useAppState();

  const scheduleNotification = () => {
    PushNotification.localNotificationSchedule({
      ...notification,
      /**
       * Starts the notification intervals in 60 seconds
       */
      date: new Date(Date.now() + 10 * 1000)
    });

    dispatch({
      active: true
    });
  };

  const cancelNotification = () => {
    PushNotification.cancelLocalNotifications(notification);

    dispatch({
      active: false
    });
  };

  return { scheduleNotification, cancelNotification };
};
