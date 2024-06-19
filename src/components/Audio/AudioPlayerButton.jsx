// src/AudioPlayerButton.jsx
import React, { useState, useRef, useContext } from 'react';
import { IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { AudioContext } from './AudioPlaceholder';

const AudioPlayerButton = ({ audioSrc, audioName }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio(audioSrc));

  const { onPlay, onPause, duration, currentTime, setCurrentAudio, currentAudio } = useContext(AudioContext);

  const handleTogglePlay = () => {
    if (currentAudio === audioSrc || isPlaying) {
      onPause();
      setCurrentAudio(null);
    } else {
      setCurrentAudio(audioSrc);
      onPlay(audioSrc);
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <IconButton onClick={handleTogglePlay} className='playerButton' name={audioName} >
      {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
    </IconButton>
  );
};

export default AudioPlayerButton;
