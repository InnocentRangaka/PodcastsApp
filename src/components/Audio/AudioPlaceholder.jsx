import React, { createContext, useRef, useState, useEffect } from 'react';
import useUpdateLocalStorage from '../../hooks/useUpdateLocalStorage'
export const AudioContext = createContext();

const AudioPlaceholder = ({ children }) => {
  const audioRef = useRef(null);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [currentAudioId, setCurrentAudioId] = useState(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isEnded, setIsEnded] = useState(null);
  const [intervalId, setIntervalId] = useState(null);
  const [autoplayQueue, setAutoplayQueue] = useState([]);
  const [autoplayIndex, setAutoplayIndex] = useState(0);
  const [autoplayEnabled, setAutoplayEnabled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const savedAudioData = JSON.parse(localStorage.getItem('audioData'));
    const ensureSavedAudioData = savedAudioData?.id && savedAudioData?.src && savedAudioData?.currentTime;
    if (ensureSavedAudioData) {
      audioRef.current.id = savedAudioData?.id;
      audioRef.current.src = savedAudioData?.src;
      audioRef.current.currentTime = savedAudioData?.currentTime || 0;
      setCurrentAudioId(savedAudioData.id);
      setCurrentAudio(savedAudioData.src);
      setDuration(savedAudioData.duration);
      setCurrentTime(savedAudioData.currentTime);
      // console.log(savedAudioData.id)
    }
  }, []);

  useEffect(() => {
    if (autoplayEnabled && autoplayQueue.length > 0 && autoplayIndex < autoplayQueue.length) {
      const nextAudioSrc = autoplayQueue[autoplayIndex];
      onPlay(nextAudioSrc);
    }
  }, [autoplayIndex, autoplayQueue, autoplayEnabled]);

  const saveAudioData = (id, src, duration, currentTime) => {
    const audioData = { id, src, duration, currentTime };
    // localStorage.setItem('audioData', JSON.stringify(audioData));
    // console.log(currentAudioId)
    const [ type, podcastId, seasonId, episodeId ] = id.split('-'),
    storageItemType = 'audioData',
    data = JSON.stringify(audioData);
    console.log(storageItemType, type, podcastId, seasonId, episodeId)
    useUpdateLocalStorage({ storageItemType, type, podcastId, seasonId, episodeId, data })
  };

  const startUpdatingLocalStorage = () => {
    const id = setInterval(() => {
      if (audioRef.current && isPlaying) {
        saveAudioData(currentAudioId, audioRef.current.src, audioRef.current.duration, audioRef.current.currentTime);
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
    if (audioRef.current && isPlaying) {
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
      saveAudioData(currentAudioId, audioRef.current.src, audioRef.current.duration, audioRef.current.currentTime);
      audioRef.current.pause();
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
    setIsEnded(true);
    if (autoplayEnabled && autoplayIndex < autoplayQueue.length - 1) {
      setAutoplayIndex(prevIndex => prevIndex + 1);
    }
  };

  const toggleAutoplay = () => {
    setAutoplayEnabled(prev => !prev);
  };

  const playAutoplayQueue = (queue) => {
    setAutoplayQueue(queue);
    setAutoplayIndex(0);
    setAutoplayEnabled(true);
  };

  return (
    <AudioContext.Provider value={{ onPlay, onPause, duration, currentTime, currentAudio, currentAudioId, setCurrentAudioId, setCurrentAudio, isEnded, toggleAutoplay, playAutoplayQueue, isPlaying, setIsPlaying, isClicked, setIsClicked }}>
      <audio ref={audioRef} onTimeUpdate={onTimeUpdate} onLoadedMetadata={onLoadedMetadata} onEnded={onEnded} />
      {children}
    </AudioContext.Provider>
  );
};

export default AudioPlaceholder;
