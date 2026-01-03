import { StyleSheet, TextInput, Pressable, FlatList, View } from 'react-native';
import { useState } from 'react';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

import { useHabit } from '@/context/HabitContext';
import HabitItem from '@/components/HabitItem';
import ProgressSummary from '@/components/ProgressSummary';

export default function HomeScreen() {
  const { habits, addHabit } = useHabit();
  const [title, setTitle] = useState('');

  const handleAdd = () => {
    if (!title.trim()) return;
    addHabit(title.trim());
    setTitle('');
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.header}>
        Habit Tracker
      </ThemedText>

      <View style={styles.inputRow}>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Tambah habit baru..."
          style={styles.input}
        />
        <Pressable onPress={handleAdd} style={styles.addButton}>
          <ThemedText type="defaultSemiBold">Tambah</ThemedText>
        </Pressable>
      </View>

      <FlatList
        data={habits}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <HabitItem habit={item} />}
        ListEmptyComponent={
          <ThemedText style={styles.empty}>
            Belum ada habit. Tambahkan satu 👆
          </ThemedText>
        }
      />

      <ProgressSummary />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 12,
  },
  header: {
    textAlign: 'center',
    marginBottom: 8,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff', // WAJIB
    color: '#000',           // WAJIB
  },
  addButton: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#A1CEDC',
  },
  empty: {
    textAlign: 'center',
    marginTop: 20,
    opacity: 0.7,
  },
});
