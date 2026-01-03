import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { useHabit } from "../context/HabitContext";
import { useProgress } from "../hooks/useProgress";
import ProgressBar from "./ProgressBar";


export default function ProgressSummary() {
  const { habits } = useHabit();
  const {
    completedToday,
    total,
    todayPercentage,
    weeklyPercentage,
    monthlyPercentage,
  } = useProgress(habits);

  return (
    <View style={styles.box}>
      <Text>
        Hari ini: {completedToday}/{total} ({todayPercentage}%)
      </Text>

      <ProgressBar
        label="Progres Mingguan"
        percentage={weeklyPercentage}
      />

      <ProgressBar
        label="Progres Bulanan"
        percentage={monthlyPercentage}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  box: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#eee",
    borderRadius: 5,
  },
});
