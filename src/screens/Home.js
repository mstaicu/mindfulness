import React from 'react';

import {
  View,
  Button,
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native';

import PushNotification from 'react-native-push-notification';

export default ({ navigation }) => {
  PushNotification.configure({
    onRegister: () => console.log('ON REGISTER'),
    onNotification: () => console.log('ON NOTIF'),
  });

  PushNotification.localNotificationSchedule({
    date: new Date(Date.now() + (5 * 1000)),

    title: "Scheduled Notification",
    message: "My Notification Message",
  });

  navigation.setOptions({
    headerRight: () => (
      <Button
        title="Config"
        onPress={() => navigation.navigate('Config')}
      />
    ),
  });

  const sendNotification = () => notificationServiceInstance.sendTestNotification();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.buttonContainer} onPress={sendNotification}>
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Stop</Text>
      </TouchableOpacity>
    </View>
  )
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
  buttonText: {

  }
})