import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';


const frontButton = ({onPress, style = {} }) =>{
    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>
    );
};

export default frontButton;

const styles = StyleSheet.create({
button: {
    position: 'absolute', // 🛠️ This is the key
    backgroundColor: '#22c55e',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10, // ensu
  },
});