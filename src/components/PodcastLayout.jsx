import { useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Img } from 'react-image';
import fetchPosts from '../../api';
import { getPopularPodcasts, getNewPodcasts, getRecommendedPodcastsByDate } from '../utils/podcastUtils';

export default function Show() {
  const { name } = useParams(); // Destructure name from useParams
  const location = useLocation();
  const [podcasts, setPodcasts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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

  console.log(location.state);
  console.log(name);

  return (
    loading
      ? <h2>Loading...</h2>
      : (
        <>
          <section className="show">
            <div className="show-content">
              <div className="show-hero">
                <div className="show-hero-image" />
                <Img
                  className=""
                  aria-hidden=""
                  loading="eager"
                  src=""
                />
              </div>
            </div>
          </section>
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
