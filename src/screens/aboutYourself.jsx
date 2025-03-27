import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const GenderScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tell me about yourself!</Text>
      <Text style={styles.subtitle}>
        Your journey is independent! Give us a few details so we can customise exercises and suggestions for you.
      </Text>

      <View style={styles.genderOptions}>
        <TouchableOpacity style={[styles.genderCard, {marginBottom: 0}]}>
          <Ionicons name="male" size={50} color="#fff" />
          <Text style={styles.label}>male</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.genderCard}>
          <Ionicons name="female" size={50} color="#fff" />
          <Text style={styles.label}>female</Text>
        </TouchableOpacity>
      </View>

      {/* Navigation Arrows */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.circleButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={26} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.circleButton}
          onPress={() => navigation.navigate('')} // Replace with actual next screen
        >
          <Ionicons name="arrow-forward" size={26} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GenderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2e2e2e',
    paddingTop: 100,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 13,
    color: '#ccc',
    textAlign: 'center',
    marginTop: -160,
    paddingHorizontal: 10,
  },
  genderOptions: {
    gap: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -50,
  },
  genderCard: {
    backgroundColor: '#4ade80',
    borderRadius: 25,
    width: 140,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: '#fff',
    fontSize: 14,
    marginTop: 8,
    fontWeight: '600',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 370,       
    alignSelf: 'center',
    marginTop: 10,
  
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
