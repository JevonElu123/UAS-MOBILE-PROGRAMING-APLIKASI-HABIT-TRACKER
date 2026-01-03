export const getTodayKey = () => {
  const today = new Date();
  return today.toISOString().split("T")[0]; // YYYY-MM-DD
};

export const getLastDays = (days: number) => {
  const result: string[] = [];
  for (let i = 0; i < days; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    result.push(d.toISOString().split('T')[0]);
  }
  return result;
};

export const calculateProgressPercent = (
  habits: any[],
  days: number
) => {
  if (!habits.length) return 0;

  const dates = getLastDays(days);
  let done = 0;
  const total = habits.length * days;

  habits.forEach(habit => {
    dates.forEach(date => {
      if (habit.completedDates?.[date]) {
        done++;
      }
    });
  });

  return Math.round((done / total) * 100);
};
