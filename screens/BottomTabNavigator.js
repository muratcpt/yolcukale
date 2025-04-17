import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import PassengerHome from './PassengerHome';
import PassengerPosts from './PassengerPosts';
import PassengerMessages from './PassengerMessages';

const Tab = createBottomTabNavigator();

export default function PassengerTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Ana Sayfa') iconName = 'home-outline';
          else if (route.name === 'İlanlarım') iconName = 'list-outline';
          else if (route.name === 'Mesajlarım') iconName = 'chatbubble-ellipses-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarStyle: { backgroundColor: '#121212' },
      })}
    >
      <Tab.Screen name="Ana Sayfa" component={PassengerHome} />
      <Tab.Screen name="İlanlarım" component={PassengerPosts} />
      <Tab.Screen name="Mesajlarım" component={PassengerMessages} />
    </Tab.Navigator>
  );
}
