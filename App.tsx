// App.tsx
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { Linking } from 'react-native';
import { AlertProvider } from './src/components/CustomAlert/AlertProvider';
import RootNavigator from './src/navigation/RootNavigator';
import { store } from './src/redux/store';

const App = () => {
  // Optional: Handle deep link when app is closed
  useEffect(() => {
    const getInitialURL = async () => {
      const url = await Linking.getInitialURL();
      if (url) {
        console.log('Initial URL:', url);
      }
    };
    getInitialURL();
  }, []);

  return (
    <Provider store={store}>
      <AlertProvider>
        <RootNavigator />
      </AlertProvider>
    </Provider>
  );
};

export default App;