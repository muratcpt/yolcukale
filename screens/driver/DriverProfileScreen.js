import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function DriverProfileScreen() {
  const navigation = useNavigation();
  const [user, setUser] = useState({ name: '', phone: '' });

  useEffect(() => {
    const fetchUser = async () => {
      const data = await AsyncStorage.getItem('user');
      if (data) {
        setUser(JSON.parse(data));
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    Alert.alert("Çıkış Yap", "Emin misiniz?", [
      { text: "İptal" },
      {
        text: "Evet", onPress: async () => {
          await AsyncStorage.removeItem('user');
          navigation.replace("Auth");
        }
      }
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profil</Text>
      <Text style={styles.info}>Ad Soyad: {user.name}</Text>
      <Text style={styles.info}>Telefon: {user.phone}</Text>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Çıkış Yap</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 28, color: '#7D5FFF', fontWeight: 'bold', marginBottom: 24 },
  info: { fontSize: 18, marginBottom: 12 },
  logoutButton: {
    marginTop: 40, backgroundColor: '#7D5FFF',
    padding: 16, borderRadius: 10, alignItems: 'center'
  },
  logoutText: { color: '#fff', fontSize: 18 }
});
