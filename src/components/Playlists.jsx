import React from 'react';
import { useScrollContext } from '../context/ScrollContext';

const Playlists = () => {
  const { sections } = useScrollContext();

  return (
    <section ref={sections.playlists} id="playlists" className="playlists-section">
      <h3>Playlists</h3>
      <p>Discover my curated playlists across styles like Disco, Funk, House, and more!</p>

      <div className="mixcloud-embed">
        <iframe width="100%" height="120" src="https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&hide_artwork=1&feed=%2FJauseJones%2Fdisco-3%2F" frameborder="0"></iframe>
      </div>

      <div class="mixcloud-embed">
        <iframe width="100%" height="120" src="https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&hide_artwork=1&feed=%2FJauseJones%2Fshake-it-malafakas%2F" frameborder="0"></iframe>
      </div>

      <div class="mixcloud-embed">
        <iframe width="100%" height="120" src="https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&hide_artwork=1&feed=%2FJauseJones%2Ffunkywankenoby%2F" frameborder="0"></iframe>
      </div>

      <div className="see-all-container">
        <a href="https://www.mixcloud.com/JauseJones/" target="_blank" rel="noopener noreferrer" className="see-all-button-play">
          SEE ALL
        </a>
      </div>
    </section>
  );
};

export default Playlists;
