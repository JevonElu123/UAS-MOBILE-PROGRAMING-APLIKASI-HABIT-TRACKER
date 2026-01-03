import React, { createContext, useContext, useEffect, useState } from 'react';
import { Habit } from '@/types/habit';
import { saveHabits, loadHabits } from '@/services/storage';
import { getTodayKey } from '@/utils/dateHelper';

interface HabitContextType {
  habits: Habit[];
  addHabit(title: string): void;
  deleteHabit(id: string): void;
  toggleHabit(id: string): void;
  editHabit(id: string, title: string): void;
}

const HabitContext = createContext<HabitContextType | null>(null);

export function HabitProvider({ children }: { children: React.ReactNode }) {
  const [habits, setHabits] = useState<Habit[]>([]);

  useEffect(() => {
    loadHabits().then(setHabits);
  }, []);

  useEffect(() => {
    saveHabits(habits);
  }, [habits]);

  const addHabit = (title: string) => {
    setHabits(prev => [
    ...prev,
    { id: Date.now().toString(), title, createdAt: Date.now(), completedDates: [] },
    ]);
  };

  const deleteHabit = (id: string) => {
    setHabits(prev => prev.filter(h => h.id !== id));
  };

  const toggleHabit = (id: string) => {
    const today = getTodayKey();
    setHabits(prev => prev.map(h => {
      if (h.id !== id) return h;
      const done = h.completedDates.includes(today);
      return {
        ...h,
        completedDates: done
        ? h.completedDates.filter(d => d !== today)
        : [...h.completedDates, today],
      };
    }));
  };

  const editHabit = (id: string, title: string) => {
    setHabits(prev =>
      prev.map(h =>
        h.id === id ? { ...h, title } : h
      )
    );
  };

  return (
    <HabitContext.Provider value={{ habits, addHabit, deleteHabit, toggleHabit, editHabit }}>
    {children}
    </HabitContext.Provider>
  );
}

export const useHabit = () => useContext(HabitContext)!;