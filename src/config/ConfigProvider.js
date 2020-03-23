import React, { createContext, useReducer, useContext } from 'react';

/**
 * Notification constants
 */
const DEFAULT_NOTIFICATION_ID = '1';
const DEFAULT_NOTIFICATION_TITLE = 'Mesaj publicitar';
const DEFAULT_NOTIFICATION_MESSAGE = 'Atenția la respirație';

/**
 * Initial state
 */
const INITIAL_STATE = {
  /**
   *
   */
  active: false,
  /**
   *
   */
  notification: {
    id: DEFAULT_NOTIFICATION_ID,

    title: DEFAULT_NOTIFICATION_TITLE,
    message: DEFAULT_NOTIFICATION_MESSAGE,

    /**
     * If 'repeatType' is set to 'time', you need to specify 'repeatTime' as well, as a value of milliseconds
     * that define the interval between each repeat
     */
    // repeatType: 'minute',
    repeatType: 'time',
    repeatTime: 10000
  }
};

const reducer = (prevState, newState) => ({
  ...prevState,
  ...newState
});

const ConfigContext = createContext();

const ConfigProvider = props => (
  <ConfigContext.Provider
    value={useReducer(reducer, INITIAL_STATE)}
    {...props}
  />
);

const useConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error(`useConfig must be used within a ConfigProvider`);
  }
  return context;
};

export { ConfigProvider, useConfig };
