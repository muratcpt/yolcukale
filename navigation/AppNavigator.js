import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginRegisterScreen from '../screens/LoginRegisterScreen';
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


const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginRegister">
        {/* Kullanıcı Tipi Seçimi */}
        <Stack.Screen name="LoginRegister" component={LoginRegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="DriverHome" component={DriverHome} />
        <Stack.Screen name="PassengerHome" component={PassengerHome} />

        {/* Kayıt Ekranı */}      
        {/* Kayıt Ekranları */}
        <Stack.Screen name="DriverRegister" component={DriverRegister} />
        <Stack.Screen name="PassengerRegister" component={PassengerRegister} />
        {/* Ana Sayfalar */}

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
