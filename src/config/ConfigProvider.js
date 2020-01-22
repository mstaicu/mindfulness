import React from 'react';

const ConfigContext = React.createContext();

function useConfig() {
  const context = React.useContext(ConfigContext);
  if (!context) {
    throw new Error(`useConfig must be used within a ConfigProvider`);
  }
  return context;
}

function ConfigProvider(props) {
  const [config, setConfig] = React.useState(0);

  const value = React.useMemo(() => [config, setConfig], [config]);

  return <ConfigContext.Provider value={value} {...props} />;
}

export { ConfigProvider, useConfig };
