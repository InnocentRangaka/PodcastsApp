import { useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Img } from 'react-image';
import { fetchPodcast } from '../../api';
import { getPopularPodcasts, getNewPodcasts, getRecommendedPodcastsByDate } from '../utils/podcastUtils';

export default function Show() {
  const { name } = useParams(); // Destructure name from useParams
  const location = useLocation();
  const { id, title } = location.state.show || [];
  const [podcast, setPodcast] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchPodcast({ id });

        if (data.length === 0) {
          throw {
            message: 'No available Podcasts yet',
            statusText: 'No Podcasts',
            status: 'Podcasts error!',
          };
        }

        setPodcast(data);
      } catch (fetchError) {
        setError(fetchError);
      } finally {
        setLoading(false);
      }
    };

    getPosts();
  }, [id]);

  // console.log(podcasts);
  // console.log(error);

  console.log(podcast);
  // console.log(name);

  return (
    loading
      ? <h2>Loading...</h2>
      : (
        <section className="show">
          <div className="show-content">
            <div className="show-hero">
              <div className="show-hero-image">
                <Img
                  className=""
                  aria-hidden=""
                  loading="eager"
                  src={podcast.image}
                />
              </div>
              <div className="show-info">
                <h1 className="show-title">
                  {podcast.title}
                </h1>
                <div className="show-subtitle">
                  <span>
                    Show
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )
  );
}
