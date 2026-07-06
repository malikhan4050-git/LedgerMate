import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

import RootNavigator from './src/navigation/RootNavigator';
import { store } from './src/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
        <RootNavigator />
      </SafeAreaView>
    </Provider>
  );
};

export default App;