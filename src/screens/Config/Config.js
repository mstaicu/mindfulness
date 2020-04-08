import React, { useReducer, useEffect } from 'react';
import { Picker, Switch } from 'react-native';

import styled, { css } from '@emotion/native';

import { useAppState } from '../../utils';

export const ConfigScreen = () => {
  const [{ notification }, dispatch] = useAppState();

  const updateNotificationSettings = updatedNotificationSettings =>
    dispatch({
      notification: { ...notification, ...updatedNotificationSettings }
    });

  /**
   * Whenever we update the notification settings, update the local cache
   */
  useEffect(() => {
    updateCache(notification);
  }, [notification]);

  /**
   * Work on a copy of the notification settings in order to allow the users to rollback
   */
  const [cache, updateCache] = useReducer(
    (prevState, newState) => ({
      ...prevState,
      ...newState
    }),
    notification
  );

  const RepeatTypePicker = ({ repeatType, onValueChange }) => (
    <Picker
      selectedValue={repeatType}
      onValueChange={updatedRepeatType =>
        onValueChange({
          repeatType: updatedRepeatType
        })
      }
      style={css`
        font-family: OpenSans-Regular;
        font-size: 16px;
      `}
      itemStyle={css`
        font-family: OpenSans-Regular;
        font-size: 16px;
      `}
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
      <Rows elevation={4}>
        <Row style={{ padding: 8 }}>
          <Left>
            <Label>Titlul notificării</Label>
            <Input
              placeholder='Titlul notificării'
              onChangeText={updatedTitle =>
                updateCache({ title: updatedTitle })
              }
              value={cache.title}
            />
          </Left>

          <Right>
            <Switch
              trackColor={{ false: '#fcf8f3', true: '#fcf8f3' }}
              thumbColor={
                cache.title === notification.title ? '#698474' : '#ffaaa5'
              }
              value={cache.title === notification.title}
              onValueChange={() =>
                updateNotificationSettings({ title: cache.title })
              }
            />
          </Right>
        </Row>

        <Separator />

        <Row style={{ padding: 8 }}>
          <Left>
            <Label>Mesajul notificării</Label>
            <Input
              placeholder='Mesajul notificării'
              onChangeText={updatedMessage =>
                updateCache({ message: updatedMessage })
              }
              value={cache.message}
            />
          </Left>

          <Right>
            <Switch
              trackColor={{ false: '#fcf8f3', true: '#fcf8f3' }}
              thumbColor={
                cache.message === notification.message ? '#698474' : '#ffaaa5'
              }
              value={cache.message === notification.message}
              onValueChange={() =>
                updateNotificationSettings({ message: cache.message })
              }
            />
          </Right>
        </Row>

        <Separator />

        <Row style={{ padding: 8 }}>
          <Left>
            <Label>Intervalul notificării</Label>
            <RepeatTypePicker
              repeatType={cache.repeatType}
              onValueChange={updateNotificationSettings}
            />
          </Left>
        </Row>
      </Rows>
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

const Separator = styled.View`
  height: 2px;
  background-color: #fcf8f3;
`;

const Rows = styled.View`
  background-color: transparent;

  overflow: hidden;
  border-radius: 4px;
`;

const Row = styled.View`
  width: 100%;

  flex-direction: row;
  align-items: center;

  background-color: #fff;
`;

const Label = styled.Text`
  font-size: 8px;
`;

const Left = styled.View`
  flex: 10;
`;

const Right = styled.View`
  flex: 1;
`;

const Input = styled.TextInput`
  width: 100%;
  padding: 0;
  font-family: OpenSans-Regular;
  font-size: 16px;
`;
