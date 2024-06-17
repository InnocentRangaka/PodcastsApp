import { React } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// import { Img } from 'react-image';
import { encodeText, decodeText } from './textUtils';

export default function ListPodcasts({ title, podcastsObject }) {
  ListPodcasts.propTypes = {
    // Title is required and must be a string
    title: PropTypes.string.isRequired,
    // podcastsObject is required and must be an object
    podcastsObject: PropTypes.instanceOf(Object).isRequired,
  };

  const typeName = title ? title.toLowerCase() : '';
  const podcasts = podcastsObject || []; // Use empty array for default
  if (podcasts) {
    return (
      <section>
        <div className="section-header">
          <h2>
            {(typeName && typeName.charAt(0).toUpperCase() + typeName.slice(1))}
            {' '}
            podcasts
          </h2>
        </div>
        <div className="section-slider">

          <div className="section-slider">
            {podcasts.map((podcast) => (
              <div key={podcast.id} className="section-slider-item">
                <div className="slider-card">
                  <div className="card-link" />
                  {podcast?.image && (
                  <img
                    src={podcast.image}
                    className="card-image"
                    alt={podcast.title}
                    // fallback={<span>Loading...</span>} <- // use Img instead of img
                    loading="lazy"
                  />
                  )}

                  <div className="card-footer">
                    <div className="card-footer-content">
                      <Link
                        to={`/podcast/${encodeText(podcast.title)}`}
                        className="card-footer-link overflow-wrap"
                        title={podcast.title}
                      >
                        <span className="">
                          {decodeText(podcast.title)}
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>
    );
  }
}
