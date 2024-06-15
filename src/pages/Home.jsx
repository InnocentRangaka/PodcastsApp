import { useState, useEffect } from 'react';
import fetchPosts from '../../api.js';
import reactLogo from '../assets/react.svg';
import viteLogo from '../assets/vite.svg';

export default function Home() {
  const [count, setCount] = useState(0);
  const [podcasts, setPodcasts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchPosts();

        if (data.length === 0) {
          throw {
            message: 'No available Podcasts yet',
            statusText: 'No Podcasts',
            status: 'Podcasts error!',
          };
        }

        setPodcasts(data);
      } catch (fetchError) {
        setError(fetchError);
      } finally {
        setLoading(false);
      }
    };

    getPosts();
  }, []);

  function ListPodcasts({ title, podcastsObject }) {
    const notEmptyObject = podcastsObject || {};
    if (notEmptyObject) {
      console.log(notEmptyObject);
      // return ()
    }
    // <section>
    //     <div className="section-header">
    //       <h2>Popular podcasts</h2>
    //     </div>
    //     <div className="section-slider">
    //       <div className="section-slider-item">
    //         <div className="slider-card">
    //           <div className="card-link" />
    //           <img className="card-image" alt="" />
    //           <div className="card-footer">
    //             <div className="card-footer-content">
    //               <a className="card-footer-link overflow-wrap" title="Hello">
    //                 <span className="">Hello</span>
    //               </a>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </section>
  }
  const popularPodcasts = {
    title: 'Popular podcasts',
    podcastsObject: podcasts,
  };
  ListPodcasts(popularPodcasts);

  // console.log(podcasts);
  // console.log(error);

  return (
    <>
      <section>
        <div className="section-header">
          <h2>Popular podcasts</h2>
        </div>
        <div className="section-slider">
          <div className="section-slider-item">
            <div className="slider-card">
              <div className="card-link" />
              <img className="card-image" alt="" />
              <div className="card-footer">
                <div className="card-footer-content">
                  <a className="card-footer-link overflow-wrap" title="Hello">
                    <span className="">Hello</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>
      <section>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </section>
      <section>
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is
            {' '}
            {count}
          </button>
          <p>
            Edit
            {' '}
            <code>src/App.jsx</code>
            {' '}
            and save to test HMR
          </p>
        </div>
      </section>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}
