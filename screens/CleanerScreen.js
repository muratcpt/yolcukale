import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CleanerScreen({ navigation }) {
  useEffect(() => {
    const clearStorage = async () => {
      try {
        await AsyncStorage.clear();
        Alert.alert('Temizlik tamam!', 'Tüm yerel veriler başarıyla silindi.');
        console.log('Tüm AsyncStorage temizlendi');
        setTimeout(() => {
          navigation.replace('DriverHome');
        }, 1000);
      } catch (err) {
        console.log('Temizlik hatası:', err);
        Alert.alert('Hata', 'Veriler silinirken bir sorun oluştu.');
      }
    };

    clearStorage();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Veriler temizleniyor...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  text: {
    color: '#fff',
    fontSize: 18,
  },
});