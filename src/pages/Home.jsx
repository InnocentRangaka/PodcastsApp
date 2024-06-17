import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import fetchPosts from '../../api';
import { getPopularPodcasts, getNewPodcasts, getRecommendedPodcastsByDate } from '../utils/podcastUtils';
import reactLogo from '../assets/react.svg';
import viteLogo from '../assets/vite.svg';

export default function Home() {
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
  const sortBySeasons = (a, b) => new Date(a.updated) - new Date(b.updated);
  const byDate = podcasts.sort(sortBySeasons);
  console.log(byDate);
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

      <section>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </section>
      <section>
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is
            {' '}
            {count}
          </button>
          <p>
            Edit
            {' '}
            <code>src/App.jsx</code>
            {' '}
            and save to test HMR
          </p>
        </div>
      </section>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}
