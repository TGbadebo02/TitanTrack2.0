import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

const AdvertisingPage = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('/Users/tgbadebo02/Desktop/TitanTrack2.0/src/assets/images/intense-workout 1.png')}
      style={styles.background}
    >
     <View style={styles.bottomPanel}>
  <View style={styles.panelContent}>
  <Text style={styles.subtitle}>find the workout for you,</Text>

  <View style={styles.inlineRow}>
    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.circleButton}>
      <Ionicons name="arrow-back" size={26} color="#fff" />
    </TouchableOpacity>

    <Text style={styles.boldText}>workout now</Text>

    <TouchableOpacity onPress={() => console.log('Next')} style={styles.circleButton}>
      <Ionicons name="arrow-forward" size={26} color="#fff" />
    </TouchableOpacity>
    </View>
   </View>
  </View>
    </ImageBackground>
  );
};

export default AdvertisingPage;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  bottomPanel: {
    backgroundColor: '#2e2e2e',
    paddingVertical: 50,
    paddingHorizontal: 20,
    transform: [{ skewY: '-4deg' }],
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },

  panelContent: {
    transform: [{ skewY: '4deg' }],
    alignItems: 'center',
  },

  subtitle: {
    color: '#ccc',
    fontSize: 16,
    marginBottom: 12,
    textAlign: 'center',
  },

  inlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20, // optional; or use marginHorizontal below
  },

  boldText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginHorizontal: 15,
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
