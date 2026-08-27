import React, { useContext, useEffect, useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { type NavigationProp, type ParamListBase, useNavigation } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import { UserContext } from '../context/UserOnboardingContext';
import { auth } from '../firebase/config';
import { getUserProfile, saveUserProfile } from '../firebase/userService';
import { initialUserInfo } from '../context/UserOnboardingContext';

const ProfileScreen = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const savedProfile = await getUserProfile();

        if (savedProfile) {
          setUserInfo((prev) => ({
            ...prev,
            ...savedProfile,
            email: savedProfile.email ?? prev.email,
          }));
          return;
        }

        if (auth.currentUser?.email) {
          setUserInfo((prev) => ({
            ...prev,
            email: auth.currentUser?.email ?? prev.email,
          }));
        }
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'Unable to load profile.';

        console.error('Profile Load Error:', message);
      }
    };

    loadUserProfile();
  }, [setUserInfo]);

  const handleSave = async () => {
    try {
      await saveUserProfile(userInfo);
      setIsEditing(false);
      Alert.alert('Saved', 'Your profile has been updated.');
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Unable to save profile.';

      console.error('Profile Save Error:', message);
      Alert.alert('Error', message);
    }
  };

  const handleLogout = async () => {
    try {//
      await signOut(auth);
      setUserInfo(initialUserInfo);
      navigation.navigate('LoginScreen');
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Unable to log out.';

      console.error('Logout Error:', message);
      Alert.alert('Error', message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Your profile</Text>
      <Text style={styles.subText}>
        The more we know about you, the better we can tailor your fitness plan.
      </Text>

      <View style={styles.profilePhotoContainer}>
        <Image
          source={require('../assets/icons/Profile.png')}
          style={styles.profilePhoto}
        />
        <Text style={styles.changePhotoText}>change your profile photo</Text>
      </View>

      <TextInput
        placeholder="Firstname"
        placeholderTextColor="#ccc"
        style={styles.input}
        value={userInfo.firstname}
        editable={isEditing}
        onChangeText={(text) => setUserInfo({ ...userInfo, firstname: text })}
      />
      <TextInput
        placeholder="Surname"
        placeholderTextColor="#ccc"
        style={styles.input}
        value={userInfo.surname}
        editable={isEditing}
        onChangeText={(text) => setUserInfo({ ...userInfo, surname: text })}
      />
      <TextInput
        placeholder="Email"
        placeholderTextColor="#ccc"
        style={styles.input}
        value={userInfo.email}
        editable={isEditing}
        onChangeText={(text) => setUserInfo({ ...userInfo, email: text })}
      />
      <TextInput
        placeholder="Mobile"
        placeholderTextColor="#ccc"
        style={styles.input}
        value={userInfo.mobile}
        editable={isEditing}
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

      <TouchableOpacity
        style={styles.editButton}
        onPress={isEditing ? handleSave : () => setIsEditing(true)}
      >
        <Text style={styles.editButtonText}>{isEditing ? 'Save' : 'Edit'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Log out</Text>
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
    width: 150,
    height: 150,
  },
  changePhotoText: {
    marginBottom: -10,
    marginTop: 5,
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
  logoutButton: {
    backgroundColor: '#2b2b2b',
    padding: 16,
    borderRadius: 30,
    marginTop: 14,
    marginBottom: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#575757',
  },
  logoutButtonText: {
    color: '#f4f4f4',
    fontSize: 16,
    fontWeight: '600',
  },
});
