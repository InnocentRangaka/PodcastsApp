import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Img } from 'react-image';
import { fetchPodcast, fetchPodcastByTitle } from '../../api';
import { getYear, getTotalEpisodes, showNameFromPath } from '../utils/podcastUtils';
import {encodeText} from '../utils/textUtils'
import FavouriteButton from './FavouriteButton';
import AudioPlaceholder from './Audio/AudioPlaceholder';
import AudioPlayerButton from './Audio/AudioPlayerButton';

export default function Show() {
  const { name } = useParams(); // Destructure name from useParams
  const location = useLocation();
  const path = location?.pathname || '';
  const [podcast, setPodcast] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id, title } = location.state?.show || [];

  // Use useCallback for fetchSeason to prevent unnecessary re-renders
  const getPodcastData = useCallback(async (method, args) => {
    setLoading(true);
    setError(null);
  
    try {
      let data;
      if (method === 'getByPath') {
        const { path } = args;
        const title = name || showNameFromPath(path)
        data = await fetchPodcastByTitle({ title });
      } else if (method === 'getPosts') {
        const { id } = args;
        data = await fetchPodcast({ id }); // `fetchPodcast` takes an ID
      } else {
        throw new Error('Invalid method provided');
      }
  
      if (!data) {
        throw {
          message: 'No available Podcasts yet',
          statusText: 'No Podcasts',
          status: 'Podcasts error!',
        };
      }
  
      setPodcast(data);
      data?.id && localStorage.setItem('previewShow', {podcast: data.id,});
    } catch (fetchError) {
      setError(fetchError);
      console.error(fetchError); // Log for debugging purposes
    } finally {
      setLoading(false);
    }
  }, [fetchPodcastByTitle, fetchPodcast]); // Dependencies for `getPodcastData`

  useEffect(() => {
    const method = id ? 'getPosts' :  'getByPath'; // Assuming `path` is available in the component
    const args = method === 'getPosts' ? { id } : { path }; // Pass ID if applicable

    getPodcastData(method, args);
  }, [id, path, getPodcastData]);

  // console.log(podcast.description)

  return (
    !loading && podcast
      ? (
        <section key={podcast.id} className="show">
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
                  {podcast?.totalSeasons && (
                    <span>
                      {podcast.totalSeasons}
                      {' '}
                      Seasons
                    </span>
                  )}

                  {podcast?.seasons && (
                  <span>
                    {getTotalEpisodes(podcast.seasons)}
                    {' '}
                    Episodes
                  </span>
                  )}

                  {podcast?.updated && (
                  <span>
                    {getYear(podcast.updated)}
                  </span>
                  )}

                </div>
              </div>
              {podcast?.description && (
                <div className="show-description">
                  <p className="">
                    {podcast.description}
                  </p>
                </div>
              )}
              
            </div>
            <div className='show-list-container'>
              
              <div className="show-list-header">
                <h4>
                  {/* {(typeName && typeName.charAt(0).toUpperCase() + typeName.slice(1))}
                  {' '} */}
                  Seasons
                </h4>
              </div>
              
              <div className='show-list'>
                <div className='show-list-content'>
                {podcast?.seasons && podcast.seasons.map((season) => (
                  <div 
                  key={season.season}
                  className='show-list-item padding-0'
                  >
                    <div className='show-list-item-left'>
                      <div className='show-list-item-index'>
                        {/* <div className='show-list-item-thumbnail-overlay'>
                          sdsd
                        </div> */}
                        <div className='show-list-item-index-content'>
                          <div className='show-list-item-play-button-container'>
                            <div className='show-list-item-play-button'>
                              <div className='show-list-item-play-button-icon'>
                                <div className='show-list-item-play-button'>
                                  {season.season}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='show-list-item-center'>
                      <div className='show-list-item-title'>
                        <Link
                        to={`season/${season.season}`}
                        className='show-list-item-link'
                        spellCheck="false"
                        title={season.title}
                        state={{
                          show: {
                            podcastId: `${podcast.id}`,
                            viewSeason: {
                              id: `${season.season}`,
                              title: `${season.title}`,
                            }
                          },
                        }}
                        >{season.title}
                        </Link>
                      </div>
                      <div className='show-list-item-text'>
                        {season && (
                          <div>  {/* Wrap the content in a single element (div) */}
                            {season.season && <span>Season {season.season}</span>}
                            {season.episodes && <span>{season.episodes.length}{' '}{season.episodes.length >= 2 ? 'Episodes' : "Episode"}</span>}
                          </div>
                          )}
                        
                      </div>
                      <div>
                        <FavouriteButton audio='' />
                        {episode.file && (
                          <AudioPlaceholder>
                            <AudioPlayerButton key={season.season} audioId={season.season} audioSrc={episode.file} />
                          </AudioPlaceholder>
                          )}
                      </div>
                    </div>
                  </div>
                  
                ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )
      : <h2>Loading...</h2>
  );
}
