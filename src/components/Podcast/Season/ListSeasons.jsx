import { React } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// import { Img } from 'react-image';
import { encodeText, decodeText } from '../../../utils/textUtils';

export default function ListSeasons({ currentSeasons }) {
    ListSeasons.propTypes = {
    // ListSeasons is required and must be an object
    currentSeasons: PropTypes.instanceOf(Object).isRequired,
  };
  
  const seasons = currentSeasons || []; // Use empty array for default

  function getSpan(text, number){
    return number && `<span>${text} ${number}</span>`;
  }
  
    return (
        <div className='show-list-container'>
                
            <div className="show-list-header">
            <h4>
                {/* {(typeName && typeName.charAt(0).toUpperCase() + typeName.slice(1))}
                {' '} */}
                Seasons
            </h4>
            </div>
            
            <div className='show-list'>
            <div className='show-list-content'>
            {seasons && seasons.map((season) => (
                <div key={season.id}
                className='show-list-item padding-0'>
                    <div className='show-list-item-left'>
                        <div className='show-list-item-index'>
                        {/* <div className='show-list-item-thumbnail-overlay'>
                            sdsd
                        </div> */}
                        <div className='show-list-item-index-content'>
                            <div className='show-list-item-play-button-container'>
                            <div className='show-list-item-play-button'>
                                <div className='show-list-item-play-button-icon'>
                                <div className='show-list-item-play-button'>
                                    {season.season}
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className='show-list-item-center'>
                        <div className='show-list-item-title'>
                        <Link
                        className='show-list-item-link'
                        spellCheck="false"
                        >{season.title}</Link>
                        </div>
                        <div className='show-list-item-text'>
                        {season?.episodes?.length && (<span>Season {season.season}</span>)}
                        {season?.episodes?.length && (<span>{season.episodes.length} Episodes</span>)}

                        </div>
                    </div>
                </div>
 
            ))}
            </div>
            </div>
        </div>
    );
}
