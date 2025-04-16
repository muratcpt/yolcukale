import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GlobalLayout from '../components/GlobalLayout';

export default function DriverMessages({ navigation }) {
  const [messages, setMessages] = useState([]);
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    const fetchMessagesAndReplies = async () => {
      try {
        const storedMessages = await AsyncStorage.getItem('passengerMessages');
        const storedReplies = await AsyncStorage.getItem('passengerReplies');
        const parsedMessages = storedMessages ? JSON.parse(storedMessages) : [];
        const parsedReplies = storedReplies ? JSON.parse(storedReplies) : [];
        setMessages(parsedMessages);
        setReplies(parsedReplies);
      } catch (err) {
        console.log('Veri okunamadı:', err);
      }
    };
    fetchMessagesAndReplies();
  }, []);

  const renderItem = ({ item }) => {
    const matchedReplies = replies.filter(r => r.replyTo === item.id || r.postId === item.postId);
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('ChatScreen', { postId: item.postId })}
        style={styles.card}
      >
        <Text style={styles.route}>{item.fromLocation} ➡ {item.toLocation}</Text>
        <Text style={styles.price}>Fiyat: {item.price}</Text>
        <Text style={styles.message}>💬 {item.message}</Text>
        <Text style={styles.date}>🕒 {item.sentAt}</Text>

        {matchedReplies.length > 0 && (
          <View style={styles.replyBox}>
            <Text style={styles.replyHeader}>📨 Yolcu Cevapları:</Text>
            {matchedReplies.map((r) => (
              <Text key={r.repliedAt} style={styles.replyItem}>- {r.replyText}</Text>
            ))}
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <GlobalLayout>
      <View style={styles.container}>
      <Text style={styles.header}>📨 Gelen Yolcu Cevapları</Text>
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
  replyBox: { marginTop: 10, paddingTop: 10, borderTopWidth: 1, borderTopColor: '#333' },
  replyHeader: { color: '#fff', fontSize: 14, marginBottom: 5 },
  replyItem: { color: '#bbb', fontSize: 13 },
});