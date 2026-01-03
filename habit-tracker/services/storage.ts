import AsyncStorage from '@react-native-async-storage/async-storage';
import { Habit } from '@/types/habit';


const KEY = 'HABITS_DATA';


export async function saveHabits(habits: Habit[]) {
await AsyncStorage.setItem(KEY, JSON.stringify(habits));
}


export async function loadHabits(): Promise<Habit[]> {
const data = await AsyncStorage.getItem(KEY);
return data ? JSON.parse(data) : [];
}