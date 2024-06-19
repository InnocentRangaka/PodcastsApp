import { memo, useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Img } from 'react-image';
import {decodeTextWithCharacter} from '../utils/textUtils'
import { fetchSeason } from '../../api';

export default function Episode() {
  const showName = useParams()?.name && decodeTextWithCharacter(useParams().name, '_'),
  location = useLocation(),
  path = location?.pathname || '',
  [episode, setEpisode] = useState([]),
  [error, setError] = useState(null),
  [loading, setLoading] = useState(false);
  const { podcastId, viewSeason } = location.state?.show || [];
  const { seasonId, seasonTitle, viewEpisode } = viewSeason || [];
  // Use useCallback for fetchSeason to prevent unnecessary re-renders
  const getEpisodeData = useCallback(async () => {
    try {
      setLoading(true);
      const { id, title, description, file } = viewEpisode || [];
  
      const fetchedSeason = id && title && description && file ? viewEpisode : {};
      setEpisode(fetchedSeason);
    } catch (error) {
      console.log(error)
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [viewEpisode]);

  useEffect(() => {
    getEpisodeData();
  }, [getEpisodeData]);

  const { id, title, description, file } = episode || [];
  

  console.log(episode)

  console.log(showName, podcastId, "|", seasonId, seasonTitle, "|", id, title, description, file, "|", path)

  return (
    !loading && episode
      ? (
        <section key={id} className="show">
          <h1>Episode {' ' } {id}</h1>
        </section>
      )
      : <h2>Loading...</h2>
  );
}
