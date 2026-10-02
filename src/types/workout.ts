/**
 * These values are shared by the catalogue and the screens, so a typo such as
 * "Beginnner" is caught by TypeScript instead of silently breaking a filter.
 */
export type WorkoutLevel = 'Beginner' | 'Intermediate' | 'Advanced';

/**
 * A workout exercise describes what the user must do during one routine.
 * Repetitions are optional because timed movements, such as planks, use
 * durationSeconds instead.
 */
export type WorkoutExercise = {
  id: string;
  name: string;
  sets: number;
  reps?: number;
  durationSeconds?: number;
  restSeconds: number;
  formNote: string;
};

/**
 * A Workout is the compact routine shown in the workout list. Its exercises
 * provide the extra information revealed on the workout-details screen.
 */
export type Workout = {
  id: string;
  name: string;
  description: string;
  level: WorkoutLevel;
  category: string;
  durationMinutes: number;
  exercises: WorkoutExercise[];
};

/**
 * Set counts are stored per exercise so a session can preserve partial work.
 * For example, finishing two of three squat sets remains useful progress even
 * if the user stops before the rest of the workout.
 */
export type CompletedExerciseProgress = {
  exerciseId: string;
  completedSets: number;
  totalSets: number;
};

/**
 * This is the app-owned representation of a saved session. Keeping Firebase
 * types out of this model makes it reusable in screens and storage services.
 */
export type CompletedWorkout = {
  workoutId: string;
  workoutName: string;
  status: 'completed' | 'partial';
  startedAt: Date;
  completedAt: Date;
  durationSeconds: number;
  exerciseProgress: CompletedExerciseProgress[];
  completionPercentage: number;
};
