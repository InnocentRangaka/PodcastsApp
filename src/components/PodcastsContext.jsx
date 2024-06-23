import React, { createContext, useState, useEffect } from 'react';
import { fetchPodcasts } from '../../api'; // Adjust the import path based on your project structure

const PodcastsContext = createContext();

export const PodcastsProvider = ({ children }) => {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPodcasts = async () => {
      try {
        setLoading(true);
        const data = await fetchPodcasts();
        setPodcasts(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    getPodcasts();
  }, []);

  return (
    <PodcastsContext.Provider value={{ podcasts, loading, error }}>
      {children}
    </PodcastsContext.Provider>
  );
};

export default PodcastsContext;
