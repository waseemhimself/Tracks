function getToday() {
  return new Date().toISOString().split("T")[0]; // YYYY-MM-DD
}

export function updateStreak(streak) {
  const today = getToday();

  if (!streak.LastLoggedDate) {
    return {
      Current: 1,
      Longest: 1,
      LastLoggedDate: today,
    };
  }

  if (streak.LastLoggedDate === today) {
    return streak; // same day, no change
  }

  const last = new Date(streak.LastLoggedDate);
  const now = new Date(today);

  const diffDays = Math.floor(
    (now - last) / (1000 * 60 * 60 * 24)
  );

  if (diffDays === 1) {
    const current = streak.Current + 1;
    return {
      Current: current,
      Longest: Math.max(streak.Longest, current),
      LastLoggedDate: today,
    };
  }

  // missed a day
  return {
    Current: 1,
    Longest: streak.Longest,
    LastLoggedDate: today,
  };
}
