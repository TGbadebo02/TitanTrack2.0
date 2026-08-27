import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import { Ionicons } from '@expo/vector-icons';
import { UserContext } from '../context/UserOnboardingContext';

const WeightPickerScreen = ({ navigation }) => {
  const {userInfo,setUserInfo} = useContext(UserContext);
  const [weight, setWeight] = useState(Number(userInfo.weight) || 54);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What’s your weight?</Text>
      <Text style={styles.subtitle}>You can always change this later</Text>

      <View style={styles.weightDisplay}>
        <Text style={styles.weightText}>{weight}</Text>
        <Text style={styles.kgText}>kg</Text>
      </View>

      <Slider
        style={styles.slider}
        minimumValue={30}
        maximumValue={150}
        step={1}
        value={weight}
        onValueChange={(value) => setWeight(value)}
        minimumTrackTintColor="#22c55e"
        maximumTrackTintColor="#444"
        thumbTintColor="#22c55e"
      />

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.circleButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={26} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.circleButton}
          onPress={() => {
            setUserInfo((previous) => ({...previous, weight: String(weight)}));
          navigation.navigate('FitnsScreen')
          }}
        >
          <Ionicons name="arrow-forward" size={26} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WeightPickerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    padding: 30,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 32,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 90,
  },
  subtitle: {
    color: '#aaa',
    textAlign: 'center',
    marginTop: -110,
  },
  weightDisplay: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginTop: 80,
  },
  weightText: {
    fontSize: 54,
    color: '#fff',
    fontWeight: 'bold',
  },
  kgText: {
    fontSize: 18,
    color: '#ccc',
    marginLeft: 8,
    marginBottom: 8,
  },
  slider: {
    width: '100%',
    marginTop: 40,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 60,
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
