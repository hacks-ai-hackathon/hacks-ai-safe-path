import { create } from "zustand";

export type VideoTimeline = boolean[];

type Store = {
    link: string;
    timeline: VideoTimeline;
    setLink: (link: string) => void;
    setVideoTimeline: (timeline: VideoTimeline) => void;
}

export const useAppStore = create<Store>((set) => ({
    link: 'https://www.youtube.com/embed/g7CJ3pm-e7s?si=NAJzGUFhbCKVGMJP&autohide=1&showinfo=0&controls=0&mute=1&autoplay=1&hd=1',
    timeline: [],
    setLink: (link: string) => set({ link }),
    setVideoTimeline: (timeline: VideoTimeline) => set({ timeline }),
}));