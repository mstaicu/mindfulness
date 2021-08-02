package com.mindfulness.vibrate;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.os.VibrationEffect;
import android.os.Vibrator;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.mindfulness.utils.Utils;

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

    alarmManager.setExact(
      AlarmManager.RTC_WAKEUP,
      System.currentTimeMillis() + Utils.getRepeatInterval(context),
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

  @ReactMethod
  public void test(ReadableArray vibrationPattern, ReadableArray vibrationPatternAmplitudes) {
    ReactApplicationContext context = getReactApplicationContext();

    long[] mVibratePattern = new long[vibrationPattern.size()];
    int[] mAmplitudes = new int[vibrationPatternAmplitudes.size()];

    for (int i = 0; i < vibrationPattern.size(); i++) {
      mVibratePattern[i] = (long) vibrationPattern.getDouble(i);
    }

    for (int i = 0; i < vibrationPatternAmplitudes.size(); i++) {
      mAmplitudes[i] = vibrationPatternAmplitudes.getInt(i);
    }

    Vibrator vibrator = (Vibrator) context.getSystemService(Context.VIBRATOR_SERVICE);

    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      if (vibrator.hasAmplitudeControl()) {
        VibrationEffect effect = VibrationEffect.createWaveform(mVibratePattern, mAmplitudes, -1);
        vibrator.vibrate(effect);
      } else {
        VibrationEffect effect = VibrationEffect.createWaveform(mVibratePattern, -1);
        vibrator.vibrate(effect);
      }
    }
  }
}