import { create } from "zustand";

interface SpaceStore {
  spaceInfo: any;
  setSpaceInfo: (info: any) => void;
}

export const useSpaceStore = create<SpaceStore>((set) => ({
  spaceInfo: null,
  setSpaceInfo: (info) => set({ spaceInfo: info }),
}));
