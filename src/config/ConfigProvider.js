import React from 'react';

const ConfigContext = React.createContext();

function ConfigProvider(props) {
  const [config, setConfig] = React.useState(0);

  const value = React.useMemo(() => [config, setConfig], [config]);

  return <ConfigContext.Provider value={value} {...props} />;
}

function useConfig() {
  const context = React.useContext(ConfigContext);
  if (!context) {
    throw new Error(`useConfig must be used within a ConfigProvider`);
  }
  return context;
}

export { ConfigProvider, useConfig };