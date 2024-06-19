import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Img } from 'react-image';
import { getYear, getTotalEpisodes} from '../utils/podcastUtils';

export default function ShowLayout({type, show, loading = false}) {
    const podcast = type === 'podcast' ? show?.id && show : false,
    season = type === 'season' ? show?.id && show : false
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