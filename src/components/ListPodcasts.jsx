import { React, memo } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// import { Img } from 'react-image';
import { getPopularPodcasts, 
  getNewPodcasts, getRecommendedPodcastsByDate,
 } from '../utils/podcastUtils';
 
function ListPodcasts({ title, podcastsObject }) {
  
  const typeName = title ? title.toLowerCase() : '';
  const podcasts = podcastsObject || []; // Use empty array for default
  
  if (podcasts) {
    return (
      <>
        {memo(() => getPopularPodcasts({ podcasts }))}
        {memo(() => getNewPodcasts({ podcasts }))}
        {memo(() => getRecommendedPodcastsByDate({ podcasts }))}
      </>
    );
  }
}

ListPodcasts.propTypes = {
  // Title is required and must be a string
  title: PropTypes.string.isRequired,
  // podcastsObject is required and must be an object
  podcastsObject: PropTypes.instanceOf(Object).isRequired,
};

export default ListPodcasts;
