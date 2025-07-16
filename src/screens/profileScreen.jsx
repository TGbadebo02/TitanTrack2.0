import React, {useContext} from "react";
import {View, Text, StyleSheet, ScrollView, TextInput} from 'react-native';
import { UserContext } from "../context/UserOnboardingContext";

const profileScreen = ({}) =>{
   const {userInfo, setUserInfo} = useContext(UserContext);
   
   return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>How old are you?</Text>

      <View style={styles.card}>
        <TextInput
          placeholder="Firstname"
          value={userInfo.firstname}
          onChangeText={(text) => setUserInfo({ ...userInfo, firstname: text })}
        />


        <Text style={styles.label}>Surname:</Text>
        <Text style={styles.value}>{userInfo.surname || '-'}</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{userInfo.email || '-'}</Text>

        <Text style={styles.label}>Mobile:</Text>
        <Text style={styles.value}>{userInfo.mobile || '-'}</Text>

        <Text style={styles.label}>Age:</Text>
        <Text style={styles.value}>{userInfo.age || '-'}</Text>

        <Text style={styles.label}>Weight:</Text>
        <Text style={styles.value}>{userInfo.weight || '-'}</Text>

        <Text style={styles.label}>Fitness Level:</Text>
        <Text style={styles.value}>{userInfo.fitnessLevel || '-'}</Text>

        <Text style={styles.label}>Fitness Goal:</Text>
        <Text style={styles.value}>{userInfo.fitnessGoal || '-'}</Text>
      </View>
    </ScrollView>
  );
};

export default profileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    padding: 24,
  },
  header: {
    fontSize: 28,
    color: '#4ade80',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#2e2e2e',
    borderRadius: 16,
    padding: 20,
  },
  label: {
    color: '#aaa',
    fontSize: 14,
    marginTop: 14,
  },
  value: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
