import { useCallback } from 'react';
import { useAudioWizard } from 'react-audio-wizard'

export function getAudioData({url}) {
    const { status, play, pause, handleSeek, duration, currentTime } = useAudioWizard({ url })

    return { 
        status: status,  
        play: play,  
        pause: pause,  
        handleSeek: handleSeek,  
        duration: duration,  
        currentTime: currentTime
    }
}

async function fetchAudioDuration(url) {
    try {
      // Fetch the audio file as an array buffer
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
  
      // Create an audio context
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  
      // Decode the audio data
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  
      // Get the duration
      const duration = audioBuffer.duration;
  
      return duration;
    } catch (error) {
      console.error('Error fetching or decoding audio:', error);
      return null;
    }
}

const getAudioDuration = async (url) => {
    return await fetchAudioDuration(url);
};
  

export const episodesData = async (episodes) => {
    if(episodes){
        const episodesData = episodes.map(episode =>{ 
            try {
                return {
                    ...episode,
                    duration: getAudioDuration(episode.file),
                }
            } catch (error) {
                console.log(error)
            }
            
        })

        return episodesData;
    }
}