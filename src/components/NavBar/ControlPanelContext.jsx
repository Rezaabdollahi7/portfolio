// components/NavBar/ControlPanelContext.jsx

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";

const ControlPanelContext = createContext(undefined);

export const useControlPanel = () => {
  const context = useContext(ControlPanelContext);
  if (!context) {
    throw new Error("useControlPanel must be used within ControlPanelProvider");
  }
  return context;
};

export const ControlPanelProvider = ({ children }) => {
  const [isControlPanelOpen, setIsControlPanelOpen] = useState(false);
  const [brightness, setBrightness] = useState(100);
  const [volume, setVolume] = useState(50);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const audioRef = useRef(null);

  const songs = [
    {
      id: 1,
      title: "Incoming phonk",
      artist: "MC Orsen",
      src: "/music/MC Orsen - incoming phonk (320).mp3",
      cover: "/images/music-1.jpg",
    },
    {
      id: 2,
      title: "phonk  KIIXSHI ",
      artist: "GHOST",
      src: "/music/phonk me KIIXSHI - GHOST (128).mp3",
      cover: "/images/music-2.jpg",
    },
    {
      id: 3,
      title: " inside phonk",
      artist: "Unknown Artist",
      src: "/music/Unknown Artist - dead inside phonk (320).mp3",
      cover: "/images/music-3.jpeg",
    },
  ];

  // Apply brightness to body
  useEffect(() => {
    document.body.style.filter = `brightness(${brightness}%)`;
    return () => {
      document.body.style.filter = "";
    };
  }, [brightness]);

  // Sync volume with audio
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  // Auto play/pause
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          console.log("Autoplay prevented:", error);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Load new song
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          console.log("Autoplay prevented:", error);
        });
      }
    }
  }, [currentSongIndex]);

  // Handle song ended
  const handleSongEnded = () => {
    playNextSong();
  };

  const toggleControlPanel = () => {
    setIsControlPanelOpen(!isControlPanelOpen);
  };

  const closeControlPanel = () => {
    setIsControlPanelOpen(false);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const playNextSong = () => {
    setCurrentSongIndex((prev) => (prev === songs.length - 1 ? 0 : prev + 1));
    setIsPlaying(true);
  };

  const playPreviousSong = () => {
    setCurrentSongIndex((prev) => (prev === 0 ? songs.length - 1 : prev - 1));
    setIsPlaying(true);
  };

  return (
    <ControlPanelContext.Provider
      value={{
        isControlPanelOpen,
        brightness,
        volume,
        isPlaying,
        currentSongIndex,
        currentSong: songs[currentSongIndex],
        audioRef,
        toggleControlPanel,
        setBrightness: (value) => setBrightness(value),
        setVolume: (value) => setVolume(value),
        togglePlay,
        playNextSong,
        playPreviousSong,
        closeControlPanel,
      }}
    >
      {children}
      <audio
        ref={audioRef}
        src={songs[currentSongIndex].src}
        onEnded={handleSongEnded}
        preload="auto"
      />
    </ControlPanelContext.Provider>
  );
};
