package com.vibration.mindfulness.vibrate;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.os.Build;

import androidx.annotation.RequiresApi;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.vibration.mindfulness.utils.Utils;

import javax.annotation.Nonnull;

public class VibrateModule extends ReactContextBaseJavaModule {
  public static final String TAG = "VibrateModule";
  public static final String REACT_CLASS = "Vibrate";

  public VibrateModule(@Nonnull ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Nonnull
  @Override
  public String getName() {
    return REACT_CLASS;
  }

  @RequiresApi(api = Build.VERSION_CODES.M)
  @ReactMethod
  public void start() {
    ReactApplicationContext context = getReactApplicationContext();

    AlarmManager alarmManager = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);

    Intent intent = new Intent(context, VibrateReceiver.class);
    PendingIntent pendingIntent = PendingIntent.getBroadcast(
      context,
      1,
      intent,
      0
    );

    alarmManager.setExactAndAllowWhileIdle(
      AlarmManager.RTC_WAKEUP,
      System.currentTimeMillis(),
      pendingIntent
    );
  }

  @ReactMethod
  public void stop() {
    ReactApplicationContext context = getReactApplicationContext();

    AlarmManager alarmManager = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);

    Intent intent = new Intent(context, VibrateReceiver.class);
    PendingIntent pendingIntent = PendingIntent.getBroadcast(
      context,
      1,
      intent,
      0
    );

    alarmManager.cancel(pendingIntent);
  }
}