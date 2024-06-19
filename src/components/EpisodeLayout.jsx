import { memo, useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Img } from 'react-image';
import {decodeTextWithCharacter} from '../utils/textUtils'
import { fetchSeason } from '../../api';

export default function Episode() {
  const showName = useParams()?.name && decodeTextWithCharacter(useParams().name, '_'),
  location = useLocation(),
  path = location?.pathname || '',
  [season, setSeason] = useState([]),
  [error, setError] = useState(null),
  [loading, setLoading] = useState(false);
  const { podcastId, viewSeason } = location.state?.show || [];
  const { seasonId, seasonTitle, viewEpisode } = viewSeason || [];
  const { id, title } = viewEpisode || [];
  // Use useCallback for fetchSeason to prevent unnecessary re-renders
  const getSeasonData = useCallback(async () => {
    try {
      setLoading(true);
      const fetchedSeason = await fetchSeason(podcastId, id);
      setSeason(fetchedSeason);
    } catch (error) {
      console.log(error)
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [podcastId, id, fetchSeason]);

  useEffect(() => {
    getSeasonData();
  }, [getSeasonData]);

  console.log(viewSeason)

  console.log(showName, podcastId, "|", seasonId, seasonTitle, "|", id,title,path)

  return (
    !loading && season
      ? (
        <section key={id} className="show">
          <h1>Episode {' ' } {id}</h1>
        </section>
      )
      : <h2>Loading...</h2>
  );
}
