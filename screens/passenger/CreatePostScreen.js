import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  Alert
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { locations, prices } from '../../constants/locations';

export default function CreatePostScreen() {
  const [openFrom, setOpenFrom] = useState(false);
  const [openTo, setOpenTo] = useState(false);
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);

  const [fromItems, setFromItems] = useState([]);
  const [toItems, setToItems] = useState([]);

  const [passengerCount, setPassengerCount] = useState('1');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [calculatedPrice, setCalculatedPrice] = useState(null);

  useEffect(() => {
    const formatted = locations.map((loc) => ({
      label: loc,
      value: loc
    }));
    setFromItems(formatted);
    setToItems(formatted);
  }, []);

  useEffect(() => {
    if (from && to) {
      const match = prices.find(p => p.from === from && p.to === to);
      if (match) setCalculatedPrice(match.price);
      else setCalculatedPrice(250); // default fallback
    }
  }, [from, to]);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const handleSharePost = async () => {
    if (!from || !to || !passengerCount || !date) {
      return Alert.alert("Hata", "Lütfen tüm alanları doldurun.");
    }

    const newPost = {
      id: Date.now().toString(),
      from,
      to,
      passengerCount,
      date: date.toLocaleDateString(),
      price: calculatedPrice || 250
    };

    try {
      const existing = await AsyncStorage.getItem('posts');
      const posts = existing ? JSON.parse(existing) : [];
      posts.push(newPost);
      await AsyncStorage.setItem('posts', JSON.stringify(posts));
      Alert.alert("Başarılı", "İlan başarıyla paylaşıldı ✅");

      // reset form
      setFrom(null);
      setTo(null);
      setPassengerCount('1');
      setCalculatedPrice(null);
    } catch (err) {
      Alert.alert("Hata", "İlan kaydedilirken bir hata oluştu.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nereden</Text>
      <DropDownPicker
        open={openFrom}
        value={from}
        items={fromItems}
        setOpen={setOpenFrom}
        setValue={setFrom}
        setItems={setFromItems}
        placeholder="Başlangıç Noktası Seç"
        style={styles.dropdown}
        zIndex={3000}
        zIndexInverse={1000}
      />

      <Text style={styles.label}>Nereye</Text>
      <DropDownPicker
        open={openTo}
        value={to}
        items={toItems}
        setOpen={setOpenTo}
        setValue={setTo}
        setItems={setToItems}
        placeholder="Varış Noktası Seç"
        style={styles.dropdown}
        zIndex={2000}
        zIndexInverse={2000}
      />

      <Text style={styles.label}>Tarih</Text>
      <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
        <Text>{date.toLocaleDateString()}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <Text style={styles.label}>Kaç Kişi?</Text>
      <TextInput
        style={styles.input}
        placeholder="1"
        keyboardType="number-pad"
        value={passengerCount}
        onChangeText={setPassengerCount}
      />

      <Text style={styles.price}>
        Ödemeniz Gereken Tutar: {calculatedPrice ? `${calculatedPrice} TL` : '---'}
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleSharePost}>
        <Text style={styles.buttonText}>İlanı Paylaş</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, backgroundColor: '#fff' },
  label: { fontSize: 16, fontWeight: 'bold', marginTop: 20 },
  dropdown: {
    marginTop: 8,
    marginBottom: 12,
    borderColor: '#ccc',
    zIndex: 10
  },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 8,
    padding: 12, marginTop: 8
  },
  dateButton: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 8,
    padding: 12, marginTop: 8, alignItems: 'center'
  },
  price: {
    marginTop: 24, fontSize: 18, fontWeight: 'bold',
    color: '#7D5FFF'
  },
  button: {
    backgroundColor: '#7D5FFF', padding: 16, borderRadius: 10,
    alignItems: 'center', marginTop: 24
  },
  buttonText: { color: '#fff', fontSize: 18 }
});
