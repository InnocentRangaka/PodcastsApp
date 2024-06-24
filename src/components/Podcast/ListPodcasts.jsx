import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { encodeText, decodeText } from '../../utils/textUtils';

function ListPodcasts({ title, podcastsObject }) {

  const typeName = title ? title.toLowerCase() : '';
  const podcasts = podcastsObject || []; // Use empty array for default
  
  if (podcasts.length > 0) {
    return (
      <section key="listPodcastSection">
        <div key="sectionHeader" className="section-header">
          <h2 key="sectionHeaderH2">
            {(typeName && typeName.charAt(0).toUpperCase() + typeName.slice(1))}
            {' '}
            podcasts
          </h2>
        </div>
        <div key="sectionSlider" className="section-slider">
          {podcasts.map((podcast) => (
            <div key={podcast.id} className="section-slider-item">
              <div key={`sliderCard${podcast.id}`} className="slider-card">
                <div key={`sliderCard${podcast.id}CardLink`} className="card-link" />
                {podcast?.image && (
                <img
                  key={`podcast${podcast.id}image`}
                  src={podcast.image}
                  className="card-image"
                  alt={podcast.title}
                  loading="lazy"
                />
                )}

                <div key={`sliderCard${podcast.id}CardFooter`} className="card-footer">
                  <div key={`sliderCard${podcast.id}CardFooterContent`} className="card-footer-content">
                    <Link
                      key={`podcast${podcast.id}link`}
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
                      <span key={`sliderCard${podcast.id}CardFooterContentSpan`} className="">
                        {decodeText(podcast.title)}
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
  return null;
}

ListPodcasts.propTypes = {
  title: PropTypes.string.isRequired,
  podcastsObject: PropTypes.array.isRequired, // Changed from instanceOf(Object) to array
};

export default ListPodcasts;
