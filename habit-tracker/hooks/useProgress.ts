import { Habit } from "@/types/habit";
import { getTodayKey } from "@/utils/dateHelper";

const getLastDays = (days: number) => {
  const result: string[] = [];
  for (let i = 0; i < days; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    result.push(d.toISOString().split("T")[0]);
  }
  return result;
};

export function useProgress(habits: Habit[]) {
  const today = getTodayKey();

  // ✅ HARI INI (tetap ada)
  const completedToday = habits.filter(h =>
    h.completedDates.includes(today)
  ).length;

  const total = habits.length;
  const todayPercentage = total
    ? Math.round((completedToday / total) * 100)
    : 0;

  // ✅ MINGGUAN
  const weekDays = getLastDays(7);
  let weekDone = 0;

  habits.forEach(habit => {
    weekDays.forEach(d => {
      if (habit.completedDates.includes(d)) {
        weekDone++;
      }
    });
  });

  const weeklyPercentage = total
    ? Math.round((weekDone / (total * 7)) * 100)
    : 0;

  // ✅ BULANAN
  const monthDays = getLastDays(30);
  let monthDone = 0;

  habits.forEach(habit => {
    monthDays.forEach(d => {
      if (habit.completedDates.includes(d)) {
        monthDone++;
      }
    });
  });

  const monthlyPercentage = total
    ? Math.round((monthDone / (total * 30)) * 100)
    : 0;

  return {
    completedToday,
    total,
    todayPercentage,
    weeklyPercentage,
    monthlyPercentage,
  };
}
