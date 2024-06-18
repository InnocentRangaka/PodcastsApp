import { useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Img } from 'react-image';
import { fetchPodcast } from '../../api';
import { getYear, getTotalEpisodes, getCurrentShow } from '../utils/podcastUtils';

export default function Show() {
  const { name } = useParams(); // Destructure name from useParams
  const location = useLocation();
  const [podcast, setPodcast] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const getCurrentShow = location.state?.show || getCurrentShow(location.pathname);
  const { id, title } = getCurrentShow || [];
  
  // setCurrentShow

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

  return (
    !loading && podcast
      ? (
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
            </div>
            <div className='show-list-container'>
              <div className='show-list'>
                <div className='show-list-content'>
                  <div className='show-list-item'>
                    <div className='show-list-item-left'>
                      <div className='show-list-item-index'>
                        {/* <div className='show-list-item-thumbnail-overlay'>
                          sdsd
                        </div> */}
                        <div className='show-list-item-index-content'>
                          <div className='show-list-item-play-button-container'>
                            <div className='show-list-item-play-button'>
                              sdsd
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )
      : <h2>Loading...</h2>
  );
}
