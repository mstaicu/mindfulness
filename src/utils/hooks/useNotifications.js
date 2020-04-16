import PushNotification from 'react-native-push-notification';

import { useAppState } from '../context';

export const useNotifications = () => {
  const [{ notification }, dispatch] = useAppState();

  const scheduleNotification = () => {
    const ONSET = {
      hour: new Date(Date.now() + 60 * 60 * 1000),
      minute: new Date(Date.now() + 60 * 1000)
    };

    const scheduledNotification = {
      ...notification,

      /**
       * We need the notificattion start offset
       */
      date: ONSET[notification.repeatType]
    };

    PushNotification.localNotificationSchedule(scheduledNotification);

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
