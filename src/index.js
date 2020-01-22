import React from 'react';

import { ConfigProvider } from './config/ConfigProvider';
import Router from './router';

export default () => (
  <ConfigProvider>
    <Router />
  </ConfigProvider>
);
