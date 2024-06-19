import React, { createContext, useRef, useState } from 'react';

export const AudioContext = createContext();

const AudioPlaceholder = ({ children }) => {
  const audioRef = useRef(null);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const onPlay = (audioSrc) => {
    if (audioRef.current) {
      audioRef.current.src = audioSrc;
      audioRef.current.play();
    }
  };

  const onPause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const onTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const onLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  return (
    <AudioContext.Provider value={{ onPlay, onPause, duration, currentTime, currentAudio, setCurrentAudio }}>
      <audio ref={audioRef} onTimeUpdate={onTimeUpdate} onLoadedMetadata={onLoadedMetadata} />
      {children}
    </AudioContext.Provider>
  );
};

export default AudioPlaceholder;