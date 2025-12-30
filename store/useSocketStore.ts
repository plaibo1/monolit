import { type ConnectionStatus } from "@/types/chat";
import { create } from "zustand";

export interface SocketLog {
  timestamp: string;
  type: "info" | "error" | "in" | "out";
  message: string;
  data?: any;
}

export interface SocketStore {
  socketStatus: ConnectionStatus;
  setSocketStatus: (status: ConnectionStatus) => void;
  logs: SocketLog[];
  addLog: (log: Omit<SocketLog, "timestamp">) => void;
  clearLogs: () => void;
}

export const useSocketStore = create<SocketStore>((set) => ({
  socketStatus: "connecting",
  setSocketStatus: (status: ConnectionStatus) => set({ socketStatus: status }),
  logs: [],
  addLog: (log) =>
    set((state) => ({
      logs: [
        { ...log, timestamp: new Date().toLocaleTimeString() },
        ...state.logs,
      ].slice(0, 1000), // Keep last 1000 logs
    })),
  clearLogs: () => set({ logs: [] }),
}));
