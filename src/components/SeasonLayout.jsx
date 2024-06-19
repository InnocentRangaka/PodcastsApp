import { memo, useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Img } from 'react-image';
import {decodeTextWithCharacter} from '../utils/textUtils'
import { fetchSeason, fetchPodcastByTitle } from '../../api';
import { SvgIcon } from '@mui/material';

export default function Season() {
  const showName = useParams()?.name && decodeTextWithCharacter(useParams().name, '_'),
  location = useLocation(),
  path = location?.pathname || '',
  [season, setSeason] = useState([]),
  [error, setError] = useState(null),
  [loading, setLoading] = useState(false);
  const { podcastId, viewSeason } = location.state?.show || [];
  const { id, title } = viewSeason || [];
  
  // Use useCallback for fetchSeason to prevent unnecessary re-renders
  const getSeasonData = useCallback(async () => {
    try {
      setLoading(true);

      let makePodcastId = podcastId,
      makeSeasonId = id;

      if(!makePodcastId){
        const podcastByTitle = await fetchPodcastByTitle({title: showName})
        makePodcastId = podcastByTitle.id
      }

      if(!makeSeasonId){
        const getIdFromPath = path.split('/').pop()
        makeSeasonId = getIdFromPath;
      }

      const fetchedSeason = await fetchSeason(makePodcastId, makeSeasonId);
      setSeason(fetchedSeason);
      makePodcastId && localStorage.setItem('previewShow', {podcast: makePodcastId, season: makeSeasonId,});
    } catch (error) {
      console.log(error)
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [podcastId, id, showName, fetchSeason, fetchPodcastByTitle]);

  useEffect(() => {
    getSeasonData();
  }, [getSeasonData]);

  console.log(showName,podcastId,id,title,path)

  return (
    !loading && season
      ? (
        <section key={season.id} className="show">
          <div className="show-content">
            <div className="show-hero">
              <div className="show-hero-image">
                <Img
                  className=""
                  aria-hidden=""
                  loading="eager"
                  src={season.image}
                />
              </div>
              <div className="show-info">
                <h1 className="show-title">
                  {season.title}
                </h1>
                
                <div className="show-subtitle">
                  <span>
                    Season
                  </span>

                  {season?.totalEpisodes && (
                  <span>
                    {season.totalEpisodes}
                    {' '}
                    Episodes
                  </span>
                  )}

                  {season?.updated && (
                  <span>
                    {getYear(season.updated)}
                  </span>
                  )}

                </div>
              </div>
              {season?.description && (
                <div className="show-description">
                  <p className="">
                    {season.description}
                  </p>
                </div>
              )}
              
            </div>
            <div className='show-list-container'>
              
              <div className="show-list-header">
                <h4>
                  {/* {(typeName && typeName.charAt(0).toUpperCase() + typeName.slice(1))}
                  {' '} */}
                  Episodes
                </h4>
              </div>
              
              <div className='show-list'>
                <div className='show-list-content'>
                {season?.episodes && season.episodes.map((episode) => (
                  <div 
                  key={episode.episode}
                  className='show-list-item padding-10'
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
                                  {episode.episode}
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
                          to={`episode/${episode.episode}`}
                          className='show-list-item-link'
                          spellCheck="false"
                          title={season.title}
                          state={{
                            show: {
                              podcastId: `${podcastId}`,
                              viewSeason: {
                                seasonId: `${season.season}`,
                                seasonTitle: `${season.title}`,
                                viewEpisode: {
                                  id: `${episode.episode}`,
                                  title: `${episode.title}`,
                                  description: `${episode.description}`,
                                  file: `${episode.file}`,
                                }
                              }
                            },
                          }}
                          >{episode.title}
                        </Link>
                      </div>
                      <div className='show-list-item-text'>
                        {episode && (
                          <div>  {/* Wrap the content in a single element (div) */}
                            {episode.episode && <span>Episode {episode.episode}</span>}
                            {/* {season.episodes && <span>{season.episodes.length}{' '}{season.episodes.length >= 2 ? 'Episodes' : "Episode"}</span>} */}
                          </div>
                          )}
                        
                      </div>

                      {episode?.description && (
                        <div className='show-list-item-description'>
                          <p>{episode.description}</p>
                        </div>
                      )}

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
