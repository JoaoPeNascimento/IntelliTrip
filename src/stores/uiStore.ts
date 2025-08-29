import { create } from "zustand";

interface UIState {
  showMyTravels: boolean;
  showMyInvites: boolean;
  setShowMyTravels: () => void;
  setShowMyInvites: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  showMyTravels: true,
  showMyInvites: false,
  setShowMyTravels: () =>
    set(() => ({ showMyTravels: true, showMyInvites: false })),
  setShowMyInvites: () =>
    set(() => ({ showMyTravels: false, showMyInvites: true })),
}));
