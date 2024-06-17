import { React } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function ListPodcasts({ title, podcastsObject }) {
  ListPodcasts.propTypes = {
    title: PropTypes.string.isRequired, // Title is required and must be a string
    podcastsObject: PropTypes.object.isRequired, // podcastsObject is required and must be an object
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
                  <img src={podcast.image} className="card-image" alt={podcast.title} />
                  <div className="card-footer">
                    <div className="card-footer-content">
                      <Link to="/" className="card-footer-link overflow-wrap" title={podcast.title}>
                        <span className="">
                          {podcast.title}
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

function getPopularPodcasts({ podcasts }) {
  const notEmptyObject = podcasts || []; // Use empty array for default
  let popularPodcasts = [];
  if (notEmptyObject) {
    const sortBySeasons = (a, b) => a.seasons - b.seasons;
    notEmptyObject.sort(sortBySeasons).reverse();

    const maxNumber = notEmptyObject.length >= 15 ? 15 : notEmptyObject.length;
    const top15Podcasts = notEmptyObject.slice(0, maxNumber);

    popularPodcasts = ListPodcasts({ title: 'Popular', podcastsObject: top15Podcasts });
  }

  return popularPodcasts;
}

export default getPopularPodcasts;
