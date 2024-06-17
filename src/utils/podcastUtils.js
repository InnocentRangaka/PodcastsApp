import { React } from 'react';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ListPodcasts from './ListPodcasts';

const getPodcastListByLimit = (allPodcasts, limit) => {
  const maxNumber = allPodcasts.length >= limit ? limit : allPodcasts.length;
  return allPodcasts.slice(0, maxNumber);
};

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
