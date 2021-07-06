import React from 'react';

import { StateProvider } from './context';

import App from './app';

export default () => (
  <StateProvider>
    <App />
  </StateProvider>
);
