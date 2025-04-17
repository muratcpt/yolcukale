import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import PassengerHome from './PassengerHome';
import PassengerPosts from './PassengerPosts';
import PassengerMessages from './PassengerMessages';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          backgroundColor: '#181818',
          borderTopColor: 'transparent',
          height: 60,
          paddingBottom: 5,
        },
        headerShown: false, // üstteki başlığı kaldırır
      }}
    >
      <Tab.Screen
        name="AnaSayfa"
        component={PassengerHome}
        options={{
          tabBarLabel: 'Ana Sayfa',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Ilanlarim"
        component={PassengerPosts}
        options={{
          tabBarLabel: 'İlanlarım',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list-outline" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Mesajlarim"
        component={PassengerMessages}
        options={{
          tabBarLabel: 'Mesajlarım',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubble-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
