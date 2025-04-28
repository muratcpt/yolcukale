import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import AvailablePostsScreen from '../screens/driver/AvailablePostsScreen';
import DriverMessagesScreen from '../screens/driver/DriverMessagesScreen';
import DriverProfileScreen from '../screens/driver/DriverProfileScreen';


const Tab = createBottomTabNavigator();

export default function DriverTabs() {
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

          if (route.name === 'Yolcu İlanları') iconName = 'car-outline';
          else if (route.name === 'Mesajlarım') iconName = 'chatbox-outline';
          else if (route.name === 'Profil') iconName = 'person-circle-outline';


          return <Ionicons name={iconName} size={24} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Yolcu İlanları" component={AvailablePostsScreen} />
      <Tab.Screen name="Mesajlarım" component={DriverMessagesScreen} />
      <Tab.Screen name="Profil" component={DriverProfileScreen} />

    </Tab.Navigator>
  );
}
