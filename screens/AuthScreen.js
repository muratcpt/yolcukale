import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function AuthScreen() {
  const [mode, setMode] = useState('login'); // 'login' or 'register'
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState(null); // 'passenger' or 'driver'
  const navigation = useNavigation();

  const toggleMode = () => {
    setMode(prev => (prev === 'login' ? 'register' : 'login'));
    setName('');
    setPhone('');
    setRole(null);
  };

  const handleLogin = async () => {
    if (!phone || !role) {
      return Alert.alert('Hata', 'Telefon ve kullanıcı tipi gerekli.');
    }

    const data = await AsyncStorage.getItem('user');
    if (!data) return Alert.alert('Hata', 'Kayıtlı kullanıcı bulunamadı.');

    const user = JSON.parse(data);
    if (user.phone !== phone) {
      return Alert.alert('Hata', 'Telefon numarası eşleşmedi.');
    }

    if (user.role !== role) {
      return Alert.alert('Hata', 'Rol bilgisi uyuşmuyor. Doğru giriş tipini seçin.');
    }

    user.role === 'driver'
      ? navigation.replace('DriverTabs')
      : navigation.replace('PassengerTabs');
  };

  const handleRegister = async () => {
    if (!name || !phone || !role) {
      return Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
    }

    const user = { name, phone, role };
    await AsyncStorage.setItem('user', JSON.stringify(user));
    Alert.alert('Başarılı', 'Kayıt başarılı! Şimdi giriş yapabilirsiniz.');

    // mod ve form reset
    setMode('login');
    setName('');
    setPhone('');
    setRole(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {mode === 'login' ? 'Giriş Yap' : 'Kayıt Ol'}
      </Text>

      {mode === 'register' && (
        <TextInput
          placeholder="Ad Soyad"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
      )}

      <TextInput
        placeholder="Telefon"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        style={styles.input}
      />

      {/* Her iki modda da kullanıcı tipi seçilsin */}
      {(mode === 'register' || mode === 'login') && (
        <>
          <TouchableOpacity
            style={[styles.optionButton, role === 'passenger' && styles.selected]}
            onPress={() => setRole('passenger')}
          >
            <Text style={styles.optionText}>Yolcu</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.optionButton, role === 'driver' && styles.selected]}
            onPress={() => setRole('driver')}
          >
            <Text style={styles.optionText}>Sürücü</Text>
          </TouchableOpacity>
        </>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={mode === 'login' ? handleLogin : handleRegister}
      >
        <Text style={styles.buttonText}>
          {mode === 'login' ? 'Giriş Yap' : 'Kayıt Ol'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={toggleMode}>
        <Text style={styles.toggleText}>
          {mode === 'login'
            ? 'Hesabın yok mu? Kayıt ol'
            : 'Zaten hesabın var mı? Giriş yap'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24 },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#7D5FFF',
    marginBottom: 24,
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 14,
    marginBottom: 16
  },
  optionButton: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#7D5FFF',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10
  },
  selected: { backgroundColor: '#EDE7FF' },
  optionText: { fontSize: 18, color: '#7D5FFF' },
  button: {
    backgroundColor: '#7D5FFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8
  },
  buttonText: { color: '#fff', fontSize: 18 },
  toggleText: {
    marginTop: 20,
    color: '#7D5FFF',
    textAlign: 'center'
  }
});
