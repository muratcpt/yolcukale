import React from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';

export default function GlobalLayout({ children }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Koyu arka plan
    paddingHorizontal: 20, // Kenarlardan boşluk
    paddingTop: 30, // Üstten ekstra boşluk
  },
});
