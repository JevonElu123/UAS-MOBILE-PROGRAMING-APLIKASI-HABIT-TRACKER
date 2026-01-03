import AsyncStorage from "@react-native-async-storage/async-storage";

export const useStorage = () => {
  const saveData = async (key: string, value: any) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.log("Save error", e);
    }
  };

  const loadData = async (key: string) => {
    try {
      const data = await AsyncStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.log("Load error", e);
      return null;
    }
  };

  const clearAll = async () => {
    await AsyncStorage.clear();
  };

  return { saveData, loadData, clearAll };
};
