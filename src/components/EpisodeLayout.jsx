import { memo, useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Img } from 'react-image';
import {decodeTextWithCharacter} from '../utils/textUtils'
import { getEpisodeShow } from '../utils/podcastUtils';

export default function Episode() {
  const showName = useParams()?.name && decodeTextWithCharacter(useParams().name, '_'),
  location = useLocation(),
  path = location?.pathname || '',
  [episode, setEpisode] = useState([]),
  [error, setError] = useState(null),
  [loading, setLoading] = useState(false);
  const { id, title, description, file } = episode || [];
  const { podcastId, viewSeason } = location.state?.show || [];
  const { seasonId, seasonTitle, viewEpisode } = viewSeason || [];
  // Use useCallback for fetchSeason to prevent unnecessary re-renders
  const getEpisodeData = useCallback(async () => {
    try {
      setLoading(true);
      const episodeData = viewEpisode || await getEpisodeShow(path)
  
      setEpisode(episodeData);
      episodeData && localStorage.setItem('previewShow', {podcast: podcastId, season: seasonId, episode: episodeData.id});
      
    } catch (error) {
      console.log(error)
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [viewEpisode]);

  useEffect(() => {
    getEpisodeData();
  }, [getEpisodeData]);
  

  console.log(episode)

  console.log(showName, podcastId, "|", seasonId, seasonTitle, "|", id, title, description, file, "|", path)

  return (
    !loading && episode
      ? (
        <section key={id} className="show">
            <h1>Episode {' ' } {id}</h1>
            <p>{episode.description}</p>
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
            </div>
        </section>
      )
      : <h2>Loading...</h2>
  );
}
