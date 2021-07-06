package com.mindfulness.vibrate;

import android.app.Notification;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.database.sqlite.SQLiteDatabase;
import android.os.Build;
import android.os.Handler;
import android.os.IBinder;
import android.os.PowerManager;
import android.os.VibrationEffect;
import android.os.Vibrator;

import androidx.annotation.RequiresApi;
import androidx.core.app.NotificationCompat;

import com.facebook.react.modules.storage.AsyncLocalStorageUtil;
import com.facebook.react.modules.storage.ReactDatabaseSupplier;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.mindfulness.MainActivity;
import com.mindfulness.R;

import static com.mindfulness.MainApplication.CHANNEL_ID;

public class VibrateService extends Service {
  private PowerManager.WakeLock wakeLock;

  private final Handler handler = new Handler();
  private Runnable vibrationRunner;

  @Override
  public IBinder onBind(Intent intent) {
    return null;
  }

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

    wakeLock.acquire(10*60*1000L /*10 minutes*/);
  }

  @Override
  public void onDestroy() {
    super.onDestroy();

    this.handler.removeCallbacks(this.vibrationRunner);

    wakeLock.release();
  }

  @Override
  public int onStartCommand(Intent intent, int flags, int startId) {
    this.vibrationRunner = getVibrationRunner();
    this.handler.post(this.vibrationRunner);

    return START_STICKY;
  }

  private Runnable getVibrationRunner() {
    return new Runnable() {
      @RequiresApi(api = Build.VERSION_CODES.O)
      @Override
      public void run() {
        JsonObject appState = getAppState();

        JsonArray vPattern = appState.get("vibrationPattern").getAsJsonArray();
        JsonArray vAmplitudes = appState.get("vibrationAmplitudes").getAsJsonArray();
        int vRepeatInterval = appState.get("repeatInterval").getAsInt();

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
//        AudioManager am = (AudioManager) getSystemService(Context.AUDIO_SERVICE);

        if (vibrator.hasAmplitudeControl()) {
          VibrationEffect effect = VibrationEffect.createWaveform(mPattern, mAmp, -1);
          vibrator.vibrate(effect);
        } else {
          VibrationEffect effect = VibrationEffect.createWaveform(mPattern, -1);
          vibrator.vibrate(effect);
        }

        handler.postDelayed(this, vRepeatInterval);
      }
    };
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