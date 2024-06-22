import React, { useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import { handleSortChange, getPopularPodcasts, 
  getNewPodcasts, getRecommendedPodcastsByDate } from '../../utils/podcastUtils';

const HomeDefaultView = ({ podcastsObject, sortBy = null, setSortedPodcasts, setSortBy }) => {
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
    <>
      {getPopularPodcasts({ podcasts })}
      {getNewPodcasts({ podcasts })}
      {getRecommendedPodcastsByDate({ podcasts })}
    </>
  );
}


HomeDefaultView.propTypes = {
  podcastsObject: PropTypes.array.isRequired,
  sortBy: PropTypes.string.isRequired,
  setSortedPodcasts: PropTypes.func.isRequired,
  setSortBy: PropTypes.func.isRequired,
};

export default HomeDefaultView;
