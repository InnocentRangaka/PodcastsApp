import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header/Header';
// import Footer from "./Footer"

import { PodcastsProvider } from '../components/PodcastsContext';

export default function Layout() {
  return (
    <PodcastsProvider>
      <div className="site-wrapper">
        <Header />
        <main>
          <Outlet />
        </main>
        {/* <Footer /> */}
      </div>
    </PodcastsProvider>
  );
}
