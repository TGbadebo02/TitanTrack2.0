import type { Workout } from '../types/workout';

/**
 * This local catalogue lets us build and test the complete workout experience
 * before deciding whether editable workout content should live in Firestore.
 */
export const workouts: Workout[] = [
  {
    id: 'beginner-full-body',
    name: 'Beginner Full Body',
    description:
      'A simple full-body routine that teaches the main movement patterns at a steady pace.',
    level: 'Beginner',
    category: 'Full Body',
    durationMinutes: 25,
    exercises: [
      {
        id: 'bodyweight-squat',
        name: 'Bodyweight Squat',
        sets: 3,
        reps: 10,
        restSeconds: 45,
        formNote: 'Keep your chest lifted and press your knees in the same direction as your toes.',
      },
      {
        id: 'incline-push-up',
        name: 'Incline Push-Up',
        sets: 3,
        reps: 8,
        restSeconds: 45,
        formNote: 'Keep a straight line from your shoulders to your heels throughout each repetition.',
      },
      {
        id: 'glute-bridge',
        name: 'Glute Bridge',
        sets: 3,
        reps: 12,
        restSeconds: 30,
        formNote: 'Pause briefly at the top without arching your lower back.',
      },
      {
        id: 'dead-bug',
        name: 'Dead Bug',
        sets: 3,
        reps: 8,
        restSeconds: 30,
        formNote: 'Move slowly and keep your lower back gently pressed into the floor.',
      },
    ],
  },
  {
    id: 'upper-body-strength',
    name: 'Upper Body Strength',
    description:
      'A balanced pushing and pulling session for building upper-body strength.',
    level: 'Intermediate',
    category: 'Strength',
    durationMinutes: 40,
    exercises: [
      {
        id: 'bench-press',
        name: 'Bench Press',
        sets: 4,
        reps: 8,
        restSeconds: 90,
        formNote: 'Keep your feet planted and lower the weight with control.',
      },
      {
        id: 'one-arm-dumbbell-row',
        name: 'One-Arm Dumbbell Row',
        sets: 3,
        reps: 10,
        restSeconds: 60,
        formNote: 'Keep your hips square and pull your elbow toward your back pocket.',
      },
      {
        id: 'shoulder-press',
        name: 'Shoulder Press',
        sets: 3,
        reps: 10,
        restSeconds: 60,
        formNote: 'Brace your core and avoid leaning backward as you press.',
      },
      {
        id: 'forearm-plank',
        name: 'Forearm Plank',
        sets: 3,
        durationSeconds: 40,
        restSeconds: 45,
        formNote: 'Keep your hips level and breathe steadily for the full interval.',
      },
    ],
  },
  {
    id: 'conditioning-circuit',
    name: 'Conditioning Circuit',
    description:
      'A faster circuit combining lower-body, upper-body, and core movements.',
    level: 'Advanced',
    category: 'Conditioning',
    durationMinutes: 30,
    exercises: [
      {
        id: 'walking-lunge',
        name: 'Walking Lunge',
        sets: 4,
        reps: 12,
        restSeconds: 30,
        formNote: 'Take a stable step and lower your back knee under control.',
      },
      {
        id: 'push-up',
        name: 'Push-Up',
        sets: 4,
        reps: 12,
        restSeconds: 30,
        formNote: 'Brace your core and keep your elbows at a comfortable angle.',
      },
      {
        id: 'mountain-climber',
        name: 'Mountain Climber',
        sets: 4,
        durationSeconds: 30,
        restSeconds: 30,
        formNote: 'Keep your shoulders above your hands while driving each knee forward.',
      },
      {
        id: 'burpee',
        name: 'Burpee',
        sets: 4,
        reps: 8,
        restSeconds: 60,
        formNote: 'Land softly and choose a controlled pace that preserves your form.',
      },
    ],
  },
];

/**
 * Navigation passes only a workout ID. The destination uses this helper to
 * retrieve the full routine and can safely handle an unknown or stale ID.
 */
export const getWorkoutById = (workoutId: string): Workout | undefined =>
  workouts.find((workout) => workout.id === workoutId);
