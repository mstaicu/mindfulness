import React, { useState } from 'react';
import { Picker, TouchableNativeFeedback, View, Text } from 'react-native';

import styled, { css } from '@emotion/native';

import { useAppState } from '../../utils';

export const ConfigScreen = () => {
  const [{ notification }, dispatch] = useAppState();

  const [cache, setCache] = useState(notification);
  const updateCache = partialCache => setCache({ ...cache, ...partialCache });

  const RepeatTypePicker = ({ repeatType, onValueChange }) => (
    <Picker
      selectedValue={repeatType}
      onValueChange={updatedRepeatType =>
        onValueChange({
          repeatType: updatedRepeatType
        })
      }
    >
      <Picker.Item label='Fiecare oră' value='hour' />
      <Picker.Item label='Fiecare minut' value='minute' />
    </Picker>
  );

  return (
    <PageStyled>
      <RoundContainer elevation={4}>
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

          <Right></Right>
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

          <Right></Right>
        </Row>

        <Separator />

        <Row style={{ padding: 8 }}>
          <Left>
            <Label>Intervalul notificării</Label>
            <RepeatTypePicker
              repeatType={cache.repeatType}
              onValueChange={updateCache}
            />
          </Left>
        </Row>
      </RoundContainer>

      <Spacer />

      <RoundContainer
        elevation={4}
        style={css`
          width: 100%;
        `}
      >
        <TouchableNativeFeedback
          onPress={() => dispatch({ notification: cache })}
        >
          <View
            style={css`
              padding: 8px;

              background-color: #fff;
            `}
          >
            <Text
              style={css`
                width: 100%;

                text-align: center;

                font-family: OpenSans-Regular;
                font-size: 16px;
              `}
            >
              Salvează
            </Text>
          </View>
        </TouchableNativeFeedback>
      </RoundContainer>
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

const Spacer = styled.View`
  height: 16px;
`;

const RoundContainer = styled.View`
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
