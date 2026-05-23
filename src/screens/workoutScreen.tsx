import React, { useContext, useMemo, useState } from 'react';
import {
  Alert,
  Image,
  ImageSourcePropType,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import type { NavigationProp, ParamListBase } from '@react-navigation/native';
import { UserContext } from '../context/UserOnboardingContext';

const levels = ['Beginner', 'Intermediate', 'Advanced'] as const;
const progressSteps = [0, 20, 40, 60, 80, 100] as const;

type Level = (typeof levels)[number];
type TabName = 'Home' | 'Profile' | 'Report';
type ProgressStep = (typeof progressSteps)[number];

type Exercise = {
  id: string;
  name: string;
  progress: ProgressStep;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  level: Level;
};

type RawExercise = Omit<Exercise, 'progress'> & {
  progress: number;
};

type WorkoutScreenProps = {
  navigation: NavigationProp<ParamListBase>;
};

const tabIcons: Record<TabName, ImageSourcePropType> = {
  Home: require('../assets/icons/Home.png'),
  Profile: require('../assets/icons/Profile.png'),
  Report: require('../assets/icons/Bar Chart.png'),
};

const workoutTitleByGoal: Record<string, string> = {
  'Build Muscle': 'Strength Builder',
  'Lose Weight': 'Fat Burn Circuit',
  'Improve Endurance': 'Conditioning Focus',
  'Increase Strength': 'Power Session',
  'Boost Flexibility': 'Mobility Flow',
  'Stay Active': 'Full Body Burn',
};

const rawExercises: RawExercise[] = [
  { id: 'march-in-place', name: 'March in Place', progress: 25, icon: 'walk', level: 'Beginner' },
  { id: 'bodyweight-squats', name: 'Bodyweight Squats', progress: 45, icon: 'run-fast', level: 'Beginner' },
  { id: 'wall-push-ups', name: 'Wall Push Ups', progress: 60, icon: 'arm-flex-outline', level: 'Beginner' },
  { id: 'glute-bridges', name: 'Glute Bridges', progress: 35, icon: 'bridge', level: 'Beginner' },
  { id: 'bird-dogs', name: 'Bird Dogs', progress: 15, icon: 'human-handsdown', level: 'Beginner' },
  { id: 'deadlifts', name: 'Deadlifts', progress: 0, icon: 'weight-kilogram', level: 'Beginner' },

  { id: 'bench-press', name: 'Bench Press', progress: 70, icon: 'weight-lifter', level: 'Intermediate' },
  { id: 'push-ups', name: 'Push Ups', progress: 80, icon: 'arm-flex', level: 'Intermediate' },
  { id: 'plank', name: 'Plank', progress: 90, icon: 'yoga', level: 'Intermediate' },
  { id: 'walking-lunges', name: 'Walking Lunges', progress: 55, icon: 'walk', level: 'Intermediate' },
  { id: 'shoulder-press', name: 'Shoulder Press', progress: 40, icon: 'dumbbell', level: 'Intermediate' },
  { id: 'mountain-climbers', name: 'Mountain Climbers', progress: 65, icon: 'run', level: 'Intermediate' },

  { id: 'pull-ups', name: 'Pull Ups', progress: 20, icon: 'dumbbell', level: 'Advanced' },
  { id: 'dumbbell-rows', name: 'Dumbbell Rows', progress: 30, icon: 'weight-pound', level: 'Advanced' },
  { id: 'barbell-thrusters', name: 'Barbell Thrusters', progress: 50, icon: 'weight-lifter', level: 'Advanced' },
  { id: 'burpee-box-jumps', name: 'Burpee Box Jumps', progress: 10, icon: 'jump-rope', level: 'Advanced' },
  { id: 'pistol-squats', name: 'Pistol Squats', progress: 5, icon: 'human-male-board', level: 'Advanced' },
  { id: 'hanging-leg-raises', name: 'Hanging Leg Raises', progress: 18, icon: 'human', level: 'Advanced' },
];

const exercises: Exercise[] = rawExercises.map((exercise) => ({
  ...exercise,
  progress: progressSteps.reduce((closest, step) => {
    return Math.abs(step - exercise.progress) < Math.abs(closest - exercise.progress)
      ? step
      : closest;
  }, 0 as ProgressStep),
}));

const normalizeLevel = (value?: string): Level => {
  if (!value) {
    return 'Beginner';
  }

  const matchingLevel = levels.find(
    (level) => level.toLowerCase() === value.trim().toLowerCase()
  );

  return matchingLevel ?? 'Beginner';
};

const getNextProgress = (progress: ProgressStep): ProgressStep => {
  const currentIndex = progressSteps.indexOf(progress);
  const nextIndex = (currentIndex + 1) % progressSteps.length;

  return progressSteps[nextIndex];
};

const WorkoutScreen = ({ navigation }: WorkoutScreenProps) => {
  const { userInfo } = useContext(UserContext);
  const defaultLevel = normalizeLevel(userInfo.fitnessLevel);
  const workoutTitle =
    workoutTitleByGoal[userInfo.fitnessGoal] ?? workoutTitleByGoal['Stay Active'];

  const [selectedLevel, setSelectedLevel] = useState<Level>(defaultLevel);
  const [searchValue, setSearchValue] = useState('');
  const [sessionPaused, setSessionPaused] = useState(false);
  const [sessionExercises, setSessionExercises] = useState<Exercise[]>(exercises);
  const [lastUpdatedExerciseId, setLastUpdatedExerciseId] = useState<string | null>(null);

  const filteredExercises = useMemo(() => {
    const normalizedSearch = searchValue.trim().toLowerCase();
    return sessionExercises.filter((exercise) => {
      const matchesLevel = exercise.level === selectedLevel;
      const matchesSearch =
        !normalizedSearch ||
        exercise.name.toLowerCase().includes(normalizedSearch);

      return matchesLevel && matchesSearch;
    });
  }, [searchValue, selectedLevel, sessionExercises]);

  const completedCount = filteredExercises.filter(
    (exercise) => exercise.progress === 100
  ).length;
  const totalCount = filteredExercises.length;

  const updateExerciseProgress = (exerciseId: string) => {
    setLastUpdatedExerciseId(exerciseId);
    setSessionExercises((prevExercises) =>
      prevExercises.map((exercise) =>
        exercise.id === exerciseId
          ? { ...exercise, progress: getNextProgress(exercise.progress) }
          : exercise
      )
    );
  };

  const handleAddExercise = () => {
    Alert.alert(
      'Add Exercise',
      'We can wire this button into a custom workout builder next.'
    );
  };

  const handlePauseToggle = () => {
    setSessionPaused((prev) => !prev);
  };

  const handleEndWorkout = () => {
    Alert.alert('Workout Ended', 'Great work. Your session has been wrapped up.', [
      {
        text: 'OK',
        onPress: () => navigation.navigate('Tabs', { screen: 'Home' }),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <StatusBar barStyle="light-content" />

      <View pointerEvents="none" style={styles.backgroundGlowTop} />
      <View pointerEvents="none" style={styles.backgroundGlowBottom} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerRow}>
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={22} color="#F2F2F7" />
          </TouchableOpacity>

          <View style={styles.headerText}>
            <Text style={styles.title}>Workout Session</Text>
            <Text style={styles.subtitle}>{workoutTitle}</Text>
          </View>

          <View style={[styles.statusPill, sessionPaused && styles.statusPillPaused]}>
            <View style={styles.statusDot} />
            <Text style={[styles.statusText, sessionPaused && styles.statusTextPaused]}>
              {sessionPaused ? 'Paused' : 'Active'}
            </Text>
          </View>
        </View>

        <View style={styles.controlsCard}>
          <View style={styles.searchField}>
            <Ionicons name="search" size={18} color="#6B6C77" />
            <TextInput
              value={searchValue}
              onChangeText={setSearchValue}
              placeholder="Search exercise..."
              placeholderTextColor="#6B6C77"
              style={styles.searchInput}
            />
          </View>

          <View style={styles.levelRow}>
            {levels.map((level) => {
              const isSelected = level === selectedLevel;

              return (
                <TouchableOpacity
                  key={level}
                  activeOpacity={0.85}
                  style={[styles.levelChip, isSelected && styles.levelChipSelected]}
                  onPress={() => setSelectedLevel(level)}
                >
                  <Text
                    style={[
                      styles.levelChipText,
                      isSelected && styles.levelChipTextSelected,
                    ]}
                  >
                    {level}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.exerciseHeader}>
          <Text style={styles.exerciseHeading}>Exercises</Text>
          <View style={styles.countPill}>
            <Text style={styles.countText}>
              {completedCount} / {totalCount} completed
            </Text>
          </View>
        </View>

        {filteredExercises.map((exercise) => (
          <Pressable
            key={exercise.id}
            style={({ pressed }) => [
              styles.exerciseCard,
              pressed && styles.exerciseCardPressed,
              lastUpdatedExerciseId === exercise.id && styles.exerciseCardUpdated,
            ]}
            onPress={() => updateExerciseProgress(exercise.id)}
          >
            <View style={styles.iconWrap}>
              <MaterialCommunityIcons
                name={exercise.icon}
                size={28}
                color="#42DD6B"
              />
            </View>

            <View style={styles.exerciseBody}>
              <View style={styles.exerciseTopRow}>
                <Text style={styles.exerciseName}>{exercise.name}</Text>
                <Text style={styles.exercisePercent}>{exercise.progress}%</Text>
              </View>

              <View style={styles.progressTrack}>
                <View
                  style={[
                    styles.progressFill,
                    { width: exercise.progress === 0 ? 0 : `${exercise.progress}%` },
                  ]}
                />
              </View>
            </View>
          </Pressable>
        ))}

        {filteredExercises.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateTitle}>No exercises found</Text>
            <Text style={styles.emptyStateText}>
              Try another level or clear the search to see more workouts.
            </Text>
          </View>
        )}

        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.addButton}
          onPress={handleAddExercise}
        >
          <Ionicons name="add" size={20} color="#42DD6B" />
          <Text style={styles.addButtonText}>Add Exercise</Text>
        </TouchableOpacity>

        <View style={styles.footerRow}>
          <Pressable
            style={({ pressed }) => [
              styles.pauseButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={handlePauseToggle}
          >
            <Ionicons
              name={sessionPaused ? 'play' : 'pause'}
              size={18}
              color="#EDEDF1"
            />
            <Text style={styles.pauseButtonText}>
              {sessionPaused ? 'Resume' : 'Pause'}
            </Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.endButton,
              pressed && styles.endButtonPressed,
            ]}
            onPress={handleEndWorkout}
          >
            <Ionicons name="stop" size={16} color="#08110B" />
            <Text style={styles.endButtonText}>End Workout</Text>
          </Pressable>
        </View>

        <View style={styles.navBar}>
          {Object.keys(tabIcons).map((tabName) => {
            const typedTabName = tabName as TabName;
            const isActive = tabName === 'Home';

            return (
              <TouchableOpacity
                key={tabName}
                activeOpacity={0.85}
                style={styles.navItem}
                onPress={() => navigation.navigate('Tabs', { screen: typedTabName })}
              >
                <Image
                  source={tabIcons[typedTabName]}
                  style={[styles.navIcon, !isActive && styles.navIconInactive]}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WorkoutScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0B0B14',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 20,
  },
  backgroundGlowTop: {
    position: 'absolute',
    top: -100,
    left: -40,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(72, 255, 129, 0.06)',
  },
  backgroundGlowBottom: {
    position: 'absolute',
    bottom: 20,
    right: -50,
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: 'rgba(72, 255, 129, 0.04)',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  headerText: {
    flex: 1,
  },
  title: {
    color: '#F6F6F9',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    color: '#8C8F9D',
    fontSize: 15,
    fontWeight: '500',
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(66, 221, 107, 0.14)',
    borderWidth: 1,
    borderColor: 'rgba(66, 221, 107, 0.18)',
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#42DD6B',
  },
  statusText: {
    color: '#42DD6B',
    fontSize: 14,
    fontWeight: '600',
  },
  statusPillPaused: {
    backgroundColor: 'rgba(255, 187, 66, 0.14)',
    borderColor: 'rgba(255, 187, 66, 0.18)',
  },
  statusTextPaused: {
    color: '#FFBB42',
  },
  controlsCard: {
    backgroundColor: 'rgba(19, 20, 29, 0.96)',
    borderColor: 'rgba(255, 255, 255, 0.06)',
    borderWidth: 1,
    borderRadius: 22,
    padding: 12,
    marginBottom: 18,
  },
  searchField: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: 14,
    height: 44,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    color: '#F6F6F9',
    fontSize: 15,
    marginLeft: 10,
  },
  levelRow: {
    flexDirection: 'row',
    gap: 8,
  },
  levelChip: {
    flex: 1,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelChipSelected: {
    backgroundColor: 'rgba(66, 221, 107, 0.10)',
    borderColor: 'rgba(66, 221, 107, 0.25)',
  },
  levelChipText: {
    color: '#B8BBC7',
    fontSize: 14,
    fontWeight: '500',
  },
  levelChipTextSelected: {
    color: '#EAFBEC',
  },
  exerciseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  exerciseHeading: {
    color: '#F6F6F9',
    fontSize: 28,
    fontWeight: '700',
  },
  countPill: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  countText: {
    color: '#8C8F9D',
    fontSize: 13,
    fontWeight: '500',
  },
  exerciseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(17, 18, 28, 0.95)',
    borderColor: 'rgba(255, 255, 255, 0.06)',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 10,
  },
  exerciseCardPressed: {
    opacity: 0.82,
    transform: [{ scale: 0.985 }],
  },
  exerciseCardUpdated: {
    borderColor: 'rgba(66, 221, 107, 0.5)',
  },
  emptyState: {
    backgroundColor: 'rgba(17, 18, 28, 0.85)',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    paddingHorizontal: 18,
    paddingVertical: 18,
    marginBottom: 14,
  },
  emptyStateTitle: {
    color: '#F6F6F9',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
  },
  emptyStateText: {
    color: '#A5A8B5',
    fontSize: 14,
    lineHeight: 20,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  exerciseBody: {
    flex: 1,
  },
  exerciseTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  exerciseName: {
    color: '#F5F5F8',
    fontSize: 20,
    fontWeight: '600',
    flex: 1,
    marginRight: 12,
  },
  exercisePercent: {
    color: '#42DD6B',
    fontSize: 15,
    fontWeight: '700',
  },
  progressTrack: {
    width: '100%',
    height: 8,
    borderRadius: 999,
    backgroundColor: '#272A36',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: '#42DD6B',
  },
  addButton: {
    height: 54,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(66, 221, 107, 0.55)',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 4,
    marginBottom: 16,
  },
  addButtonText: {
    color: '#42DD6B',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  footerRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 8,
  },
  pauseButton: {
    flex: 1,
    height: 58,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonPressed: {
    opacity: 0.8,
  },
  pauseButtonText: {
    color: '#EDEDF1',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  endButton: {
    flex: 1,
    height: 58,
    borderRadius: 16,
    backgroundColor: '#42DD6B',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  endButtonPressed: {
    opacity: 0.82,
    transform: [{ scale: 0.985 }],
  },
  endButtonText: {
    color: '#08110B',
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 8,
  },
  navBar: {
    marginTop: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#2A2426',
    borderRadius: 24,
    paddingVertical: 14,
    paddingHorizontal: 18,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 54,
  },
  navIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  navIconInactive: {
    opacity: 0.85,
  },
});
