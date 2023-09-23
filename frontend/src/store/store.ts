import { create } from "zustand";

export type VideoTimeline = boolean[];

type Store = {
    link: string;
    timeline: VideoTimeline;
    setLink: (link: string) => void;
    setVideoTimeline: (timeline: VideoTimeline) => void;
}

export const useAppStore = create<Store>((set) => ({
    link: '',
    timeline: [],
    setLink: (link: string) => set({ link }),
    setVideoTimeline: (timeline: VideoTimeline) => set({ timeline }),
}));