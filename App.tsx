import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import Toast from 'react-native-toast-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
;

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
    <NavigationContainer>
      <AppNavigator />
      <Toast />
    </NavigationContainer>
   </GestureHandlerRootView>
  );
};

export default App;
