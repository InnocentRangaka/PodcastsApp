import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { encodeText, decodeText } from '../utils/textUtils';
import {formatDateTime} from '../utils/dateTimeFormat'
import FavouriteButton from '../components/FavouriteButton';
import { fetchPodcasts, getGenres } from '../../api'; // Assuming FavouriteButton is in the same folder

const FavouriteList = () => {
  const [favorites, setFavorites] = useState([]);
  const [podcasts, setPodcasts] = useState([]);

  useEffect(() => {
    // Fetch podcasts data
    const fetchData = async () => {
      const result = await fetchPodcasts();
      setPodcasts(result);
    };
    
    fetchData();

    // Get favorites from localStorage
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || {};
    setFavorites(storedFavorites);
  }, [fetchPodcasts]);

  const filterFavorites = () => {
    let favoriteItems = [];

    Object.keys(favorites).forEach(podcastId => {
      const podcast = podcasts.find(p => p.id === podcastId);
      
      if (podcast) {
        const seasons = favorites[podcastId].seasons || {};

        Object.keys(seasons).forEach(seasonId => {
          const episodes = seasons[seasonId].episodes || {};
          
          Object.keys(episodes).forEach(episodeId => {
            favoriteItems.push({
              ...podcast,
              seasonId,
              episodeId,
              episode: episodes[episodeId]
            });
          });
        });
      }
    });

    return favoriteItems;
  };

  const favoriteItems = filterFavorites();

  return (
    <section>
      <h2>Favorites</h2>
      <div className="grid-container">
        {favoriteItems.map(item => (
          <div key={`favorite-${item.id}-${item.seasonId}-${item.episodeId}`} className="grid-item">
            <div className="slider-card">
              <div className="card-link" />
              {item.image && (
                <img
                  src={item.image}
                  className="card-image"
                  alt={item.title}
                  loading="lazy"
                />
              )}
              <div className="card-footer">
                <div className="card-footer-content">
                  <Link
                    to={`/show/${encodeText(item.title)}`}
                    className="card-footer-link overflow-wrap"
                    title={item.title}
                    state={{
                      show: {
                        id: item.id,
                        title: item.title,
                      },
                    }}
                  >
                    <span>{decodeText(item.title)}</span>
                  </Link>
                  <p>Season: {item.seasonId}</p>
                  <p>Episode: {item.episodeId}</p>
                  <p>Favorite Added: {formatDateTime(item.episode.addedAt)}</p>
                  <FavouriteButton
                    initialFavorite={true}
                    type="episode"
                    podcastId={item.id}
                    seasonId={item.seasonId}
                    episodeId={item.episodeId}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FavouriteList;
