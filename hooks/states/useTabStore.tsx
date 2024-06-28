import { create } from "zustand";

type TabState = "all" | "coming";

interface TabsState {
  tab: TabState;
  setTab: (newTab: string) => void;
}
export const useTabsStore = create<TabsState>()((set) => ({
  tab: "coming",
  setTab: (newTab: string) => set({ tab: newTab as TabState }),
}));
