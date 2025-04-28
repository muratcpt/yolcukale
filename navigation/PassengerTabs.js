import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import CreatePostScreen from '../screens/passenger/CreatePostScreen';
import MyPostsScreen from '../screens/passenger/MyPostsScreen';
import MessagesScreen from '../screens/passenger/MessagesScreen';
import ProfileScreen from '../screens/passenger/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function PassengerTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#7D5FFF',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          paddingBottom: 8,
          height: 60,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Yolculuk Oluştur') iconName = 'add-circle-outline';
          else if (route.name === 'İlanlarım') iconName = 'list-outline';
          else if (route.name === 'Mesajlarım') iconName = 'chatbubble-ellipses-outline';
          else if (route.name === 'Profil') iconName = 'person-circle-outline';


          return <Ionicons name={iconName} size={24} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Yolculuk Oluştur" component={CreatePostScreen} />
      <Tab.Screen name="İlanlarım" component={MyPostsScreen} />
      <Tab.Screen name="Mesajlarım" component={MessagesScreen} />
      <Tab.Screen name="Profil" component={ProfileScreen} />

    </Tab.Navigator>
  );
}
