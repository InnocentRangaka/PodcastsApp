// import { useState } from 'react';

export async function fetchPodcasts() {
  const response = await fetch('https://podcast-api.netlify.app/');
  if (!response.ok) {
    throw {
      message: 'Data fetching failed',
      statusText: response.status,
      status: 'HTTP error!',
    };
  }
  const data = await response.json();
  return data;
}
export async function fetchPodcast({ id }) {
  const response = await fetch(`https://podcast-api.netlify.app/id/${id}`);
  if (!response.ok) {
    throw {
      message: 'Data fetching failed',
      statusText: response.status,
      status: 'HTTP error!',
    };
  }
  const data = await response.json();

  console.log(data);

  return data;
}
