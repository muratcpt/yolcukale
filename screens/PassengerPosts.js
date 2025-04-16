import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GlobalLayout from '../components/GlobalLayout';


export default function PassengerPosts({ navigation }) {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const savedPosts = await AsyncStorage.getItem('passengerPosts');
      const parsed = savedPosts ? JSON.parse(savedPosts) : [];
      setPosts(parsed);
    } catch (err) {
      console.log('Veri okunamadı:', err);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', fetchPosts);
    return unsubscribe;
  }, [navigation]);

  const deletePost = async (id) => {
    Alert.alert(
      'Silmek istediğine emin misin?',
      'Bu işlem geri alınamaz.',
      [
        { text: 'İptal', style: 'cancel' },
        {
          text: 'Sil',
          style: 'destructive',
          onPress: async () => {
            const filtered = posts.filter((p) => p.id !== id);
            setPosts(filtered);
            await AsyncStorage.setItem('passengerPosts', JSON.stringify(filtered));
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.route}>{item.from} ➡ {item.to}</Text>
      <Text style={styles.price}>Fiyat: {item.price}</Text>
      <Text style={styles.date}>🕒 {item.createdAt}</Text>

      <TouchableOpacity style={styles.deleteBtn} onPress={() => deletePost(item.id)}>
        <Text style={styles.deleteText}>🗑️ Sil</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <GlobalLayout>
      <View style={styles.container}>
      <Text style={styles.header}>İlanlarım</Text>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 30 }}
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
  price: { color: '#28a745', fontSize: 16, marginTop: 5 },
  date: { color: '#aaa', fontSize: 12, marginTop: 5 },
  deleteBtn: {
    marginTop: 10,
    backgroundColor: '#ff4d4d',
    padding: 10,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  deleteText: { color: '#fff', fontWeight: 'bold' },
});
