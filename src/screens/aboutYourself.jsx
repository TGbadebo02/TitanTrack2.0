import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {useContext} from 'react';
import { UserContext } from '../context/UserOnboardingContext';

const GenderScreen = ({ navigation }) => {
    const {userInfo, setUserInfo} = useContext(UserContext);

    const handleGenderSelect = (gender) => {
      setUserInfo((previous) => ({ ...previous, gender }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tell me about yourself!</Text>
      <Text style={styles.subtitle}>
        Your journey is independent! Give us a few details so we can customise exercises and suggestions for you.
      </Text>

      <View style={styles.genderOptions}>
        <TouchableOpacity style={[styles.genderCard, userInfo.gender === 'male' && styles.genderCardSelected, {marginBottom: 0}]}
        onPress={()=> handleGenderSelect('male')}
        >
          <Ionicons name="male" size={50} color="#fff" />
          <Text style={styles.label}>male</Text>
        </TouchableOpacity>

        <TouchableOpacity 
        style={[styles.genderCard, userInfo.gender === 'female' && styles.genderCardSelected]}
        onPress={()=> handleGenderSelect('female')}
        >
          <Ionicons name="female" size={50} color="#fff" />
          <Text style={styles.label}>female</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.circleButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={26} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.circleButton, !userInfo.gender && styles.circleButtonDisabled]}
          onPress={() => navigation.navigate('AgeScreen')} 
          disabled={!userInfo.gender}
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
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 13,
    color: '#ccc',
    textAlign: 'center',
    marginTop: -120,
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
  genderCardSelected: {
    borderColor: '#fff',
    borderWidth: 3,
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
    width: 350,       
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 50,
  
  },
  circleButton: {
    backgroundColor: '#22c55e',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleButtonDisabled: {
    opacity: 0.4,
  },
});
