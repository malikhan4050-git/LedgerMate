import React from 'react';
import { Provider } from 'react-redux';

import RootNavigator from './src/navigation/RootNavigator';
import { store } from './src/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      {/* Simply remove SafeAreaView here. Handle it inside each screen/navigator instead */}
      <RootNavigator />
    </Provider>
  );
};

export default App;