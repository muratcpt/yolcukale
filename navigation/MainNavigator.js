import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthScreen from '../screens/AuthScreen';
// ileride eklenecekler:
import PassengerTabs from './PassengerTabs';
import DriverTabs from './DriverTabs';

const Stack = createNativeStackNavigator();

export default function MainNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="PassengerTabs" component={PassengerTabs} />
        <Stack.Screen name="DriverTabs" component={DriverTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
