import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { encodeText, decodeText } from '../utils/textUtils';

const ListPodcasts = ({ title, podcastsObject }) => {
  ListPodcasts.propTypes = {
    title: PropTypes.string.isRequired,
    podcastsObject: PropTypes.array.isRequired,
  };

  const typeName = title ? title.toLowerCase() : '';
  const podcasts = podcastsObject || [];

  return (
    <section>
      <div className="section-header">
        <h2>
          {(typeName && typeName.charAt(0).toUpperCase() + typeName.slice(1))} podcasts
        </h2>
      </div>
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
                        id: `${podcast.id}`,
                        title: `${podcast.title}`,
                      },
                    }}
                  >
                    <span className="">
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

export default ListPodcasts;
