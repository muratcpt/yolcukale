import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MyPostsScreen() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await AsyncStorage.getItem('posts');
      if (data) setPosts(JSON.parse(data));
    };
    const unsubscribe = fetchPosts();
    return () => unsubscribe;
  }, [posts]);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.from} ➜ {item.to}</Text>
      <Text style={styles.text}>Tarih: {item.date}</Text>
      <Text style={styles.text}>Kişi: {item.passengerCount}</Text>
      <Text style={styles.text}>Fiyat: {item.price} TL</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 40 }}>Henüz ilan yok.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  card: {
    backgroundColor: '#F1F1FF',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12
  },
  title: { fontSize: 18, fontWeight: 'bold', color: '#7D5FFF' },
  text: { fontSize: 16, marginTop: 4 }
});
