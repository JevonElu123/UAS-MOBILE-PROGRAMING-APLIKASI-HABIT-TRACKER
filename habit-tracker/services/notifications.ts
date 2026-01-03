import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

export async function requestNotificationPermission() {
  if (!Device.isDevice) {
    alert("Notifikasi hanya bisa di device fisik");
    return false;
  }

  const { status } = await Notifications.getPermissionsAsync();
  if (status !== "granted") {
    const { status: newStatus } =
      await Notifications.requestPermissionsAsync();
    return newStatus === "granted";
  }

  return true;
}

export async function scheduleDailyNotification() {
  await Notifications.cancelAllScheduledNotificationsAsync();

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Habit Reminder ⏰",
      body: "Jangan lupa selesaikan habit kamu hari ini!",
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: 9,
      minute: 0,
    },
  });
}


