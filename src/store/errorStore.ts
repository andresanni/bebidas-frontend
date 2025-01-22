import { create } from "zustand";

type NotificationType = "error" | "success" | "info";

type NotificationStore = {
  type: NotificationType | null;
  message: string | null;
  setNotification: (type: NotificationType, message: string) => void;
  clearNotification: () => void;
};

const useNotificationStore = create<NotificationStore>((set) => ({
  type: null,
  message: null,
  setNotification: (type, message) => set({ type, message }),
  clearNotification: () => set({ type: null, message: null }),
}));

export default useNotificationStore;
