import React, { useState, useContext, useEffect } from 'react';
import { IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { AudioContext } from './AudioPlaceholder';

const AudioPlayerButton = ({ audioSrc, audioId, audioName }) => {
  const { onPlay, onPause, duration, currentTime, currentAudio, currentAudioId, setCurrentAudio, isEnded } = useContext(AudioContext);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    if (currentAudio === audioSrc && isClicked) {
      setIsPlaying(true);
      setCurrentAudio(audioSrc);
      onPlay(audioSrc);
    } else {
      setIsPlaying(false);
    }
  }, [currentAudio, audioSrc, isClicked]);

  const handleTogglePlay = () => {
    if (currentAudio === audioSrc && isPlaying) {
      onPause();
      setIsPlaying(false);
      setCurrentAudio(null);
    } else {
      onPlay(audioSrc);
      setIsPlaying(true);
      setCurrentAudio(audioSrc);
      setIsClicked(true);
    }
  };

  return (
    <>
      <IconButton onClick={handleTogglePlay} className='playerButton' name={audioName}>
        {isPlaying && !isEnded ? <PauseIcon /> : isEnded ? <PlayArrowIcon /> : <PlayArrowIcon />}
      </IconButton>
      {/* {currentAudio === audioSrc && (
        <div>
          <p>Duration: {duration.toFixed(2)} seconds</p>
          <p>Current Time: {currentTime.toFixed(2)} seconds</p>
        </div>
      )} */}
    </>
  );
};

export default AudioPlayerButton;
