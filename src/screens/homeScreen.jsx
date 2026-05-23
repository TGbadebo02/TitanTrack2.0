import React, { useContext, useEffect, useRef } from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { UserContext } from '../context/UserOnboardingContext';

const challengeByLevel = {
  beginner: '25 push ups for 1 set.',
  intermediate: '40 squats and 20 push ups.',
  advanced: '5 rounds of bodyweight HIIT.',
};

const quoteByGoal = {
  'Build Muscle': 'The only bad workout is the one that did not happen.',
  'Lose Weight': 'Consistency beats intensity when intensity is rare.',
  'Improve Endurance': 'Every step you take builds the next one.',
  'Increase Strength': 'Strong days are built one rep at a time.',
  'Boost Flexibility': 'Progress feels better when you stay patient.',
  'Stay Active': 'Keep moving. Small effort still counts.',
};

const workoutTypeByGoal = {
  'Build Muscle': 'Upper body strength',
  'Lose Weight': 'Fat burn circuit',
  'Improve Endurance': 'Conditioning run',
  'Increase Strength': 'Strength block',
  'Boost Flexibility': 'Mobility flow',
  'Stay Active': 'Full body workout',
};

const visibleTabBarStyle = {
  backgroundColor: '#2a2426',
  borderTopWidth: 0,
  height: 78,
  paddingTop: 12,
  paddingBottom: 12,
};

const hiddenTabBarStyle = {
  display: 'none',
};

const HomeScreen = ({ navigation }) => {
  const { userInfo } = useContext(UserContext);
  const hideTimerRef = useRef(null);

  const firstName = userInfo.firstname?.trim();
  const surname = userInfo.surname?.trim();
  const emailUsername = userInfo.email?.split('@')[0]?.trim();
  const profileName =
    [firstName, surname].filter(Boolean).join(' ') ||
    firstName ||
    emailUsername ||
    'Athlete';
  const fitnessGoal = userInfo.fitnessGoal || 'Stay Active';
  const fitnessLevel = userInfo.fitnessLevel || 'Beginner';
  const workoutType = workoutTypeByGoal[fitnessGoal] || 'Full body workout';
  const dailyChallenge =
    challengeByLevel[fitnessLevel.toLowerCase()] || challengeByLevel.beginner;
  const motivationQuote =
    quoteByGoal[fitnessGoal] || quoteByGoal['Stay Active'];

  const showTabBar = () => {
    navigation.setOptions({
      tabBarStyle: visibleTabBarStyle,
    });
  };

  const hideTabBar = () => {
    navigation.setOptions({
      tabBarStyle: hiddenTabBarStyle,
    });
  };

  const resetHideTimer = () => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
    }

    hideTimerRef.current = setTimeout(() => {
      hideTabBar();
    }, 900);
  };

  useEffect(() => {
    showTabBar();
    resetHideTimer();

    return () => {
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }

      showTabBar();
    };
  }, []);

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" />

      <ScrollView
        onScrollBeginDrag={() => {
          showTabBar();
        }}
        onScroll={() => {
          showTabBar();
          resetHideTimer();
        }}
        onScrollEndDrag={() => {
          resetHideTimer();
        }}
        onMomentumScrollEnd={() => {
          resetHideTimer();
        }}
        scrollEventThrottle={16}
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerRow}>
          <Image
            source={require('../assets/icons/Profile.png')}
            style={styles.profileIcon}
          />

          <View style={styles.headerTextBlock}>
            <Text style={styles.welcomeText}>welcome back!</Text>
            <Text style={styles.nameText}>{profileName}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardTitleRow}>
            <Ionicons name="flame" size={28} color="#ff7b39" />
            <Text style={styles.cardTitle}>Today&apos;s workout</Text>
          </View>

          <View style={styles.workoutDetailsRow}>
            <View>
              <Text style={styles.primaryInfo}>{workoutType}</Text>
              <Text style={styles.secondaryInfo}>Duration</Text>
            </View>

            <Text style={styles.statusText}>not started</Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.getStartedButton}
            onPress={() => navigation.navigate('WorkoutScreen')}
          >
            <Text style={styles.getStartedButtonText}>Get Started</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionHeading}>Your Progress</Text>

          <View style={styles.progressRow}>
            <Text style={styles.progressValue}>2/5 days</Text>
            <Text style={styles.progressValue}>2000 Kcal</Text>
          </View>
        </View>

        <View style={styles.actionRow}>
          <View style={styles.challengeCard}>
            <Text style={styles.challengeTitle}>Daily challenge</Text>
            <Text style={styles.challengeSubtitle}>workouts</Text>
            <Text style={styles.challengeText}>{dailyChallenge}</Text>

            <TouchableOpacity activeOpacity={0.85} style={styles.challengeButton}>
              <Text style={styles.challengeButtonText}>Accept challenge</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.shortcutGrid}>
            <View style={styles.shortcutRow}>
              <TouchableOpacity
                activeOpacity={0.85}
                style={styles.shortcutCard}
                onPress={() => navigation.navigate('WorkoutScreen')}
              >
                <Text style={styles.shortcutText}>Browse workouts</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.85}
                style={styles.shortcutCard}
                onPress={() => navigation.navigate('Report')}
              >
                <Ionicons name="person-circle-outline" size={34} color="#fff" />
                <Text style={styles.shortcutText}>My Progress</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.shortcutRow}>
              <TouchableOpacity
                activeOpacity={0.85}
                style={styles.shortcutCard}
              >
                <Text style={styles.shortcutText}>Meal Plans</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.85}
                style={styles.shortcutCard}
                onPress={() => navigation.navigate('Profile')}
              >
                <Ionicons name="person" size={32} color="#fff" />
                <Text style={styles.shortcutText}>Profile</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.motivationTitle}>Motivation of the day</Text>
          <Text style={styles.motivationQuote}>"{motivationQuote}"</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#3a3638',
  },
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 26,
    paddingTop: 64,
    paddingBottom: 32,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
  },
  profileIcon: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
    marginRight: 18,
  },
  headerTextBlock: {
    flex: 1,
  },
  welcomeText: {
    color: '#f4f4f4',
    fontSize: 18,
    marginBottom: 6,
  },
  nameText: {
    color: '#ffffff',
    fontSize: 23,
    fontWeight: '800',
  },
  card: {
    backgroundColor: '#1f1f1f',
    borderRadius: 28,
    paddingHorizontal: 26,
    paddingVertical: 24,
    marginBottom: 26,
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  cardTitle: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '500',
    marginLeft: 10,
  },
  workoutDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  primaryInfo: {
    color: '#ffffff',
    fontSize: 18,
    marginBottom: 2,
  },
  secondaryInfo: {
    color: '#f0f0f0',
    fontSize: 17,
  },
  statusText: {
    color: '#d8d8d8',
    fontSize: 16,
  },
  getStartedButton: {
    backgroundColor: '#4ade80',
    borderRadius: 10,
    width: '100%',
    paddingVertical: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  getStartedButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  sectionHeading: {
    color: '#ffffff',
    fontSize: 26,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 26,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  progressValue: {
    color: '#ffffff',
    fontSize: 21,
    fontWeight: '500',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 26,
  },
  challengeCard: {
    width: '47%',
    backgroundColor: '#1f1f1f',
    borderRadius: 28,
    paddingHorizontal: 18,
    paddingVertical: 18,
    justifyContent: 'space-between',
    minHeight: 172,
  },
  challengeTitle: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
  },
  challengeSubtitle: {
    color: '#ffffff',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 8,
  },
  challengeText: {
    color: '#d8d8d8',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 10,
    textAlign: 'center',
  },
  challengeButton: {
    backgroundColor: '#4ade80',
    borderRadius: 8,
    paddingVertical: 10,
    marginTop: 14,
  },
  challengeButtonText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
  },
  shortcutGrid: {
    width: '47%',
    justifyContent: 'space-between',
  },
  shortcutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  shortcutCard: {
    width: '47%',
    minHeight: 82,
    backgroundColor: '#1f1f1f',
    borderRadius: 22,
    paddingHorizontal: 10,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shortcutText: {
    color: '#ffffff',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 6,
  },
  motivationTitle: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 16,
  },
  motivationQuote: {
    color: '#d1d1d1',
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },
});
