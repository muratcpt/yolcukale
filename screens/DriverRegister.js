import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function DriverRegister({ navigation }) {
  const [tc, setTc] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [plate, setPlate] = useState('');
  const [photo, setPhoto] = useState(null); // Şimdilik boş

  const handleRegister = () => {
    const driverData = {
      tc, name, phone, plate, photo,
    };
    console.log('Sürücü Kaydedildi:', driverData);

    // Kayıttan sonra ana sayfaya geç
    navigation.navigate('DriverHome');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Sürücü Kaydı 🚗</Text>

      <TextInput style={styles.input} placeholder="TC Kimlik No" keyboardType="numeric" value={tc} onChangeText={setTc} />
      <TextInput style={styles.input} placeholder="Ad Soyad" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Telefon" keyboardType="phone-pad" value={phone} onChangeText={setPhone} />
      <TextInput style={styles.input} placeholder="Araç Plaka" value={plate} onChangeText={setPlate} />
      <TextInput style={styles.input} placeholder="(Fotoğraf geçici olarak atlanıyor)" editable={false} />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Kayıt Ol ve Devam Et</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    backgroundColor: '#1e1e1e',
    padding: 15,
    borderRadius: 10,
    color: '#fff',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    width: '100%',
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
  },
});
