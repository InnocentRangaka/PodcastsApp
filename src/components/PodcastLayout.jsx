import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import fetchPosts from '../../api';
import { getPopularPodcasts, getNewPodcasts, getRecommendedPodcastsByDate } from '../utils/podcastUtils';

export default function Podcast() {
  const [count, setCount] = useState(0);
  const [podcasts, setPodcasts] = useState([]);
  const [popularPodcasts, setPopularPodcasts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const section = document.createElement('section');

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchPosts();

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
  // console.log(error);

  return (
    loading
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
      )
  );
}
