export const getExerciseProgress = (
  completedSets: number,
  totalSets: number
): number => {
  // Avoid dividing by zero or returning progress for an invalid set count.
  if (totalSets <= 0) {
    return 0;
  }

  // Keep progress within 0–100%, even if the caller sends an unexpected count.
  const safeCompletedSets = Math.min(
    Math.max(0, completedSets),
    totalSets
  );

  const progress = (safeCompletedSets / totalSets) * 100;

  return Math.round(progress);
};
