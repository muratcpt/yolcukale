import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import GlobalLayout from '../components/GlobalLayout';


export default function PassengerHome({ navigation }) {
  return (
    <GlobalLayout>
      <View style={styles.container}>
      <Text style={styles.title}>Yolcu Ana Sayfa 🙋‍♂️</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('CreatePost')}
      >
        <Text style={styles.buttonText}>+ Post Oluştur</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('PassengerPosts')} style={{ marginTop: 20 }}>
          <Text style={{ color: 'white', fontSize: 16 }}>📋 İlanlarım</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('PassengerMessages')} style={{ marginTop: 20 }}>
        <Text style={{ color: 'white', fontSize: 16 }}>📨 Gelen Mesajlarım</Text>
      </TouchableOpacity>


    </View>
    </GlobalLayout>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    color: '#fff',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
