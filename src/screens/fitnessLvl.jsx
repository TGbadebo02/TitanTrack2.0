import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const FitnessLevelScreen = ({ navigation }) => {
  const handleSelection = (level) => {
    console.log("Selected Level:", level);
    navigation.navigate('NextScreen'); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your fitness level.</Text>

      <Text style={styles.subtitle}>
        We are able to customise your exercises and recommendations based on your level of fitness. Choose the one that most closely matches your daily schedule, and we'll customise the plan to help you reach your goals!
      </Text>

      <TouchableOpacity style={styles.levelButton} onPress={() => handleSelection('Beginner')}>
        <Text style={styles.levelText}>Beginner</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.levelButton} onPress={() => handleSelection('Intermediate')}>
        <Text style={styles.levelText}>Intermediate</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.levelButton} onPress={() => handleSelection('Advanced')}>
        <Text style={styles.levelText}>Advanced</Text>
      </TouchableOpacity>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.circleButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={26} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.circleButton}
          onPress={() => navigation.navigate('')} 
        >
          <Ionicons name="arrow-forward" size={26} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FitnessLevelScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2e2e2e',
    paddingHorizontal: 30,
    paddingVertical: 80,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 60,
  },
  subtitle: {
    color: '#ccc',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 90,
    lineHeight: 18,
  },
  levelButton: {
    backgroundColor: '#4ade80',
    paddingVertical: 18,
    paddingHorizontal: 50,
    borderRadius: 50,
    marginBottom: 90,
    marginTop: -5,
    width: '100%',
    alignItems: 'center',
  },
  levelText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textTransform: 'capitalize',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 370,
    marginTop: 40,
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
