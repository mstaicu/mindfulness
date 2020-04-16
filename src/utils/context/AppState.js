import React, {
  createContext,
  useEffect,
  useReducer,
  useContext,
  useRef
} from 'react';

import deepmerge from 'deepmerge';
import equal from 'deep-equal';

import AsyncStorage from '@react-native-community/async-storage';

/**
 * Default notification values
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
    repeatType: 'minute'

    /**
     * TODO: Implement custom time offsets
     */
    // repeatType: 'time',
    // repeatTime: 10000
  }
};

const StateContext = createContext();

const StateProvider = props => {
  const [state, dispatch] = useReducer(deepmerge, INITIAL_STATE);
  const previousState = useRef(state);

  /**
   * When the application loads, load the notification stored state
   */
  useEffect(() => {
    console.log('Retrieving the application state from local storage...');

    const getAppState = async () => {
      try {
        const serializedPersistedState = await AsyncStorage.getItem('appState');
        const persistedState = JSON.parse(serializedPersistedState);

        if (persistedState !== null) {
          dispatch(persistedState);
          console.log('App state retrieved from local storage');
        } else {
          console.log(
            'No persisted app state found in local storage, using the default state'
          );
        }
      } catch (e) {
        console.error(
          `There was an error trying to load the application state from local storage. \n ${e}`
        );
      }
    };

    getAppState();
  }, []);

  /**
   * When we have a global state change, persist it to storage
   */
  useEffect(() => {
    if (equal(previousState.current, state) === false) {
      console.log('App state changed, persisting it to local storage..');

      const persistState = async () => {
        try {
          await AsyncStorage.setItem('appState', JSON.stringify(state));

          console.log('Successfully persisted the app state to local storage');
        } catch (e) {
          console.error(
            'There was a problem persisting the app state to local storage'
          );
        }
      };

      persistState();

      previousState.current = state;
    }
  }, [state]);

  return <StateContext.Provider value={[state, dispatch]} {...props} />;
};

const useAppState = () => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error(`useAppState must be used within a StateContext`);
  }
  return context;
};

export { StateProvider, useAppState };
