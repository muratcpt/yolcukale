import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('passenger');
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
      return;
    }

    try {
      const user = await AsyncStorage.getItem('user');
      const parsedUser = user ? JSON.parse(user) : null;

      if (parsedUser && parsedUser.email === email && parsedUser.password === password) {
        if (parsedUser.userType === 'driver') {
          navigation.navigate('DriverHome');
        } else if (parsedUser.userType === 'passenger') {
          navigation.navigate('PassengerHome');
        }
      } else {
        Alert.alert('Hata', 'Yanlış email veya şifre');
      }
    } catch (err) {
      Alert.alert('Hata', 'Giriş sırasında bir hata oluştu');
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="E-posta"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Şifre"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <View style={styles.userTypeContainer}>
        <TouchableOpacity onPress={() => setUserType('driver')}>
          <Text style={[styles.userTypeText, userType === 'driver' && styles.selected]}>
            Şoför
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setUserType('passenger')}>
          <Text style={[styles.userTypeText, userType === 'passenger' && styles.selected]}>
            Yolcu
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Giriş Yap</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#121212' },
  input: {
    backgroundColor: '#1e1e1e',
    color: '#fff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
  },
  loginButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  loginButtonText: { color: '#fff', fontSize: 16 },
  userTypeContainer: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
  userTypeText: { color: '#aaa', fontSize: 16 },
  selected: { color: '#3498db' },
});
