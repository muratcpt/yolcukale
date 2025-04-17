import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GlobalLayout from '../components/GlobalLayout';

export default function DriverHome({ navigation }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const savedPosts = await AsyncStorage.getItem('passengerPosts');
      setPosts(savedPosts ? JSON.parse(savedPosts) : []);
    };

    fetchPosts();
    navigation.addListener('focus', fetchPosts);
  }, [navigation]);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('PostDetail', { post: item })}>
      <Text style={styles.route}>{item.from} ➡ {item.to}</Text>
      <Text style={styles.price}>Fiyat: {item.price}</Text>
      <Text style={styles.date}>🕒 {item.createdAt}</Text>
    </TouchableOpacity>
  );

  return (
    <GlobalLayout>
      <View style={styles.container}>
      <Text style={styles.header}>📬 Yolcu İlanları</Text>
      {posts.length === 0 ? (
        <Text style={styles.noPost}>Henüz ilan yok.</Text>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 30 }}
        />
      )}
    </View>
    </GlobalLayout> 
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  header: {
    color: '#fff',
    fontSize: 22,
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#1e1e1e',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  route: {
    color: '#fff',
    fontSize: 16,
  },
  price: {
    color: '#28a745',
    fontSize: 16,
    marginTop: 5,
  },
  date: {
    color: '#aaa',
    fontSize: 12,
    marginTop: 5,
  },
  noPost: {
    color: '#aaa',
    textAlign: 'center',
    marginTop: 20,
  },
});
