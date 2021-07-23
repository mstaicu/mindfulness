package com.mindfulness.vibrate;

import android.app.job.JobParameters;
import android.app.job.JobService;
import android.content.Context;
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

public class VibrateJobService extends JobService {
  public static final String TAG = "VibrateJobService";

  @Override
  public boolean onStartJob(JobParameters params) {
    Log.d(TAG, "Job started");

    doBackgroundWork(params);

    return false;
  }

  private void doBackgroundWork(JobParameters params) {
    new Thread(() -> {
      JsonObject appState = getAppState();

      JsonArray vPattern = appState.get("vibrationPattern").getAsJsonArray();
      JsonArray vAmplitudes = appState.get("vibrationAmplitudes").getAsJsonArray();

      /*
        Convert the value stored from React Native to long and int
       */
      long[] mPattern = new long[vPattern.size()];
      int[] mAmp = new int[vAmplitudes.size()];

      for (int i = 0; i < vPattern.size(); i++) {
        mPattern[i] = (long) vPattern.get(i).getAsDouble();
      }

      for (int i = 0; i < vAmplitudes.size(); i++) {
        mAmp[i] = vAmplitudes.get(i).getAsInt();
      }

      Vibrator vibrator = (Vibrator) getSystemService(Context.VIBRATOR_SERVICE);
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

      Log.d(TAG, "Job finished");

      jobFinished(params, false);
    }).start();
  }

  @Override
  public boolean onStopJob(JobParameters params) {
    Log.d(TAG, "Job cancelled");
    return false;
  }

  private JsonObject getAppState() {
    SQLiteDatabase readableDatabase = ReactDatabaseSupplier.getInstance(getApplicationContext()).getReadableDatabase();

    if (readableDatabase != null) {
      /*
        .getItemImpl is defined in node_modules/@react-native-async-storage/async-storage/android/src/main/java/com/reactnativecommunity/asyncstorage/AsyncLocalStorageUtil.java
      */
      return JsonParser.parseString(AsyncLocalStorageUtil.getItemImpl(readableDatabase, "appState")).getAsJsonObject();
    }

    return null;
  }
}
