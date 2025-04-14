import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList,ImageBackground } from 'react-native';

const goals = [
  { title: 'Build Muscle', image: require('/Users/tgbadebo02/Desktop/TitanTrack2.0/src/assets/icons/Muscle.png') },
  { title: 'Lose Weight', image: require('/Users/tgbadebo02/Desktop/TitanTrack2.0/src/assets/icons/Lose Weight.png') },
  { title: 'Improve Endurance', image: require('/Users/tgbadebo02/Desktop/TitanTrack2.0/src/assets/icons/Heart with Pulse.png') },
  { title: 'Increase Strength', image: require('/Users/tgbadebo02/Desktop/TitanTrack2.0/src/assets/icons/Muscle.png') },
  { title: 'Boost Flexibility', image: require('/Users/tgbadebo02/Desktop/TitanTrack2.0/src/assets/icons/Walking.png') },
];


const FitnessGoalScreen = ({ navigation }) => {
  const [selectedGoal, setSelectedGoal] = useState(null);

  const handleContinue = () => {
    if (selectedGoal) {
      // Handle next screen navigation or save to context
      navigation.navigate('NextScreen'); // replace with your actual next screen
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.goalCard}
      onPress={() => setSelectedGoal(item.title)}
    >
      <ImageBackground
        source={item.image}
        style={styles.imageBackground}
        imageStyle={{ borderRadius: 14 }}
      >
        <View style={[styles.overlay, selectedGoal === item.title && styles.activeOverlay]}>
          <Text style={styles.goalText}>{item.title}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What is your fitness goal?</Text>

      <FlatList
        data={goals}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        contentContainerStyle={styles.goalList}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity
        style={[
          styles.continueButton,
          !selectedGoal && styles.disabledButton,
        ]}
        onPress={handleContinue}
        disabled={!selectedGoal}
      >
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FitnessGoalScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    paddingHorizontal: 20,
    paddingTop: 80,
    paddingBottom: 30,
  },
  title: {
    color: '#4ade80',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  goalList: {
    gap: 18,
  },
  goalCard: {
  height: 120,
  borderRadius: 14,
  overflow: 'hidden',
},

imageBackground: {
  flex: 1,
  justifyContent: 'center',
},

overlay: {
  backgroundColor: 'rgba(0,0,0,0.4)',
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},

activeOverlay: {
  backgroundColor: 'rgba(74, 222, 128, 0.45)', // subtle green overlay when selected
},

goalText: {
  color: '#fff',
  fontSize: 18,
  fontWeight: 'bold',
},

  continueButton: {
    backgroundColor: '#4ade80',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 30,
  },
  disabledButton: {
    backgroundColor: '#3c3c3c',
    opacity: 0.6,
  },
  continueText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
