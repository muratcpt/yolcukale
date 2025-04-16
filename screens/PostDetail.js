import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GlobalLayout from '../components/GlobalLayout';


export default function PostDetail({ route }) {
  const { post } = route.params;
  const [message, setMessage] = useState('');

  const handleSend = async () => {
    if (!message.trim()) {
      Alert.alert('Boş mesaj gönderilemez');
      return;
    }

    const newMessage = {
      id: Date.now().toString(),
      postId: post.id,
      fromLocation: post.from,
      toLocation: post.to,
      price: post.price,
      message: message.trim(),
      sentAt: new Date().toLocaleString(),
    };

    try {
      const existingMessages = await AsyncStorage.getItem('passengerMessages');
      const parsed = existingMessages ? JSON.parse(existingMessages) : [];
      const updated = [...parsed, newMessage];
      await AsyncStorage.setItem('passengerMessages', JSON.stringify(updated));

      Alert.alert('Mesaj Gönderildi', 'Yolcuya mesaj iletildi.');
      setMessage('');
    } catch (err) {
      Alert.alert('Hata', 'Mesaj kaydedilemedi.');
      console.log('Mesaj kayıt hatası:', err);
    }
  };

  return (
    <GlobalLayout>
      <View style={styles.container}>
      <Text style={styles.title}>Yolculuk Detayı</Text>

      <Text style={styles.info}>Nereden: {post.from}</Text>
      <Text style={styles.info}>Nereye: {post.to}</Text>
      <Text style={styles.info}>Fiyat: {post.price}</Text>

      <Text style={styles.subTitle}>💬 Mesaj Gönder:</Text>
      <TextInput
        placeholder="Mesajınızı yazın..."
        placeholderTextColor="#aaa"
        style={styles.input}
        value={message}
        onChangeText={setMessage}
      />

      <TouchableOpacity style={styles.button} onPress={handleSend}>
        <Text style={styles.buttonText}>Gönder</Text>
      </TouchableOpacity>
    </View>
    </GlobalLayout>
    
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 20 },
  title: { fontSize: 22, color: '#fff', marginBottom: 15 },
  subTitle: { fontSize: 18, color: '#ccc', marginTop: 20, marginBottom: 10 },
  info: { color: '#ccc', fontSize: 16, marginBottom: 5 },
  input: {
    backgroundColor: '#1e1e1e',
    color: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#1e90ff',
    padding: 14,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});