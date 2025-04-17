import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginRegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('passenger');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleAuth = async () => {
    if (!email || !password) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
      return;
    }

    const userKey = `${userType}:${email}`;

    if (isRegistering) {
      await AsyncStorage.setItem(userKey, JSON.stringify({ email, password, userType }));
      Alert.alert('Başarılı', 'Kayıt başarılı, giriş yapabilirsin!');
      setIsRegistering(false);
    } else {
      const storedUser = await AsyncStorage.getItem(userKey);
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser.password === password) {
          navigation.replace(userType === 'driver' ? 'DriverHome' : 'PassengerHome');
        } else {
          Alert.alert('Hata', 'Hatalı şifre.');
        }
      } else {
        Alert.alert('Hata', 'Kullanıcı bulunamadı.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.userTypeContainer}>
        <TouchableOpacity onPress={() => setUserType('driver')}>
          <Text style={[styles.userTypeText, userType === 'driver' && styles.selected]}>
            🚗 Şoför
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setUserType('passenger')}>
          <Text style={[styles.userTypeText, userType === 'passenger' && styles.selected]}>
            🧑‍💼 Yolcu
          </Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Şifre"
        placeholderTextColor="#888"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleAuth}>
        <Text style={styles.buttonText}>{isRegistering ? 'Kayıt Ol' : 'Giriş Yap'}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsRegistering(!isRegistering)}>
        <Text style={styles.toggleText}>
          {isRegistering ? 'Hesabın var mı? Giriş Yap' : 'Hesabın yok mu? Kayıt Ol'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    padding: 25, 
    backgroundColor: '#121212',
  },
  input: {
    backgroundColor: '#1e1e1e',
    color: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  userTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  userTypeText: {
    color: '#aaa',
    fontSize: 16,
  },
  selected: {
    color: '#3498db',
    fontWeight: 'bold',
  },
  toggleText: {
    color: '#aaa',
    textAlign: 'center',
    marginTop: 15,
  },
});
