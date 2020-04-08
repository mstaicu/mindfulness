import React from 'react';

import { StateProvider } from './utils';

import Router from './router';

export default () => (
  <StateProvider>
    <Router />
  </StateProvider>
);
