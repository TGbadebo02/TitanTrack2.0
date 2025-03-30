import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';

const AgePickerScreen = ({ navigation }) => {
  const [selectedAge, setSelectedAge] = useState('25');

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>How old are you?</Text>
        <Text style={styles.subtitle}>
          This helps us create your personalized plan
        </Text>

        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedAge}
            onValueChange={(itemValue) => setSelectedAge(itemValue)}
            itemStyle={styles.pickerItem}
            style={styles.picker}
          >
            {Array.from({ length: 100 }, (_, i) => {
              const age = i + 1;
              return (
                <Picker.Item
                  key={age}
                  label={age.toString()}
                  value={age.toString()} 
                />
              );
            })}
          </Picker>

          <View style={styles.lineTop} />
          <View style={styles.lineBottom} />
        </View>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.circleButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={26} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.circleButton}
          onPress={() => navigation.navigate('WeightScreen')} 
        >
          <Ionicons name="arrow-forward" size={26} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AgePickerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingVertical: 60,
  },
  title: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 10,
  },
  subtitle: {
    color: '#aaa',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 30,
  },
  pickerWrapper: {
    height: 300,
    marginTop: 190,
    justifyContent: 'center',
    position: 'relative',
  },
  picker: {
    height: 300,
  },
  pickerItem: {
    color: '#fff',
    fontSize: 40,
  },
  lineTop: {
    position: 'absolute',
    top: 73,
    left: 80,
    right: 80,
    height: 2,
    backgroundColor: '#22c55e',
  },
  lineBottom: {
    position: 'absolute',
    bottom: 157,
    left: 80,
    right: 80,
    height: 2,
    backgroundColor: '#22c55e',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
    marginBottom: 30,
  },
  circleButton: {
    backgroundColor: '#22c55e',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
