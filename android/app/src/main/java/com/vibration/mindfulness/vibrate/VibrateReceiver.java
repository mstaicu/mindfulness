package com.vibration.mindfulness.vibrate;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.media.AudioAttributes;
import android.media.AudioManager;
import android.media.Ringtone;
import android.media.RingtoneManager;
import android.net.Uri;
import android.os.VibrationEffect;
import android.os.Vibrator;
import android.util.Log;

import com.vibration.mindfulness.utils.Utils;

public class VibrateReceiver extends BroadcastReceiver {
  public static final String TAG = "VibrateReceiver";

  @Override
  public void onReceive(Context context, Intent intent) {
    Log.i(TAG, "Starting onReceive");

    // Do the work
    AudioManager audioManager = (AudioManager) context.getSystemService(Context.AUDIO_SERVICE);

    if (audioManager.getRingerMode() != AudioManager.RINGER_MODE_SILENT) {
//      vibrate(context);
      playSound(context);
    }

    // Schedule the next vibration
    scheduleNextVibration(context, intent);

    Log.i(TAG, "Ending onReceive");
  }

  private void vibrate(Context context) {
    Vibrator vibrator = (Vibrator) context.getSystemService(Context.VIBRATOR_SERVICE);

    if (vibrator.hasAmplitudeControl()) {

      long[] pattern = Utils.getVibrationPattern();
      int[] amplitudes = Utils.getVibrationPatternAmplitudes(pattern);

      VibrationEffect effect = VibrationEffect.createWaveform(
        pattern,
        amplitudes,
        -1
      );

      vibrator.vibrate(
        effect,
        new AudioAttributes.Builder()
          .setContentType(AudioAttributes.CONTENT_TYPE_SONIFICATION)
          .setUsage(AudioAttributes.USAGE_ALARM)
          .build()
      );
    } else {
      VibrationEffect effect = VibrationEffect.createWaveform(
        Utils.getVibrationPattern(),
        -1
      );

      vibrator.vibrate(
        effect,
        new AudioAttributes.Builder()
          .setContentType(AudioAttributes.CONTENT_TYPE_SONIFICATION)
          .setUsage(AudioAttributes.USAGE_ALARM)
          .build()
      );
    }
  }

  private void playSound(Context context) {
    Uri notification = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);
    Ringtone r = RingtoneManager.getRingtone(context, notification);
    r.play();
  }

  private void scheduleNextVibration(Context context, Intent intent) {
    AlarmManager alarmManager = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);

    // TODO: We're reusing the intent which this broadcast receiver was called with
    // Still not sure if this is a good idea or if we should recreate the intent
    PendingIntent pendingIntent = PendingIntent.getBroadcast(context, 1, intent, 0);

    alarmManager.setExactAndAllowWhileIdle(
      AlarmManager.RTC_WAKEUP,
      System.currentTimeMillis() + Utils.getRepeatInterval(context),
      pendingIntent
    );
  }
}
