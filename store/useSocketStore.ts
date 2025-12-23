import { type ConnectionStatus } from "@/types/chat";
import { create } from "zustand";

export interface SocketStore {
  socketStatus: ConnectionStatus;
  setSocketStatus: (status: ConnectionStatus) => void;
}

export const useSocketStore = create<SocketStore>((set) => ({
  socketStatus: "connecting",
  setSocketStatus: (status: ConnectionStatus) => set({ socketStatus: status }),
}));
