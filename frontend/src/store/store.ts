import { create } from "zustand";

export type VideoTimeline = boolean[];

type Store = {
    link: string;
    timeline: VideoTimeline;
    timelineStatus: "idle" | "loading" | "complete";
    isAlert: boolean;
    setLink: (link: string) => void;
    setVideoTimeline: (timeline: VideoTimeline) => void;
}

export const useAppStore = create<Store>((set) => ({
    link: '',
    timeline: [],
    isAlert: true,
    timelineStatus: "complete",
    setLink: (link: string) => set({ link }),
    setVideoTimeline: (timeline: VideoTimeline) => set({ timeline }),
}));