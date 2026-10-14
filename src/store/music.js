import { create } from "zustand";

export const tracks = [
  {
    title: "incoming phonk",
    artist: "MC Orsen",
    src: "/music/incoming-phonk.mp3",
    cover: "/images/music/music-1.webp",
  },
  {
    title: "GHOST",
    artist: "phonk me, KIIXSHI",
    src: "/music/ghost.mp3",
    cover: "/images/music/music-2.webp",
  },
  {
    title: "dead inside phonk",
    artist: "Unknown Artist",
    src: "/music/dead-inside-phonk.mp3",
    cover: "/images/music/music-3.webp",
  },
];

// One <audio> for the whole app, created on first play so nothing
// downloads until someone actually presses play.
let audio = null;
const getAudio = (get) => {
  if (!audio) {
    audio = new Audio();
    audio.preload = "none";
    audio.addEventListener("ended", () => get().next());
  }
  return audio;
};

const useMusicStore = create((set, get) => ({
  index: 0,
  isPlaying: false,
  volume: 60,

  play: () => {
    const a = getAudio(get);
    const track = tracks[get().index];
    if (!a.src.endsWith(track.src)) a.src = track.src;
    a.volume = get().volume / 100;
    a.play().then(
      () => set({ isPlaying: true }),
      () => set({ isPlaying: false }),
    );
  },
  pause: () => {
    audio?.pause();
    set({ isPlaying: false });
  },
  toggle: () => (get().isPlaying ? get().pause() : get().play()),
  next: () => {
    set((s) => ({ index: (s.index + 1) % tracks.length }));
    get().play();
  },
  prev: () => {
    set((s) => ({ index: (s.index - 1 + tracks.length) % tracks.length }));
    get().play();
  },
  setVolume: (volume) => {
    if (audio) audio.volume = volume / 100;
    set({ volume });
  },
}));

export default useMusicStore;
