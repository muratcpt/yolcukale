import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('passenger'); // Şoför veya Yolcu

  const handleSignup = async () => {
    if (!email || !password) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
      return;
    }

    const newUser = { email, password, userType };

    try {
      await AsyncStorage.setItem('user', JSON.stringify(newUser));
      Alert.alert('Başarı', 'Kayıt başarılı!');
      navigation.navigate('Login'); // Giriş ekranına yönlendir
    } catch (err) {
      Alert.alert('Hata', 'Kayıt sırasında bir hata oluştu');
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
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
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Kayıt Ol</Text>
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
  button: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16 },
  userTypeContainer: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
  userTypeText: { color: '#aaa', fontSize: 16 },
  selected: { color: '#3498db' },
});
