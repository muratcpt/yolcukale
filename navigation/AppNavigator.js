import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import DriverRegister from '../screens/DriverRegister';
import PassengerRegister from '../screens/PassengerRegister';
import DriverHome from '../screens/DriverHome';
import DriverMessages from '../screens/DriverMessages';
import PassengerHome from '../screens/PassengerHome';
import CreatePost from '../screens/CreatePost';
import PostDetail from '../screens/PostDetail';
import PassengerPosts from '../screens/PassengerPosts';
import PassengerMessages from '../screens/PassengerMessages';
import ChatScreen from '../screens/ChatScreen';
import CleanerScreen from '../screens/CleanerScreen';
import SignUpScreen from '../screens/SignUpScreen';







const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Kullanıcı Tipi Seçimi */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignUpScreen} />
        
        {/* Kayıt Ekranları */}
        <Stack.Screen name="DriverRegister" component={DriverRegister} />
        <Stack.Screen name="PassengerRegister" component={PassengerRegister} />

        {/* Ana Sayfalar */}
        <Stack.Screen name="DriverHome" component={DriverHome} />
        
        <Stack.Screen name="PassengerHome" component={PassengerHome} />
        <Stack.Screen name="CreatePost" component={CreatePost} />
        <Stack.Screen name="PostDetail" component={PostDetail} />
        <Stack.Screen name="PassengerPosts" component={PassengerPosts} />
        <Stack.Screen name="PassengerMessages" component={PassengerMessages} />
        <Stack.Screen name="DriverMessages" component={DriverMessages} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen name="Cleaner" component={CleanerScreen} />






      </Stack.Navigator>
    </NavigationContainer>
  );
}
