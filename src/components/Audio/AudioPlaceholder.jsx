// AudioPlaceholder.jsx
import React, { createContext, useRef, useState, useEffect } from 'react';

export const AudioContext = createContext();

const AudioPlaceholder = ({ children }) => {
  const audioRef = useRef(null);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [currentAudioId, setCurrentAudioId] = useState(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isEnded, setIsEnded] = useState(null);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    const savedAudioData = JSON.parse(localStorage.getItem('audioData'));
    if (savedAudioData) {
      audioRef.current.id = savedAudioData.id;
      audioRef.current.src = savedAudioData.src;
      audioRef.current.currentTime = savedAudioData.currentTime;
      setCurrentAudioId(audioRef.current.id)
      setCurrentAudio(savedAudioData.src);
      setDuration(savedAudioData.duration);
      setCurrentTime(savedAudioData.currentTime);
    }
  }, []);

  const saveAudioData = (src, duration, currentTime) => {
    const audioData = { src, duration, currentTime };
    localStorage.setItem('audioData', JSON.stringify(audioData));
  };

  const startUpdatingLocalStorage = () => {
    const id = setInterval(() => {
      if (audioRef.current) {
        saveAudioData(audioRef.current.id, audioRef.current.src, audioRef.current.duration, audioRef.current.currentTime);
      }
    }, 1000); // Update every second
    setIntervalId(id);
  };

  const stopUpdatingLocalStorage = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  const onPlay = (audioSrc) => {
    if (audioRef.current) {
      if (audioRef.current.src !== audioSrc) {
        audioRef.current.src = audioSrc;
        audioRef.current.currentTime = 0; // reset time if new audio
      }
      audioRef.current.play();
      startUpdatingLocalStorage();
    }
  };

  const onPause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      saveAudioData(audioRef.current.id, audioRef.current.src, audioRef.current.duration, audioRef.current.currentTime);
      stopUpdatingLocalStorage();
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

  const onEnded = () => {
    if (audioRef.current) {
      setIsEnded(true);
    }
  };

  return (
    <AudioContext.Provider value={{ onPlay, onPause, duration, currentTime, currentAudio, currentAudioId, setCurrentAudio, isEnded }}>
      <audio ref={audioRef} onTimeUpdate={onTimeUpdate} onLoadedMetadata={onLoadedMetadata} onEnded={onEnded} />
      {children}
    </AudioContext.Provider>
  );
};

export default AudioPlaceholder;
