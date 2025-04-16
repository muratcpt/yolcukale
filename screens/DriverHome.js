import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GlobalLayout from '../components/GlobalLayout';

export default function DriverHome({ navigation }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPassengerPosts = async () => {
      try {
        const savedPosts = await AsyncStorage.getItem('passengerPosts');
        const parsedPosts = savedPosts ? JSON.parse(savedPosts) : [];
        setPosts(parsedPosts);
      } catch (err) {
        console.log('Yolcu ilanları alınamadı:', err);
      }
    };

    const unsubscribe = navigation.addListener('focus', fetchPassengerPosts);
    return unsubscribe;
  }, [navigation]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('PostDetail', { post: item })}
    >
      <Text style={styles.route}>{item.from} ➡ {item.to}</Text>
      <Text style={styles.price}>Fiyat: {item.price}</Text>
      <Text style={styles.date}>🕒 {item.createdAt}</Text>
    </TouchableOpacity>
  );

  const handleClearData = async () => {
    try {
      await AsyncStorage.clear();
      setPosts([]); // Veriler temizlendikten sonra listeyi sıfırla
      console.log("Veriler temizlendi!");
    } catch (err) {
      console.log("Veri temizlenirken hata oluştu:", err);
    }
  };

  return (
    <GlobalLayout>
      <View style={styles.container}>
        <Text style={styles.header}>📬 Yolcu İlanları</Text>
        {posts.length === 0 ? (
          <Text style={{ color: '#aaa' }}>Şu anda görüntülenecek ilan yok.</Text>
        ) : (
          <FlatList
            data={posts}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 30 }}
          />
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('DriverMessages')}
        >
          <Text style={styles.buttonText}>📨 Gönderilen Mesajlarım</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleClearData}>
          <Text style={{ color: 'red', marginTop: 20 }}>🧼 Verileri Temizle</Text>
        </TouchableOpacity>
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
  button: {
    marginTop: 20,
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16 },
});
