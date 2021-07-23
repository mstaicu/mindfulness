package com.mindfulness.vibrate;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.database.sqlite.SQLiteDatabase;
import android.media.AudioAttributes;
import android.os.Build;
import android.os.VibrationEffect;
import android.os.Vibrator;
import android.util.Log;

import com.facebook.react.modules.storage.AsyncLocalStorageUtil;
import com.facebook.react.modules.storage.ReactDatabaseSupplier;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

public class VibrateReceiver extends BroadcastReceiver {
  public static final String TAG = "VibrateReceiver";

  @Override
  public void onReceive(Context context, Intent intent) {
    Log.i(TAG, "Starting onReceive");

    // Do the work
    vibrate(context);

    // Schedule the next vibration
    scheduleNextVibration(context, intent);

    Log.i(TAG, "Ending onReceive");
  }

  private void vibrate(Context context) {
    JsonObject appState = getAppState(context);

    JsonArray vPattern = appState.get("vibrationPattern").getAsJsonArray();
    JsonArray vAmplitudes = appState.get("vibrationAmplitudes").getAsJsonArray();
    int vRepeatInterval = appState.get("repeatInterval").getAsInt();

    long[] mPattern = new long[vPattern.size()];
    int[] mAmp = new int[vAmplitudes.size()];

    for (int i = 0; i < vPattern.size(); i++) {
      mPattern[i] = (long) vPattern.get(i).getAsDouble();
    }

    for (int i = 0; i < vAmplitudes.size(); i++) {
      mAmp[i] = vAmplitudes.get(i).getAsInt();
    }

    Vibrator vibrator = (Vibrator) context.getSystemService(Context.VIBRATOR_SERVICE);
    // AudioManager am = (AudioManager) getSystemService(Context.AUDIO_SERVICE);

    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      if (vibrator.hasAmplitudeControl()) {
        VibrationEffect effect = VibrationEffect.createWaveform(mPattern, mAmp, -1);
        vibrator.vibrate(effect, new AudioAttributes.Builder()
          .setContentType(AudioAttributes.CONTENT_TYPE_SONIFICATION)
          .setUsage(AudioAttributes.USAGE_ALARM)
          .build());
      } else {
        VibrationEffect effect = VibrationEffect.createWaveform(mPattern, -1);
        vibrator.vibrate(effect, new AudioAttributes.Builder()
          .setContentType(AudioAttributes.CONTENT_TYPE_SONIFICATION)
          .setUsage(AudioAttributes.USAGE_ALARM)
          .build());
      }
    }
  }

  private void scheduleNextVibration(Context context, Intent intent) {
    AlarmManager alarmManager = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);

    // TODO: We're reusing the intent which this broadcast receiver was called with
    // Still not sure if this is a good idea or if we should recreate the intent
    PendingIntent pendingIntent = PendingIntent.getBroadcast(context, 1, intent, 0);

    // TODO: Use the interval set from RN
    alarmManager.setExact(AlarmManager.RTC_WAKEUP, System.currentTimeMillis() + 10000, pendingIntent);
  }

  private JsonObject getAppState(Context context) {
    SQLiteDatabase readableDatabase = ReactDatabaseSupplier.getInstance(context).getReadableDatabase();

    if (readableDatabase != null) {
      /*
        .getItemImpl is defined in node_modules/@react-native-async-storage/async-storage/android/src/main/java/com/reactnativecommunity/asyncstorage/AsyncLocalStorageUtil.java
      */
      return JsonParser.parseString(AsyncLocalStorageUtil.getItemImpl(readableDatabase, "appState")).getAsJsonObject();
    }

    return null;
  }
}
