import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import ChatStackNavigator from './src/navigations/Navigator';

// function HomeScreen() {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Home Screen</Text>
//     </View>
//   );
// }

// const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <ChatStackNavigator/>
    </NavigationContainer>
  );
}

export default App;
