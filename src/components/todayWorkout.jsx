import React from 'react';
import {View, Text, StyleSheet, TouchableOpcity} from 'react-native';

const todayWorkout = () => {

 //mock data  
    const workOut = {
        type: 'Running',
        duration:'30 mins',
        status: 'not started'
    };

 return(
    <View style = {styles.card}>
     <Text style = {styles.title}> Today's workout </Text>
     <View style={styles.details}>
        <View>
        <Text style={styles.label}>{workOut.type}</Text>
        <Text style={styles.subLabel}>Duration:{workOut.duration}</Text>
        </View>
        <Text style={styles.status}>{workOut.status}</Text>
     </View>
    
    <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Start Workout</Text>
      </TouchableOpacity>

    </View>
 );

};

export default todayWorkout;



const styles = StyleSheet.create({
 card: {
    backgroundColor: '#121212',
    borderRadius: 20,
    padding: 20,
    marginVertical: 10,
 },
 title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
 },
 details:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginBottom: 15,   
 },
 label:{
    color:'#fff',
    fontSize:16,
 },
 sublabel:{
    color:'#aaa',
    fontSize: 14,
 },
   status: {
    color: '#ccc',
    fontSize: 14,
    alignSelf: 'right',
  },
  button: {
    backgroundColor: '#4ade80',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

});