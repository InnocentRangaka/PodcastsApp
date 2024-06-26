import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header/Header';
// import Footer from "./Footer"

import { PodcastsProvider } from '../components/PodcastsContext';
import AudioPlaceholder from '../components/Audio/AudioPlaceholder'

export default function Layout() {
  return (
    <PodcastsProvider>
      <AudioPlaceholder>
        <div className="site-wrapper">
          <Header />
          <main>
            <Outlet />
          </main>
          {/* <Footer /> */}
        </div>
      </AudioPlaceholder>
    </PodcastsProvider>
  );
}
