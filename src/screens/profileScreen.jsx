import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import { UserContext } from '../context/UserOnboardingContext';

const ProfileScreen = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>How old are you?</Text>
      <Text style={styles.subText}>The more we know about you, the better we can tailor your fitness plan.</Text>

      <View style={styles.profilePhotoContainer}>
        <Image source={require('/Users/tgbadebo02/Desktop/TitanTrack2.0/src/assets/icons/Profile.png')} style={styles.profilePhoto}/>
        <Text style={styles.changePhotoText}>change your profile photo</Text>
      </View>

      <TextInput
        placeholder="Firstname"
        placeholderTextColor="#ccc"
        style={styles.input}
        value={userInfo.firstname}
        onChangeText={(text) => setUserInfo({ ...userInfo, firstname: text })}
      />
      <TextInput
        placeholder="Surname"
        placeholderTextColor="#ccc"
        style={styles.input}
        value={userInfo.surname}
        onChangeText={(text) => setUserInfo({ ...userInfo, surname: text })}
      />
      <TextInput
        placeholder="Email"
        placeholderTextColor="#ccc"
        style={styles.input}
        value={userInfo.email}
        onChangeText={(text) => setUserInfo({ ...userInfo, email: text })}
      />
      <TextInput
        placeholder="Mobile"
        placeholderTextColor="#ccc"
        style={styles.input}
        value={userInfo.mobile}
        onChangeText={(text) => setUserInfo({ ...userInfo, mobile: text })}
      />

      <View style={styles.row}>
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Fitness Level</Text>
          <Text style={styles.cardValue}>{userInfo.fitnessLevel || '-'}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Fitness Goal</Text>
          <Text style={styles.cardValue}>{userInfo.fitnessGoal || '-'}</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Weight</Text>
          <Text style={styles.cardValue}>{userInfo.weight || '-'}kg</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Age</Text>
          <Text style={styles.cardValue}>{userInfo.age || '-'}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editButtonText}>edit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProfileScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    padding: 24,
  },
  header: {
    fontSize: 28,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 35,
  },
  subText: {
    color: '#bbb',
    textAlign: 'center',
    marginVertical: 10,
  },
  profilePhotoContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profilePhoto: {
    width: 200,
    height: 200,
  },
  changePhotoText: {
    marginTop: 10,
    color: '#bbb',
  },
  input: {
    borderColor: '#888',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    color: '#fff',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#2e2e2e',
    borderRadius: 12,
    padding: 16,
    width: '48%',
  },
  cardLabel: {
    color: '#ccc',
    marginBottom: 4,
    fontSize: 13,
  },
  cardValue: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  editButton: {
    backgroundColor: '#4ade80',
    padding: 16,
    borderRadius: 30,
    marginTop: 30,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
