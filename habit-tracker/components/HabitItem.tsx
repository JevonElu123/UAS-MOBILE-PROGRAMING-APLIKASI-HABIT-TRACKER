import { View, Text, Pressable, StyleSheet, TextInput } from 'react-native';
import { useState } from 'react';
import { Habit } from '@/types/habit';
import { useHabit } from '@/context/HabitContext';
import { getTodayKey } from '@/utils/dateHelper';

export default function HabitItem({ habit }: { habit: Habit }) {
  const { toggleHabit, deleteHabit, editHabit } = useHabit();
  const done = habit.completedDates.includes(getTodayKey());

  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(habit.title);

  const handleSave = () => {
    if (!value.trim()) return;
    editHabit(habit.id, value.trim());
    setIsEditing(false);
  };

  return (
    <View style={[styles.card, done && styles.done]}>
      {isEditing ? (
        <TextInput
          value={value}
          onChangeText={setValue}
          style={styles.input}
          autoFocus
        />
      ) : (
        <Text style={styles.title}>{habit.title}</Text>
      )}

      <View style={styles.actions}>
        {isEditing ? (
          <>
            <Pressable onPress={handleSave} style={[styles.btn, styles.primary]}>
              <Text>Simpan</Text>
            </Pressable>
            <Pressable onPress={() => setIsEditing(false)} style={styles.btn}>
              <Text>Batal</Text>
            </Pressable>
          </>
        ) : (
          <>
            <Pressable onPress={() => toggleHabit(habit.id)} style={styles.btn}>
              <Text>{done ? 'Batal' : 'Selesai'}</Text>
            </Pressable>

            <Pressable onPress={() => setIsEditing(true)} style={styles.btn}>
              <Text>Edit</Text>
            </Pressable>

            <Pressable onPress={() => deleteHabit(habit.id)} style={[styles.btn, styles.danger]}>
              <Text>Hapus</Text>
            </Pressable>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1e1e1e',
    padding: 14,
    borderRadius: 12,
    marginVertical: 6,
  },
  done: {
    opacity: 0.6,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    color: '#000',
    borderRadius: 6,
    padding: 8,
    marginBottom: 8,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  btn: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: '#ddd',
    borderRadius: 6,
  },
  primary: {
    backgroundColor: '#A1CEDC',
  },
  danger: {
    backgroundColor: '#ffb3b3',
  },
});
