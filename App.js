import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import ChatStackNavigator from './src/navigations/Navigator';

function App() {
  return (
    <NavigationContainer>
      <ChatStackNavigator/>
    </NavigationContainer>
  );
}

export default App;
