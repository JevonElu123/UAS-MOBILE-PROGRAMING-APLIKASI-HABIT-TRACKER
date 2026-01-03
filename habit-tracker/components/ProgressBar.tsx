import { View, StyleSheet, Text } from "react-native";

type Props = {
  label: string;
  percentage: number;
};

export default function ProgressBar({ label, percentage }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label} ({percentage}%)
      </Text>

      <View style={styles.barBackground}>
        <View
          style={[
            styles.barFill,
            { width: `${percentage}%` }
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  label: {
    marginBottom: 4,
    fontSize: 14,
  },
  barBackground: {
    height: 12,
    backgroundColor: "#444",
    borderRadius: 6,
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    backgroundColor: "#4ade80", // hijau
  },
});
