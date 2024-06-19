import React, { useState, useContext, useEffect } from 'react';
import { IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { AudioContext } from './AudioPlaceholder';

const AudioPlayerButton = ({ audioSrc, audioName }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const { onPlay, onPause, duration, currentTime, setCurrentAudio, currentAudio } = useContext(AudioContext);

  useEffect(() => {
    if (currentAudio !== audioSrc) {
      setIsPlaying(false);
    }
  }, [currentAudio, audioSrc]);

  const handleTogglePlay = () => {
    if (currentAudio === audioSrc) {
      onPause();
      setCurrentAudio(null);
      setIsPlaying(false);
    } else {
      setCurrentAudio(audioSrc);
      onPlay(audioSrc);
      setIsPlaying(true);
    }
  };

  return (
    <div>
      <IconButton onClick={handleTogglePlay} className='playerButton' name={audioName}>
        {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
      </IconButton>
      {currentAudio === audioSrc && (
        <div>
          <p>Duration: {duration.toFixed(2)} seconds</p>
          <p>Current Time: {currentTime.toFixed(2)} seconds</p>
        </div>
      )}
    </div>
  );
};

export default AudioPlayerButton;