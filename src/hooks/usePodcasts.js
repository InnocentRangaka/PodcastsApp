// usePodcasts.js
import { useState, useEffect } from 'react';
import { fetchPodcasts } from '../../api';

function usePodcasts() {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadPodcasts() {
      try {
        const data = await fetchPodcasts();
        setPodcasts(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    loadPodcasts();
  }, []);

  return { podcasts, loading, error };
}

export default usePodcasts;
