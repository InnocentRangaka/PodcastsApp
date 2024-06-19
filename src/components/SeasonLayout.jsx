import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Img } from 'react-image';
import {decodeTextWithCharacter} from '../utils/textUtils'

export default function Season() {
  const showName = useParams()?.name && decodeTextWithCharacter(useParams().name, '_'),
  seasonId = useParams()?.id,
  location = useLocation(),
  path = location?.pathname || '',
  [season, setSeason] = useState([]),
  [error, setError] = useState(null),
  [loading, setLoading] = useState(false);
  const { id, title } = location.state?.show || [];

  console.log(showName,seasonId,id,title)

  return (
    <section 
    // key={podcast.id} 
    className="show">
          <div className="show-content">
            <div className="show-hero">
              <div className="show-hero-image">
                <Img
                  className=""
                  aria-hidden=""
                  loading="eager"
                  src=""
                />
              </div>
              <div className="show-info">
                <h1 className="show-title">
                  Season
                </h1>
                <div className="show-subtitle">
                  <span>
                    Show
                  </span>
                  {/* {podcast?.totalSeasons && (
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
                  )} */}

                </div>
              </div>
            </div>
            <div className='show-list-container'>
              
              <div className="show-list-header">
                <h4>
                  {/* {(typeName && typeName.charAt(0).toUpperCase() + typeName.slice(1))}
                  {' '} */}
                  Seasons
                </h4>
              </div>
            </div>
          </div>
        </section>
  );
}
