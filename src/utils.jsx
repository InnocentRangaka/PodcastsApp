import { React } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const getPodcastListByLimit = (allPodcasts, limit) => {
  const maxNumber = allPodcasts.length >= limit ? limit : allPodcasts.length;
  return allPodcasts.slice(0, maxNumber);
};

function decodeUrl(encodedString) {
  return decodeURIComponent(encodedString);
}

function ListPodcasts({ title, podcastsObject }) {
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
                  <img src={podcast.image} className="card-image" alt={podcast.title} loading="lazy" />
                  <div className="card-footer">
                    <div className="card-footer-content">
                      <Link
                        to={`/show/${podcast.title}`}
                        className="card-footer-link overflow-wrap"
                        title={podcast.title}
                      >
                        <span className="">
                          {decodeURIComponent(podcast.title)}
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

export const getPopularPodcasts = ({ podcasts }) => {
  const notEmptyObject = podcasts || []; // Use empty array for default
  let popularPodcasts = [];
  if (notEmptyObject) {
    const sortBySeasons = (a, b) => a.seasons - b.seasons;
    notEmptyObject.sort(sortBySeasons).reverse();

    const top15Podcasts = getPodcastListByLimit(notEmptyObject, 15);

    popularPodcasts = ListPodcasts({ title: 'Popular', podcastsObject: top15Podcasts });
  }

  return popularPodcasts;
};

export const getNewPodcasts = ({ podcasts }) => {
  const notEmptyObject = podcasts || []; // Use empty array for default
  let newPodcasts = [];
  if (notEmptyObject) {
    const sortBySeasons = (a, b) => new Date(a.updated) - new Date(b.updated);
    notEmptyObject.sort(sortBySeasons).reverse();

    const top15Podcasts = getPodcastListByLimit(notEmptyObject, 15);

    newPodcasts = ListPodcasts({ title: 'New', podcastsObject: top15Podcasts });
  }

  return newPodcasts;
};
