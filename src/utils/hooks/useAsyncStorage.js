import { useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';

export const useAsyncStorage = (key, initialValue) => {
  const [value, update] = useState(initialValue);

  useEffect(() => {
    AsyncStorage.getItem(key)
      .then(retrievedValue => {
        if (retrievedValue === null) return initialValue;
        return JSON.parse(retrievedValue);
      })
      .then(update);
  }, [key, initialValue]);

  const setValue = newValue => {
    const valueToStore =
      newValue instanceof Function ? newValue(value) : newValue;
    update(valueToStore);
    AsyncStorage.setItem(key, JSON.stringify(valueToStore));
  };

  return [value, setValue];
};
