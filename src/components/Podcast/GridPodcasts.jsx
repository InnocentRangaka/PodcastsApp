import React, { useCallback, memo } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { encodeText, decodeText } from '../../utils/textUtils';
import { handleSortChange } from '../../utils/podcastUtils';
import { formatDateTime } from '../../utils/dateTimeFormat';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const GridPodcasts = ({ title, podcastsObject, sortBy, setSortedPodcasts, setSortBy }) => {
  const typeName = title ? title.toLowerCase() : '';

  const handleSort = useCallback(() => {
    handleSortChange(sortBy, podcastsObject, setSortedPodcasts, setSortBy);
  }, [sortBy, podcastsObject, setSortedPodcasts, setSortBy]);

  memo(() => {
    if (sortBy !== null) {
      handleSort();
    }
  }, [sortBy, handleSort]);

  const podcasts = podcastsObject || [];

  return (
    <section>
      <div className="grid-container justify-normal">
      <ResponsiveMasonry width='100%' 
      columnsCountBreakPoints={{ 0: 1, 321: 2, 900: 3, 1200: 4, 1536: 5 }} 
      sx={{'& > div': { width: '100% !important', }}} >
      <Masonry className="container masonry" 
        spacing={{ xs: 1, sm: 2, md: 3, xl: 4 }} 
        defaultSpacing={1} defaultWidth='100%' 
        sx={{'& > div': { width: '100% !important', }}} sequential gutter="20px"
      >
        {podcasts.map((podcast, index) => (
          <div key={`podcast-${podcast.id}`} className="grid-item">
            <div className="slider-card">
              <div className="card-link" />
              {podcast?.image && (
                <img
                  key={`podcast${podcast.id}image`}
                  src={podcast.image}
                  className="card-image"
                  alt={podcast.title}
                  loading="lazy"
                />
              )}
              <div className="card-footer">
                <div className="card-footer-content show-info">
                  <Link
                    key={`podcast${podcast.id}link`}
                    to={`/show/${encodeText(podcast.title)}`}
                    className="card-footer-link overflow-wrap"
                    title={podcast.title}
                    state={{
                      show: {
                        id: podcast.id,
                        title: podcast.title,
                      },
                    }}
                  >
                    <h3 className="show-title">
                      {decodeText(podcast.title)}
                    </h3>
                  </Link>
                  <div className="show-subtitle">
                    {podcast?.description && (
                      <p className="card-description-p">
                        {podcast.description.substring(0, 100)}...
                      </p>
                    )}
                    <div className="card-stats">
                      {podcast?.seasons && (
                        <span>Seasons: {podcast.seasons}</span>
                      )}
                      {podcast?.updated && (
                        <span>
                          Updated: {formatDateTime(podcast.updated)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Masonry>
      </ResponsiveMasonry>
      </div>
      
    </section>
  );
};

GridPodcasts.propTypes = {
  title: PropTypes.string.isRequired,
  podcastsObject: PropTypes.array.isRequired,
  sortBy: PropTypes.string.isRequired,
  setSortedPodcasts: PropTypes.func.isRequired,
  setSortBy: PropTypes.func.isRequired,
};

export default GridPodcasts;
