// GoalSelectionScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const fitnessGoals = [
  { id: '1', title: 'Build Muscle' },
  { id: '2', title: 'Lose Weight' },
  { id: '3', title: 'Improve Endurance' },
  { id: '4', title: 'Increase Strength' },
  { id: '5', title: 'Boost Flexibility' },
];

const GoalSelectionScreen = ({ navigation }) => {
  const [selectedGoal, setSelectedGoal] = useState(null);

  const handleSelect = (goal) => {
    setSelectedGoal(goal);
    // You can save to context or navigate here
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>What is your fitness goal?</Text>
      <FlatList
        data={fitnessGoals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, selectedGoal === item.title && styles.cardSelected]}
            onPress={() => handleSelect(item.title)}
          >
            <Text style={styles.cardText}>{item.title}</Text>
            {selectedGoal === item.title && <Ionicons name="checkmark" size={24} color="white" />}
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 30 }}
      />

      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => navigation.navigate('NextScreen')}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default GoalSelectionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4ade80',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#333',
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardSelected: {
    backgroundColor: '#4ade80',
  },
  cardText: {
    fontSize: 18,
    color: '#fff',
  },
  continueButton: {
    backgroundColor: '#4ade80',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
