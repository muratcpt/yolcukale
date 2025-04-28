import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DriverMessagesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>DriverMessagesScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 22, fontWeight: 'bold', color: '#7D5FFF' }
});
