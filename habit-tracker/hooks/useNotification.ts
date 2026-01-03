export const useNotification = () => {
  const requestPermission = async () => {
    // placeholder (Expo Notifications bisa ditambah)
    return true;
  };

  const scheduleDaily = () => {
    console.log("Daily notification scheduled");
  };

  const cancelAll = () => {
    console.log("Notifications cancelled");
  };

  return { requestPermission, scheduleDaily, cancelAll };
};
