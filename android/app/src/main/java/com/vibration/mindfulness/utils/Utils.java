package com.vibration.mindfulness.utils;

import android.content.Context;
import android.database.sqlite.SQLiteDatabase;

import com.facebook.react.modules.storage.AsyncLocalStorageUtil;
import com.facebook.react.modules.storage.ReactDatabaseSupplier;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import java.util.concurrent.ThreadLocalRandom;

public class Utils {
  static public JsonObject getAppState(Context context) {
    SQLiteDatabase readableDatabase = ReactDatabaseSupplier.getInstance(context).getReadableDatabase();

    if (readableDatabase != null) {
      /*
        .getItemImpl is defined in node_modules/@react-native-async-storage/async-storage/android/src/main/java/com/reactnativecommunity/asyncstorage/AsyncLocalStorageUtil.java
      */
      String serialisedAppState = AsyncLocalStorageUtil.getItemImpl(readableDatabase, "appState");

      return serialisedAppState != null ? JsonParser.parseString(serialisedAppState).getAsJsonObject() : null;
    }

    return null;
  }

  static public int getRandomNumber(int min, int max) {
    return ThreadLocalRandom.current().nextInt(min, max + 1);
  }

  static public long[] getVibrationPattern() {
    int numberOfVibrations = getRandomNumber(7, 10);

    long[] vibrationPattern = new long[numberOfVibrations];

    for (int i = 0; i < numberOfVibrations; i++) {
      vibrationPattern[i] = getRandomNumber(2, 4) * 50;
    }

    return vibrationPattern;
  }

//  static public long[] getVibrationPattern(Context context) {
//    JsonObject appState = getAppState(context);
//
//    JsonArray vPattern = appState.get("vibrationPattern").getAsJsonArray();
//
//    // Convert the values from React Native to Android primitives
//    long[] mPattern = new long[vPattern.size()];
//
//    for (int i = 0; i < vPattern.size(); i++) {
//      mPattern[i] = (long) vPattern.get(i).getAsDouble();
//    }
//
//    return mPattern;
//  }

  static public int[] getVibrationPatternAmplitudes(long[] vibrationPattern) {
    int[] vibrationPatternAmplitudes = new int[vibrationPattern.length];

    for (int i = 0; i < vibrationPattern.length; i++) {
      vibrationPatternAmplitudes[i] = getRandomNumber(1, 4) * 100;
    }

    return vibrationPatternAmplitudes;
  }

//  static public int[] getVibrationAmplitudes(Context context) {
//    JsonObject appState = getAppState(context);
//
//    JsonArray vAmplitudes = appState.get("vibrationAmplitudes").getAsJsonArray();
//
//    // Convert the values from React Native to Android primitives
//    int[] mAmp = new int[vAmplitudes.size()];
//
//    for (int i = 0; i < vAmplitudes.size(); i++) {
//      mAmp[i] = vAmplitudes.get(i).getAsInt();
//    }
//
//    return mAmp;
//  }

  static public int getRepeatInterval(Context context) {
    JsonObject appState = Utils.getAppState(context);
    int repeatInterval = appState != null ? appState.get("repeatInterval").getAsInt() : 15;

    return repeatInterval * 60 * 1000;
  }
}
