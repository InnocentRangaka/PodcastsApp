import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { styled } from 'styled-components';
import { Navbar } from '../components';
import { Link } from 'react-router-dom';
import {
  setFavoritesSorting,
  setFavouritesDisplayedPodcasts,
} from '../utils/podcastsReducer';

const FavouritesContainer = styled.div`
  color: white;
`;
const EpisodeContainer = styled.div`
  background-color: #242424;
  margin: 1rem 0.5rem;
  padding: 0.8rem;
  border-radius: 0.25rem;
`;
const ImageDescriptionContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
`;
const Description = styled.p`
  font-size: 0.8rem;
  margin: 0.7rem 0;
`;
const Image = styled.img`
  width: 40%;
`;
const Favourite = ({ details, showNameId }) => {
  const {
    title,
    episode,
    file,
    image,
    description,
    currentSeason,
    showTitle,
    showId,
  } = details;

  return (
    <>
      <EpisodeContainer>
        <Link to={`/`}>
          <button>Go home</button>
        </Link>
        <h3>{showTitle}</h3>
        <h4>{`S:${currentSeason} EP${episode}: ${title}`}</h4>
        <ImageDescriptionContainer>
          <Image src={image} alt={title} />

          <Description>{description}</Description>
        </ImageDescriptionContainer>
        <audio controls>
          <source src={file} type="audio/mp3" />
        </audio>
      </EpisodeContainer>
    </>
  );
};
const Favourites = () => {
  const { favourites, favouritesSorting, favouritesDisplayPodcasts } =
    useSelector((state) => state.podcastsReducer);
  const favouritesArray = favourites.map((item) => {
    const parsedItemDetails = JSON.parse(item.episodeDetails);
    return parsedItemDetails;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setFavouritesDisplayedPodcasts(favouritesArray));
  }, []);

  const sortAlphabetically = (e) => {
    const value = e.target.value;
    const lowercase = favouritesArray.map((item) => {
      return { ...item, title: item.title.toLowerCase() };
    });

    let sortedLowercase = lowercase.sort((a, b) => {
      if (value === 'ZA') {
        dispatch(setFavoritesSorting('ZA'));
        return a.title > b.title ? -1 : 1;
      }
      if (value === 'AZ') {
        dispatch(setFavoritesSorting('AZ'));
        return a.title > b.title ? 1 : -1;
      }
      if (value === 'ascendingDate') {
        dispatch(setFavoritesSorting('ascendingDate'));
        return a.updated > b.updated ? 1 : -1;
      }
      if (value === 'decendingDate') {
        dispatch(setFavoritesSorting('decendingDate'));
        return a.updated > b.updated ? -1 : 1;
      }
    });
    if (value === 'unsorted') {
      dispatch(setFavoritesSorting('unsorted'));
      // sortedLowercase = allPodcasts;
      sortedLowercase = favouritesArray;
    }
    dispatch(setFavouritesDisplayedPodcasts(sortedLowercase));
    return sortedLowercase;
  };

  return (
    <>
      <FavouritesContainer>
        <h1>Favourites</h1>
        <select
          name="sorting"
          id="sorting"
          value={favouritesSorting}
          onChange={(e) => sortAlphabetically(e)}
        >
          <option value="unsorted"> -- unsorted --</option>
          <option value="AZ">a-z</option>
          <option value="ZA">z-a</option>
          <option value="decendingDate">newest-oldest</option>
          <option value="ascendingDate">oldest-newest</option>
        </select>
        <div>
          {favouritesDisplayPodcasts.map((item) => {
            // const parsedItemDetails = JSON.parse(item.episodeDetails);

            return (
              <Favourite
                key={item.id}
                // details={parsedItemDetails}
                details={item}
                showNameId={item.showId}
              >
                {/* {parsedItemDetails.description} */}
              </Favourite>
            );
          })}
        </div>
      </FavouritesContainer>
    </>
  );
};

export default Favourites;
