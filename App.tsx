import React from 'react';
import { Provider } from 'react-redux';

import { AlertProvider } from './src/components/CustomAlert/AlertProvider';
import RootNavigator from './src/navigation/RootNavigator';
import { store } from './src/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <AlertProvider>
        <RootNavigator />
      </AlertProvider>
    </Provider>
  );
};

export default App;