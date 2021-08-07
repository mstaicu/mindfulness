package com.vibration.mindfulness.utils;

import android.content.Context;
import android.database.sqlite.SQLiteDatabase;

import com.facebook.react.modules.storage.AsyncLocalStorageUtil;
import com.facebook.react.modules.storage.ReactDatabaseSupplier;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

public class Utils {
  static public JsonObject getAppState(Context context) {
    SQLiteDatabase readableDatabase = ReactDatabaseSupplier.getInstance(context).getReadableDatabase();

    if (readableDatabase != null) {
      /*
        .getItemImpl is defined in node_modules/@react-native-async-storage/async-storage/android/src/main/java/com/reactnativecommunity/asyncstorage/AsyncLocalStorageUtil.java
      */
      return JsonParser.parseString(AsyncLocalStorageUtil.getItemImpl(readableDatabase, "appState")).getAsJsonObject();
    }

    return null;
  }

  static public long[] getVibrationPattern(Context context) {
    JsonObject appState = getAppState(context);

    JsonArray vPattern = appState.get("vibrationPattern").getAsJsonArray();

    // Convert the values from React Native to Android primitives
    long[] mPattern = new long[vPattern.size()];

    for (int i = 0; i < vPattern.size(); i++) {
      mPattern[i] = (long) vPattern.get(i).getAsDouble();
    }

    return mPattern;
  }

  static public int[] getVibrationAmplitudes(Context context) {
    JsonObject appState = getAppState(context);

    JsonArray vAmplitudes = appState.get("vibrationAmplitudes").getAsJsonArray();

    // Convert the values from React Native to Android primitives
    int[] mAmp = new int[vAmplitudes.size()];

    for (int i = 0; i < vAmplitudes.size(); i++) {
      mAmp[i] = vAmplitudes.get(i).getAsInt();
    }

    return mAmp;
  }

  static public int getRepeatInterval(Context context) {
    return Utils.getAppState(context).get("repeatInterval").getAsInt();
  }
}
