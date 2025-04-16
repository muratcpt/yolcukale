import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GlobalLayout from '../components/GlobalLayout';


export default function PassengerMessages({ navigation }) {
  const [messages, setMessages] = useState([]);
  const [replies, setReplies] = useState({});

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const stored = await AsyncStorage.getItem('passengerMessages');
        const parsed = stored ? JSON.parse(stored) : [];
        setMessages(parsed);
      } catch (err) {
        console.log('Mesajlar yüklenemedi:', err);
      }
    };

    const unsubscribe = navigation.addListener('focus', loadMessages);
    return unsubscribe;
  }, [navigation]);

  const handleReply = async (msgId) => {
    const replyText = replies[msgId];
    if (!replyText || !replyText.trim()) {
      Alert.alert('Boş cevap gönderilemez');
      return;
    }

    const replyObj = {
      replyTo: msgId,
      replyText: replyText.trim(),
      repliedAt: new Date().toLocaleString(),
      postId: messages.find(m => m.id === msgId)?.postId || null,
    };

    try {
      const stored = await AsyncStorage.getItem('passengerReplies');
      const parsed = stored ? JSON.parse(stored) : [];
      const updated = [...parsed, replyObj];
      await AsyncStorage.setItem('passengerReplies', JSON.stringify(updated));

      Alert.alert('Cevap Gönderildi');
      setReplies((prev) => ({ ...prev, [msgId]: '' }));
    } catch (err) {
      Alert.alert('Hata', 'Cevap kaydedilemedi');
      console.log('Cevap hatası:', err);
    }
  };

  const handleDelete = async (id) => {
    Alert.alert('Mesajı Sil', 'Bu mesajı silmek istediğine emin misin?', [
      { text: 'İptal', style: 'cancel' },
      {
        text: 'Sil', style: 'destructive', onPress: async () => {
          try {
            const filtered = messages.filter((msg) => msg.id !== id);
            setMessages(filtered);
            await AsyncStorage.setItem('passengerMessages', JSON.stringify(filtered));
            Alert.alert('Silindi');
          } catch (err) {
            console.log('Silme hatası:', err);
            Alert.alert('Hata', 'Mesaj silinemedi');
          }
        }
      }
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.route}>{item.fromLocation} ➡ {item.toLocation}</Text>
      <Text style={styles.price}>Fiyat: {item.price}</Text>
      <Text style={styles.message}>💬 {item.message}</Text>
      <Text style={styles.date}>🕒 {item.sentAt}</Text>

      <TextInput
        placeholder="Cevabınızı yazın..."
        placeholderTextColor="#aaa"
        style={styles.input}
        value={replies[item.id] || ''}
        onChangeText={(text) => setReplies((prev) => ({ ...prev, [item.id]: text }))}
      />
      <TouchableOpacity style={styles.button} onPress={() => handleReply(item.id)}>
        <Text style={styles.buttonText}>Cevapla</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteBtn} onPress={() => handleDelete(item.id)}>
        <Text style={styles.deleteText}>🗑️ Sil</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <GlobalLayout>
      <View style={styles.container}>
      <Text style={styles.header}>📨 Gelen Mesajlarım</Text>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
    </GlobalLayout>
    
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 20 },
  header: { color: '#fff', fontSize: 22, marginBottom: 15 },
  card: {
    backgroundColor: '#1e1e1e',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  route: { color: '#fff', fontSize: 16 },
  price: { color: '#28a745', fontSize: 15, marginTop: 5 },
  message: { color: '#ccc', fontSize: 14, marginTop: 10 },
  date: { color: '#aaa', fontSize: 12, marginTop: 5 },
  input: {
    backgroundColor: '#2b2b2b',
    color: '#fff',
    padding: 10,
    borderRadius: 6,
    marginTop: 10,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 6,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  deleteBtn: {
    marginTop: 10,
    backgroundColor: '#ff4d4d',
    padding: 10,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  deleteText: { color: '#fff', fontWeight: 'bold' },
});