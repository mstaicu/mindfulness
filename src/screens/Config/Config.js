import React, { useState } from 'react';
import { View, TextInput, Picker } from 'react-native';
import styled, { css } from '@emotion/native';

import { useConfig } from '../../utils';

const REPEAT_TYPE_MAP = {
  month: 'Lunar',
  week: 'Săptămânal',
  day: 'Zilnic',
  hour: 'Fiecare oră',
  minute: 'Fiecare minut'
};

export const ConfigScreen = ({ navigation }) => {
  const [settings, updateSettings] = useConfig();

  const RepeatTypePicker = () => (
    <Picker
      selectedValue={settings.notification.repeatType}
      style={css`
        width: 100%;

        font-family: OpenSans-Regular;
        font-size: 16px;

        color: #feece7;
      `}
      onValueChange={repeatType =>
        updateSettings({
          notification: { ...settings.notification, repeatType }
        })
      }
    >
      <Picker.Item label='Lunar' value='month' />
      <Picker.Item label='Săptămânal' value='week' />
      <Picker.Item label='Zilnic' value='day' />
      <Picker.Item label='Fiecare oră' value='hour' />
      <Picker.Item label='Fiecare minut' value='minute' />
    </Picker>
  );

  return (
    <PageStyled>
      <Chip elevation={8}>
        <Circle>
          <VerticalBar />
          <HorizontalBar />
        </Circle>
        <Separator />
        <InnerChip>
          <TextInput
            style={css`
              width: 100%;
              font-family: OpenSans-Regular;
              font-size: 16px;

              color: #feece7;
            `}
            placeholder='Titlul notificării'
            onChangeText={title =>
              updateSettings({
                notification: { ...settings.notification, title }
              })
            }
            value={settings.notification.title}
          />
        </InnerChip>
      </Chip>

      <ChipSeparator />

      <Chip elevation={8}>
        <Circle>
          <VerticalBar />
          <HorizontalBar />
        </Circle>
        <Separator />
        <InnerChip>
          <TextInput
            style={css`
              width: 100%;

              font-family: OpenSans-Regular;
              font-size: 16px;

              color: #feece7;
            `}
            placeholder='Mesajul notificării'
            onChangeText={message =>
              updateSettings({
                notification: { ...settings.notification, message }
              })
            }
            value={settings.notification.message}
          />
        </InnerChip>
      </Chip>

      <ChipSeparator />

      <Chip elevation={8}>
        <Circle>
          <VerticalBar />
          <HorizontalBar />
        </Circle>
        <Separator />
        <InnerChip>
          <RepeatTypePicker />
        </InnerChip>
      </Chip>
    </PageStyled>
  );
};

const PageStyled = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;

  padding: 8px;
  background-color: #fcf8f3;
`;

const Chip = styled.View`
  width: 100%;
  height: 72;

  flex-direction: row;
  justify-content: center;
  align-items: center;

  border-radius: 48px;

  background-color: #f9a186;
`;

const InnerChip = styled(Chip)`
  width: 75%;
  height: 75%;
  padding: 0 24px;

  flex-direction: row;
  justify-content: flex-start;

  background-color: #fbc7b6;
`;

const Separator = styled.View`
  width: 16px;
`;

const Circle = styled.TouchableOpacity`
  width: 48px;
  height: 48px;

  justify-content: center;
  align-items: center;

  border-radius: 24px;

  background-color: #fbc7b6;
`;

const VerticalBar = styled.View`
  width: 2px;
  height: 16px;

  position: absolute;

  background-color: #feece7;
`;

const HorizontalBar = styled(VerticalBar)`
  transform: rotate(-90deg);
`;

const ChipSeparator = styled.View`
  width: 100%;
  height: 16px;
`;
