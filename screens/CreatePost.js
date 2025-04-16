import React, { useState, useEffect } from 'react';
import { View, Text, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import routeData from '../data/location_routes_with_date.json';
import dayjs from 'dayjs';

const LOCATIONS = [...new Set(routeData.map(r => r.from))];

export default function CreatePost({ navigation }) {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [price, setPrice] = useState(null);

  useEffect(() => {
    if (from && to && from !== to) {
      const match = routeData.find(
        (r) => r.from === from && r.to === to
      );
      if (match) setPrice(match.price);
      else setPrice(null);
    } else {
      setPrice(null);
    }
  }, [from, to]);

  const handlePost = async () => {
    if (!from || !to) {
      Alert.alert('Eksik bilgi', 'Lütfen başlangıç ve varış lokasyonu seç.');
      return;
    }

    if (from === to) {
      Alert.alert('Hatalı Seçim', 'Aynı lokasyonlar arasında yolculuk yapılamaz.');
      return;
    }

    if (!price) {
      Alert.alert('Fiyat Bulunamadı', 'Bu güzergah için fiyat sistemde tanımlı değil.');
      return;
    }

    const newPost = {
      id: Date.now().toString(),
      from,
      to,
      price,
      createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    };

    try {
      const existingPosts = await AsyncStorage.getItem('passengerPosts');
      const posts = existingPosts ? JSON.parse(existingPosts) : [];
      const updatedPosts = [...posts, newPost];
      await AsyncStorage.setItem('passengerPosts', JSON.stringify(updatedPosts));

      Alert.alert('Başarılı', 'Yolculuk isteğin kaydedildi!');
      navigation.goBack();
    } catch (err) {
      console.log('Hata:', err);
      Alert.alert('Hata', 'İlan kaydedilemedi.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Yolculuk Oluştur</Text>

      <Text style={styles.label}>Nereden?</Text>
      <Picker selectedValue={from} onValueChange={setFrom} style={styles.picker}>
        <Picker.Item label="Lokasyon seç" value="" />
        {LOCATIONS.map((loc) => (
          <Picker.Item key={loc} label={loc} value={loc} />
        ))}
      </Picker>

      <Text style={styles.label}>Nereye?</Text>
      <Picker selectedValue={to} onValueChange={setTo} style={styles.picker}>
        <Picker.Item label="Lokasyon seç" value="" />
        {LOCATIONS.map((loc) => (
          <Picker.Item key={loc} label={loc} value={loc} />
        ))}
      </Picker>

      {price && (
        <Text style={styles.priceInfo}>💸 Bu yolculuk için belirlenen fiyat: <Text style={{ fontWeight: 'bold' }}>{price}</Text>
        </Text>
      )}

      <TouchableOpacity style={styles.button} onPress={handlePost}>
        <Text style={styles.buttonText}>Paylaş</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 20, justifyContent: 'center' },
  title: { fontSize: 22, color: '#fff', marginBottom: 20, textAlign: 'center' },
  label: { color: '#ccc', marginBottom: 5, marginTop: 10 },
  picker: { backgroundColor: '#1e1e1e', color: '#fff', borderRadius: 10, marginBottom: 10 },
  priceInfo: { color: '#fff', fontSize: 16, marginVertical: 15, textAlign: 'center' },
  button: { backgroundColor: '#28a745', padding: 15, borderRadius: 10, marginTop: 20 },
  buttonText: { color: '#fff', textAlign: 'center', fontSize: 16 },
});
