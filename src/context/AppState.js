import React, {
  createContext,
  useEffect,
  useState,
  useContext,
  useRef,
} from 'react';

import equal from 'deep-equal';

import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Initial state
 */
const INITIAL_STATE = {
  repeatInterval: 15 * 60 * 1000,
};

const StateContext = createContext();

const StateProvider = (props) => {
  /**
   * 1. Emit application state update
   * 2. Application state is updated
   * 3. If the previous application state is different from the current application state, save it to disk
   */
  const [state, setState] = useState(INITIAL_STATE);

  // Every time we emit a request to update and save the application state,
  // we store the previous state in this variable, in order to compare the two
  // objects and perform operations if they are different or not
  const previousState = useRef(state);

  const updateState = (nextState) => {
    console.log(
      `Updating React Native's app state. Data: ${JSON.stringify(
        nextState,
        null,
        2,
      )}`,
    );

    setState({
      ...state,
      ...nextState,
    });
  };

  const getAppState = async () => {
    // await AsyncStorage.removeItem('appState');
    console.log('Retrieving the application state from local storage...');

    try {
      const persistedState = JSON.parse(await AsyncStorage.getItem('appState'));

      if (persistedState !== null) {
        updateState(persistedState);
        console.log('Successfully retrieved saved state from local storage');
      } else {
        console.log(
          'No persisted app state found in local storage, using the default state',
        );
      }
    } catch (e) {
      console.error(
        `There was an error trying to load the application state from local storage. \n ${e}`,
      );
    }
  };

  const persistState = async () => {
    console.log('App state changed, persisting it to local storage..');

    try {
      await AsyncStorage.setItem('appState', JSON.stringify(state));
      console.log('Successfully persisted the app state to local storage');
    } catch (e) {
      console.error(
        'There was a problem persisting the app state to local storage',
      );
    } finally {
      // save the current state as the previous state in order to have
      // an account of the previous state recorded
      previousState.current = state;
    }
  };

  /**
   * when the application loads, load the disk saved application state
   */
  useEffect(() => {
    getAppState();
  }, []);

  /**
   * after we've emitted a request for a state update, save it to disk
   * if they previous state and the state after merging with the emitted state
   * are different
   */
  useEffect(() => {
    if (equal(previousState.current, state) === false) {
      persistState();
    }
  }, [state]);

  return <StateContext.Provider value={[state, updateState]} {...props} />;
};

const useAppState = () => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error('useAppState must be used within a StateContext');
  }
  return context;
};

export { StateProvider, useAppState };
