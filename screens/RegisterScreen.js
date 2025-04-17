import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function RegisterScreen() {
  const [userType, setUserType] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tc, setTc] = useState(''); // Sürücüler için TC kimlik numarası
  const [vehiclePlate, setVehiclePlate] = useState(''); // Sürücüler için araç plakası
  const navigation = useNavigation();

  const handleRegister = () => {
    if (!name || !email || !password || (userType === 'driver' && (!tc || !vehiclePlate))) {
      Alert.alert('Eksik Bilgi', 'Lütfen tüm alanları doldurun');
      return;
    }

    // Kayıt işlemi burada yapılır (Örneğin, Firebase ile kayıt yapılabilir)

    if (userType === 'driver') {
      navigation.navigate('DriverHome');  // Sürücü ana sayfasına yönlendir
    } else if (userType === 'passenger') {
      navigation.navigate('PassengerHome');  // Yolcu ana sayfasına yönlendir
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kayıt Ol</Text>

      <TextInput
        style={styles.input}
        placeholder="Ad Soyad"
        value={name}
        onChangeText={setName}
      />
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

      {userType === 'driver' && (
        <>
          <TextInput
            style={styles.input}
            placeholder="TC Kimlik No"
            value={tc}
            onChangeText={setTc}
          />
          <TextInput
            style={styles.input}
            placeholder="Araç Plakası"
            value={vehiclePlate}
            onChangeText={setVehiclePlate}
          />
        </>
      )}

      <Text style={styles.label}>Kullanıcı Tipi Seçin:</Text>
      <View style={styles.userTypeContainer}>
        <TouchableOpacity onPress={() => setUserType('driver')} style={styles.button}>
          <Text style={styles.buttonText}>Sürücü</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setUserType('passenger')} style={styles.button}>
          <Text style={styles.buttonText}>Yolcu</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Kayıt Ol</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#1e1e1e',
    color: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  label: {
    color: '#fff',
    marginBottom: 10,
    marginTop: 20,
  },
  userTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  registerButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});
