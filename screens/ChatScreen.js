import React, { useEffect, useState, useRef } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GlobalLayout from '../components/GlobalLayout';


export default function ChatScreen({ route }) {
  const { postId } = route.params;
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const flatListRef = useRef(null);

  useEffect(() => {
    loadConversation();
  }, [postId]);

  const loadConversation = async () => {
    const msgData = await AsyncStorage.getItem('passengerMessages');
    const replyData = await AsyncStorage.getItem('passengerReplies');
    const msgList = msgData ? JSON.parse(msgData) : [];
    const replyList = replyData ? JSON.parse(replyData) : [];

    const combined = [];

    msgList
      .filter(m => m.postId === postId)
      .forEach(m => combined.push({
        id: m.id,
        text: m.message,
        time: m.sentAt,
        sender: 'driver',
        type: 'message'
      }));

    replyList
      .filter(r => r.postId === postId)
      .forEach(r => combined.push({
        id: r.repliedAt,
        text: r.replyText,
        time: r.repliedAt,
        sender: 'passenger',
        type: 'reply'
      }));

    const sorted = combined.sort((a, b) => new Date(a.time) - new Date(b.time));
    setMessages(sorted);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      postId: postId,
      message: input.trim(),
      fromLocation: 'Driver',
      toLocation: '',
      price: '',
      sentAt: new Date().toISOString(),
    };

    try {
      const existing = await AsyncStorage.getItem('passengerMessages');
      const parsed = existing ? JSON.parse(existing) : [];
      const updated = [...parsed, newMessage];
      await AsyncStorage.setItem('passengerMessages', JSON.stringify(updated));
      setInput('');
      await loadConversation();
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    } catch (err) {
      console.log('Mesaj gönderilemedi:', err);
    }
  };

  const handleDelete = async (item) => {
    Alert.alert('Mesajı Sil', 'Bu mesajı silmek istiyor musun?', [
      { text: 'İptal', style: 'cancel' },
      {
        text: 'Sil', style: 'destructive', onPress: async () => {
          try {
            if (item.type === 'message') {
              const existing = await AsyncStorage.getItem('passengerMessages');
              const parsed = existing ? JSON.parse(existing) : [];
              const updated = parsed.filter(m => m.id !== item.id);
              await AsyncStorage.setItem('passengerMessages', JSON.stringify(updated));
            } else {
              const existing = await AsyncStorage.getItem('passengerReplies');
              const parsed = existing ? JSON.parse(existing) : [];
              const updated = parsed.filter(r => r.repliedAt !== item.id);
              await AsyncStorage.setItem('passengerReplies', JSON.stringify(updated));
            }
            await loadConversation();
          } catch (err) {
            console.log('Silme hatası:', err);
          }
        }
      }
    ]);
  };

  const renderItem = ({ item }) => {
    let displayTime = 'Geçersiz';
    try {
      const parsed = new Date(item.time);
      displayTime = !isNaN(parsed) ? parsed.toLocaleString() : 'Geçersiz';
    } catch {}

    return (
      <GlobalLayout>
        <View
        style={[
          styles.bubble,
          item.sender === 'driver' ? styles.driverBubble : styles.passengerBubble
        ]}
      >
        <Text style={styles.text}>{item.text}</Text>
        <Text style={styles.time}>{displayTime}</Text>
        <TouchableOpacity onPress={() => handleDelete(item)}>
          <Text style={styles.delete}>🗑️ Sil</Text>
        </TouchableOpacity>
      </View>
      </GlobalLayout>
      
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={80}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 20 }}
      />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Mesaj yaz..."
          placeholderTextColor="#aaa"
          style={styles.input}
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendText}>Gönder</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  bubble: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: '80%',
  },
  driverBubble: {
    backgroundColor: '#2d89ef',
    alignSelf: 'flex-start',
  },
  passengerBubble: {
    backgroundColor: '#28a745',
    alignSelf: 'flex-end',
  },
  text: { color: '#fff', fontSize: 16 },
  time: { color: '#ccc', fontSize: 10, marginTop: 4 },
  delete: { color: 'red', fontSize: 12, marginTop: 5 },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#1c1c1c',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#2b2b2b',
    color: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#3498db',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sendText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});