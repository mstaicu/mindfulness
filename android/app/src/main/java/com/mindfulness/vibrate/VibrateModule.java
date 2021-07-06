package com.mindfulness.vibrate;

import android.app.job.JobInfo;
import android.app.job.JobScheduler;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.os.VibrationEffect;
import android.os.Vibrator;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.mindfulness.VibrateJobScheduler;

import javax.annotation.Nonnull;

import static androidx.core.content.ContextCompat.getSystemService;

public class VibrateModule extends ReactContextBaseJavaModule {

  public static final String REACT_CLASS = "Vibrate";

  Intent serviceIntent = new Intent(getReactApplicationContext(), VibrateService.class);

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

    context.startService(serviceIntent);
// 2nd
//        ComponentName componentName = new ComponentName(getReactApplicationContext(), VibrateJobScheduler.class);
//        JobInfo info = new JobInfo.Builder(123, componentName)
//                .setPersisted(true)
//                .setPeriodic(15 * 60 * 1000)
//                .build();
//
//        JobScheduler scheduler = (JobScheduler) context.getSystemService(Context.JOB_SCHEDULER_SERVICE);
//        scheduler.schedule(info);
  }

  @ReactMethod
  public void stop() {
    ReactApplicationContext context = getReactApplicationContext();
//
    context.stopService(serviceIntent);
// 2nd
//        JobScheduler scheduler = (JobScheduler) context.getSystemService(Context.JOB_SCHEDULER_SERVICE);
//        scheduler.cancel(123);
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

    if (vibrator.hasAmplitudeControl()) {
      VibrationEffect effect = VibrationEffect.createWaveform(mVibratePattern, mAmplitudes, -1);
      vibrator.vibrate(effect);
    } else {
      VibrationEffect effect = VibrationEffect.createWaveform(mVibratePattern, -1);
      vibrator.vibrate(effect);
    }
  }
}