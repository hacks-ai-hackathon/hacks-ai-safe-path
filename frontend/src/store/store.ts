import { create } from "zustand";

export type VideoTimeline = boolean[];

type Store = {
    link: string;
    timeline: VideoTimeline;
    timelineStatus: "idle" | "loading" | "complete";
    alertStatus: number;
    setLink: (link: string) => void;
    setAlertStatus: (alert: number) => void;
    setVideoTimeline: (timeline: VideoTimeline) => void;
}

export const useAppStore = create<Store>((set) => ({
    link: '',
    timeline: [],
    alertStatus: -1,
    timelineStatus: "complete",
    setLink: (link: string) => set({ link }),
    setAlertStatus: (alertStatus: number) => set({ alertStatus }),
    setVideoTimeline: (timeline: VideoTimeline) => set({ timeline }),
}));