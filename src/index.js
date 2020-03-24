import React from 'react';

import { ConfigProvider } from './utils';

import Router from './router';

export default () => (
  <ConfigProvider>
    <Router />
  </ConfigProvider>
);
