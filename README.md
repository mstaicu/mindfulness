# 🧠 mindfulness

![PRs Welcome][prs-badge]
![MIT License][license-badge]

React Native application for emitting scheduled events

## The problem

You want custom events, at custom intervals, on your phone

## This solution

We propose this simple application which issues events hourly and every minute

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [LICENSE](#license)

## Installation

As a prerequisite, make sure you have Android Studio installed. If you don't have it installed, please follow the official installation process outlined [here](https://developer.android.com/studio/install)

For installing the React Native dependencies, issue the following command from your favorite terminal emulator at the root of the project

```
npm install
```

## Usage

This project can be used in two ways:

1. Development mode
2. Build the project and install the resulting artefacts on your device

For the development mode, if you are using Android, you have two options:

1. Using your physical phone to run the application in development mode
2. Using an emulator from Android Studio to run the application in development mode

If you want to use your physical phone instead of the emulator, as a development environment, you need to follow these instructions:

1. Enable Debugging over USB

Most Android devices can only install and run apps downloaded from Google Play, by default. You will need to enable USB Debugging on your device in order to install your app during development.

To enable USB debugging on your device, you will first need to enable the "Developer options" menu by going to Settings → About phone and then tapping the Build number row at the bottom seven times. You can then go back to Settings → System → Developer options to enable "USB debugging".

2. Plug in your device via USB

Let's now set up an Android device to run our React Native projects. Go ahead and plug in your device via USB to your development machine.

Now check that your device is properly connecting to ADB, the Android Debug Bridge, by running adb devices.

```shell
$ adb devices
List of devices attached
emulator-5554 offline   # Google emulator
14ed2fcc device         # Physical device
```

Seeing device in the right column means the device is connected. You must have only one device connected at a time.

3. Run your app

Type the following in your command prompt to install and launch your app on the device:

```
npm run android
```

For more information on running this application on Android or iOS devices, please refer to the following [link](https://reactnative.dev/docs/running-on-device#running-your-app-on-android-devices)

[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[license-badge]: https://img.shields.io/npm/l/react-incrementor.svg?style=flat-square
