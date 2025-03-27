import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

const IntroScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("/Users/tgbadebo02/Desktop/TitanTrack2.0/src/assets/images/Intro-page.png")} 
      style={styles.background}
    >
      <View style={styles.overlay}>
        <View style={styles.logoRow}>
          <Text style={styles.logoText}>TitanTrack</Text>
          <Image
            source={require('/Users/tgbadebo02/Desktop/TitanTrack2.0/src/assets/icons/Logo.png')}
            style={styles.logoImage}
     
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('AdvertisingPage')}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default IntroScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    padding: 20,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
logoRow: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: -20,  // was 20
},


logoText: {
  fontSize: 32,
  color: '#fff',
  fontWeight: 'bold',
  paddingRight: 60,
},

logoImage: {
  right: 100,
  width: 120,
  height: 120,
  resizeMode: 'contain',
  marginLeft: 20,
  marginTop: -25,
},

  button: {
    backgroundColor: '#22c55e',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 18,
  },
});
