import React, {
  createContext,
  useEffect,
  useReducer,
  useContext,
  useRef
} from 'react';
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
    // repeatType: 'time',
    // repeatTime: 10000
  }
};

const StateContext = createContext();

const StateProvider = props => {
  console.log('Updating application state...');

  const [state, dispatch] = useReducer(
    (prevState, newState) => ({
      ...prevState,
      ...newState
    }),
    INITIAL_STATE
  );

  const previousState = useRef(state);

  /**
   * When the application loads, load the notification stored state
   */
  useEffect(() => {
    console.log('Retrieving the persistend application state...');

    const getAppState = async () => {
      try {
        const persistedState = await AsyncStorage.getItem('appState');

        if (persistedState !== null) {
          dispatch(persistedState);

          console.log('App state retrieved and loaded');
        }

        console.log('No persisted app state found');
      } catch (e) {
        console.error(e);
      }
    };

    getAppState();
  }, []);

  /**
   * When we have a global state change, persist it to storage
   */
  useEffect(() => {
    /**
     * todo(mircea): Hope this doesn't come back and bite us, a cheaper way of checking
     *    if two objects are the same, i.e. have the same properties and property values
     */
    if (JSON.stringify(previousState.current) !== JSON.stringify(state)) {
      console.log('App state changed, persisting it..');

      const persistState = async () => {
        try {
          await AsyncStorage.setItem('appState', JSON.stringify(state));

          console.log('Successfully persisted the app state');
        } catch (e) {
          console.error('There was a problem persisting the app state');
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
