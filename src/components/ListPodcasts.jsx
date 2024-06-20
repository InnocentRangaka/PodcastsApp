import { React, memo } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// import { Img } from 'react-image';
import { encodeText, decodeText } from '../utils/textUtils';
import { getPopularPodcasts, 
  getNewPodcasts, getRecommendedPodcastsByDate,
  sortAlphabetically, sortAlphabeticallyReversed,
  sortByDate, sortByLatestRelease
 } from '../utils/podcastUtils';
 
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
      <>
        {getPopularPodcasts({ podcasts })}
        {getNewPodcasts({ podcasts })}
        {getRecommendedPodcastsByDate({ podcasts })}
      </>
    );
  }
}
