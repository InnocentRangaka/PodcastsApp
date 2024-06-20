import React, { useCallback  } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { encodeText, decodeText } from '../utils/textUtils';
import { sortAlphabetically, sortAlphabeticallyReversed,
  sortByDate, sortByLatestRelease
 } from '../utils/podcastUtils';

const GridPodcasts = ({ title, podcastsObject, sortBy }) => {

  const typeName = title ? title.toLowerCase() : '';

  const makeSortedPodcasts = (type) => {
    switch (type) {
      case 'alphabetically':
        return sortAlphabetically(podcastsObject)
        break;
      case 'reverseAlphabetically':
        return sortAlphabeticallyReversed([...podcastsObject]);
        break;
      case 'byDate':
        return sortByDate([...podcastsObject]);
        break;
      case 'latestRelease':
        return sortByLatestRelease([...podcastsObject]);
        break;
      default:
        break;
    }
  };

  const podcasts = [...makeSortedPodcasts(sortBy)] || [];

  return (
    <section>
      <div className="grid-container">
        {podcasts.map((podcast) => (
          <div key={podcast.id} className="grid-item">
            <div className="slider-card">
              <div className="card-link" />
              {podcast?.image && (
                <img
                  src={podcast.image}
                  className="card-image"
                  alt={podcast.title}
                  loading="lazy"
                />
              )}
              <div className="card-footer">
                <div className="card-footer-content">
                  <Link
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
                    <span>
                      {decodeText(podcast.title)}
                    </span>
                  </Link>
                  <p>Duration: {podcast.duration} seconds</p> {/* Display episode duration */}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

GridPodcasts.propTypes = {
  title: PropTypes.string.isRequired,
  podcastsObject: PropTypes.array.isRequired,
};

export default React.memo(GridPodcasts);
