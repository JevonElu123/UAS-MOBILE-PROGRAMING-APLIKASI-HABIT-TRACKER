import React from "react";
import { FlatList, Text } from "react-native";
import { useHabit } from "../context/HabitContext";
import HabitItem from "./HabitItem";

export default function HabitList() {
  const { habits } = useHabit();

  if (habits.length === 0) {
    return <Text>Tidak ada habit. Tambahkan dulu 🚀</Text>;
  }

  return (
    <FlatList
      data={habits}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <HabitItem habit={item} />}
    />
  );
}
