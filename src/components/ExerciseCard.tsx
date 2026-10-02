import React, { useEffect, useState } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ImageSourcePropType,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { WorkoutExercise } from '../types/workout';
import { getExerciseProgress } from '../utils/workoutProgress';

/**
 * The parent screen owns session state and passes this card the exercise,
 * completed set indexes, expansion state, and actions to call when tapped.
 */
type ExerciseCardProps = {
  exercise: WorkoutExercise;
  completedSetIndexes: number[];
  expanded: boolean;
  iconName: keyof typeof MaterialCommunityIcons.glyphMap;
  demoImage?: ImageSourcePropType;
  onToggleExpanded: () => void;
  onToggleSet: (setIndex: number) => void;
};

/**
 * Shows one exercise's progress and its in-place session details. Set completion
 * stays in the parent so the workout screen can save the user's session.
 */
export default function ExerciseCard({
  exercise,
  completedSetIndexes,
  expanded,
  iconName,
  demoImage,
  onToggleExpanded,
  onToggleSet,
}: ExerciseCardProps) {
  const [secondsRemaining, setSecondsRemaining] = useState(
    exercise.durationSeconds ?? 0
  );
  const [timerRunning, setTimerRunning] = useState(false);
  const setIndexes = Array.from({ length: exercise.sets }, (_, index) => index);

  // Derive the count from completed set indexes so row checks and progress agree.
  const validCompletedSetIndexes = completedSetIndexes.filter(
    (setIndex, index) =>
      setIndex >= 0 &&
      setIndex < exercise.sets &&
      completedSetIndexes.indexOf(setIndex) === index
  );
  const progress = getExerciseProgress(
    validCompletedSetIndexes.length,
    exercise.sets
  );
  const nextSetIndex = setIndexes.find(
    (setIndex) => !validCompletedSetIndexes.includes(setIndex)
  );
  const isTimedExercise = exercise.durationSeconds !== undefined;
  const timerLabel = `${Math.floor(secondsRemaining / 60)}:${String(
    secondsRemaining % 60
  ).padStart(2, '0')}`;

  // Reset the countdown when moving to a different exercise or timed set.
  useEffect(() => {
    setTimerRunning(false);
    setSecondsRemaining(exercise.durationSeconds ?? 0);
  }, [exercise.id, exercise.durationSeconds, nextSetIndex]);

  // Pause a hidden exercise's timer so it does not run while another card is open.
  useEffect(() => {
    if (!expanded) {
      setTimerRunning(false);
    }
  }, [expanded]);

  // A one-second timeout keeps the displayed countdown in sync with React state.
  useEffect(() => {
    if (!timerRunning) {
      return;
    }

    if (secondsRemaining <= 0) {
      setTimerRunning(false);
      return;
    }

    const timeoutId = setTimeout(() => {
      setSecondsRemaining((remaining) => remaining - 1);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [secondsRemaining, timerRunning]);

  // Starting after the countdown reaches zero begins the planned time again.
  const handleTimerStart = () => {
    if (secondsRemaining <= 0) {
      setSecondsRemaining(exercise.durationSeconds ?? 0);
    }
    setTimerRunning(true);
  };

  const handleTimerReset = () => {
    setTimerRunning(false);
    setSecondsRemaining(exercise.durationSeconds ?? 0);
  };

  return (
    <View style={styles.exerciseCard}>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ expanded }}
        onPress={onToggleExpanded}
        style={({ pressed }) => [
          styles.exerciseHeader,
          pressed && styles.exerciseCardPressed,
        ]}
      >
        <View style={styles.iconWrap}>
          <MaterialCommunityIcons
            name={iconName}
            size={28}
            color="#42DD6B"
          />
        </View>

        <View style={styles.exerciseBody}>
          <View style={styles.exerciseTopRow}>
            <Text style={styles.exerciseName}>{exercise.name}</Text>
            <Text style={styles.exercisePercent}>{progress}%</Text>
          </View>

          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                { width: `${progress}%` },
              ]}
            />
          </View>
        </View>

        <MaterialCommunityIcons
          name={expanded ? 'chevron-up' : 'chevron-down'}
          size={22}
          color="#8C8F9D"
        />
      </Pressable>

      {expanded && (
        <View style={styles.expandedContent}>
          {demoImage ? (
            <Image source={demoImage} style={styles.demoImage} />
          ) : (
            <View style={styles.demoImagePlaceholder}>
              <MaterialCommunityIcons
                name={iconName}
                size={36}
                color="#42DD6B"
              />
              <Text style={styles.placeholderText}>Exercise demo</Text>
            </View>
          )}

          <Text style={styles.formNote}>{exercise.formNote}</Text>
          <Text style={styles.sectionLabel}>
            Sets · {validCompletedSetIndexes.length}/{exercise.sets} complete
          </Text>

          {setIndexes.map((setIndex) => {
            const isSetComplete = validCompletedSetIndexes.includes(setIndex);
            const target = isTimedExercise
              ? `Hold for ${exercise.durationSeconds} seconds`
              : exercise.reps !== undefined
                ? `${exercise.reps} reps`
                : 'Target not set';

            return (
              <Pressable
                key={setIndex}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: isSetComplete }}
                onPress={() => onToggleSet(setIndex)}
                style={({ pressed }) => [
                  styles.setRow,
                  pressed && styles.setRowPressed,
                ]}
              >
                <View style={styles.setCopy}>
                  <Text style={styles.setName}>Set {setIndex + 1}</Text>
                  <Text style={styles.setTarget}>{target}</Text>
                </View>
                <MaterialCommunityIcons
                  name={isSetComplete ? 'check-circle' : 'checkbox-blank-circle-outline'}
                  size={26}
                  color={isSetComplete ? '#42DD6B' : '#8C8F9D'}
                />
              </Pressable>
            );
          })}

          <Text style={styles.restText}>
            Rest between sets: {exercise.restSeconds} seconds
          </Text>

          {isTimedExercise && nextSetIndex !== undefined && (
            <View style={styles.timerPanel}>
              <Text style={styles.sectionLabel}>
                Timer · Set {nextSetIndex + 1}
              </Text>
              <Text accessibilityLiveRegion="polite" style={styles.timerValue}>
                {timerLabel}
              </Text>
              <View style={styles.timerButtons}>
                <Pressable
                  accessibilityRole="button"
                  onPress={timerRunning ? () => setTimerRunning(false) : handleTimerStart}
                  style={styles.timerButton}
                >
                  <Text style={styles.timerButtonText}>
                    {timerRunning ? 'Pause' : 'Start'}
                  </Text>
                </Pressable>
                <Pressable
                  accessibilityRole="button"
                  onPress={handleTimerReset}
                  style={[styles.timerButton, styles.resetButton]}
                >
                  <Text style={styles.timerButtonText}>Reset</Text>
                </Pressable>
              </View>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  exerciseCard: {
    backgroundColor: 'rgba(17, 18, 28, 0.95)',
    borderColor: 'rgba(255, 255, 255, 0.06)',
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 10,
    overflow: 'hidden',
  },
  exerciseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  exerciseCardPressed: {
    opacity: 0.82,
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
    marginRight: 10,
  },
  exerciseTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  exerciseName: {
    color: '#F5F5F8',
    fontSize: 18,
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
  expandedContent: {
    paddingHorizontal: 14,
    paddingBottom: 14,
  },
  demoImage: {
    width: '100%',
    height: 150,
    borderRadius: 14,
    marginBottom: 12,
  },
  demoImagePlaceholder: {
    height: 150,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  placeholderText: {
    color: '#8C8F9D',
    fontSize: 13,
    marginTop: 6,
  },
  formNote: {
    color: '#B8BBC7',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 14,
  },
  sectionLabel: {
    color: '#F5F5F8',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 8,
  },
  setRow: {
    minHeight: 54,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 8,
  },
  setRowPressed: {
    opacity: 0.78,
  },
  setCopy: {
    flex: 1,
  },
  setName: {
    color: '#F5F5F8',
    fontSize: 14,
    fontWeight: '600',
  },
  setTarget: {
    color: '#8C8F9D',
    fontSize: 13,
    marginTop: 3,
  },
  timerPanel: {
    alignItems: 'center',
    backgroundColor: 'rgba(66, 221, 107, 0.06)',
    borderRadius: 14,
    padding: 12,
    marginTop: 8,
  },
  timerValue: {
    color: '#42DD6B',
    fontSize: 34,
    fontWeight: '700',
    fontVariant: ['tabular-nums'],
    marginBottom: 10,
  },
  timerButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  timerButton: {
    minWidth: 104,
    alignItems: 'center',
    backgroundColor: '#42DD6B',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  resetButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.10)',
  },
  timerButtonText: {
    color: '#0B0B14',
    fontSize: 14,
    fontWeight: '700',
  },
  restText: {
    color: '#8C8F9D',
    fontSize: 12,
    marginTop: 10,
  },
});
