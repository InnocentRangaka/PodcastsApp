import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { fetchPodcasts } from '../../api';
import { getPopularPodcasts, 
  getNewPodcasts, getRecommendedPodcastsByDate,
  sortAlphabetically, sortAlphabeticallyReversed,
  sortByDate, sortByLatestRelease
 } from '../utils/podcastUtils';
import reactLogo from '../assets/react.svg';
import viteLogo from '../assets/vite.svg';

export default function Home() {
  const [count, setCount] = useState(0);
  const location = useLocation();
  const [podcasts, setPodcasts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sortedPodcasts, setSortedPodcasts] = useState([]);
  const [sortBy, setSortBy] = useState('alphabetically'); // Default sort


  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchPodcasts();

        if (data.length === 0) {
          throw {
            message: 'No available Podcasts yet',
            statusText: 'No Podcasts',
            status: 'Podcasts error!',
          };
        }

        setPodcasts(data);
      } catch (fetchError) {
        setError(fetchError);
      } finally {
        setLoading(false);
      }
    };

    getPosts();
  }, []);

  // console.log(podcasts);
  // console.log(location);
  // console.log(error);

  return (
    <>
      {loading
        ? <h2>Loading...</h2>
        : (
          <>
            {getPopularPodcasts(
              { podcasts },
            )}
            {getNewPodcasts(
              { podcasts },
            )}
            {getRecommendedPodcastsByDate(
              { podcasts },
            )}
          </>
        )}
    </>
  );
}
