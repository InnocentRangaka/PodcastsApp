import { useState } from 'react';

function setState({ type, value }) {
  const [allPodcasts, setAllPodcasts] = useState([]);

  if (type && type !== null && type !== undefined) {
    if (type === 'podcast' || type === 'podcasts') {
      setAllPodcasts(value);
    }
  }
}

export default async function fetchPosts() {
  const response = await fetch('https://podcast-api.netlify.app/');
  if (!response.ok) {
    throw {
      message: 'Data fetching failed',
      statusText: response.status,
      status: 'HTTP error!',
    };
  }
  const data = await response.json();
  // setState({ type: 'podcasts', value: data });
  return data;
}
