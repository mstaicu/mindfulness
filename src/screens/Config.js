import React from 'react';
import { Button } from 'react-native';
import styled from '@emotion/native';

import { useConfig } from '../config/ConfigProvider';

export default ({ navigation }) => {
  const [config, setConfig] = useConfig();

  return (
    <PageStyled>
      <Button
        title="Save and go home"
        onPress={() => navigation.navigate('Home')}
      />
    </PageStyled>
  );
};

const PageStyled = styled.View`
  flex: 1;
  justify-content: center;

  padding: 8px;
  background-color: #fff;
`;
