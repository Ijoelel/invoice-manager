// src/stores/sidebar/useSidebarStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

type SidebarState = {
    isOpen: boolean;
    toggle: () => void;
};

export const useSidebarStore = create<SidebarState>()(
    persist(
        (set) => ({
            isOpen: true,
            toggle: () =>
                set((state) => ({
                    isOpen: !state.isOpen,
                })),
        }),
        {
            name: "sidebar-storage",
        },
    ),
);
