package com.mindfulness;

import android.app.Notification;
import android.app.PendingIntent;
import android.app.job.JobParameters;
import android.app.job.JobService;
import android.content.Context;
import android.content.Intent;
import android.database.sqlite.SQLiteDatabase;
import android.media.AudioManager;
import android.os.Build;
import android.os.PowerManager;
import android.os.VibrationEffect;
import android.os.Vibrator;
import android.util.Log;

import androidx.annotation.RequiresApi;
import androidx.core.app.NotificationCompat;

import com.facebook.react.modules.storage.AsyncLocalStorageUtil;
import com.facebook.react.modules.storage.ReactDatabaseSupplier;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import static com.mindfulness.MainApplication.CHANNEL_ID;

public class VibrateJobScheduler extends JobService {
  public static final String TAG = "VibrateJobScheduler";

  private PowerManager.WakeLock wakeLock;

  @Override
  public void onCreate() {
    super.onCreate();

    // Get the wake lock so that the service still works when the phone is locked

    PowerManager powerManager = (PowerManager) getSystemService(POWER_SERVICE);
    wakeLock = powerManager.newWakeLock(PowerManager.PARTIAL_WAKE_LOCK, "Mindfulness:Wakelock");

    // Setup the service as a foreground service by showing a permanent notification

    // The notification intent defines the behaviour that will happen when we tap on the notification
    Intent notificationIntent = new Intent(this, MainActivity.class);
    PendingIntent pendingIntent = PendingIntent.getActivity(this,
            0,
            notificationIntent,
            0
    );

    Notification notification = new NotificationCompat.Builder(this, CHANNEL_ID)
            .setContentTitle("Mindfulness Service")
            .setSmallIcon(R.mipmap.ic_launcher_round)
            // Start the MainActivity when pressing the notification
            .setContentIntent(pendingIntent)
            .build();

    startForeground(1, notification);
  }

  @RequiresApi(api = Build.VERSION_CODES.O)
  @Override
  public boolean onStartJob(JobParameters jobParameters) {
    Log.d(TAG, "Vibrate notification started");

    startBackgroundWork(jobParameters);

    return true;
  }

  @Override
  public boolean onStopJob(JobParameters jobParameters) {
    Log.d(TAG, "Vibrate notification cancelled");

    return false;
  }

  @RequiresApi(api = Build.VERSION_CODES.O)
  private void startBackgroundWork(JobParameters jobParameters) {
    new Thread(() -> {
      Vibrator vibrator = (Vibrator) getSystemService(Context.VIBRATOR_SERVICE);
      AudioManager am = (AudioManager) getSystemService(Context.AUDIO_SERVICE);

      JsonObject appState = getAppState();

      JsonArray vPattern = appState.get("vibrationPattern").getAsJsonArray();
      JsonArray vAmplitudes = appState.get("vibrationAmplitudes").getAsJsonArray();

      long[] mPattern = new long[vPattern.size()];
      int[] mAmp = new int[vAmplitudes.size()];

      for (int i = 0; i < vPattern.size(); i++) {
        mPattern[i] = (long) vPattern.get(i).getAsDouble();
      }

      for (int i = 0; i < vAmplitudes.size(); i++) {
        mAmp[i] = vAmplitudes.get(i).getAsInt();
      }

      if (am.getRingerMode() != AudioManager.RINGER_MODE_SILENT) {
        if (vibrator.hasAmplitudeControl()) {
          VibrationEffect effect = VibrationEffect.createWaveform(mPattern, mAmp, -1);
          vibrator.vibrate(effect);
        } else {
          VibrationEffect effect = VibrationEffect.createWaveform(mPattern, -1);
          vibrator.vibrate(effect);
        }
      }

      jobFinished(jobParameters,
              false);
    }).start();
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