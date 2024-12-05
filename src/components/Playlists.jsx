import React from 'react';

const Playlists = () => {
  return (
    <section id="playlists" className="playlists-section">
      <h3>Playlists</h3>
      <p>Discover my curated playlists across styles like Disco, Funk, House, and more!</p>

      <div className="mixcloud-embed">
        <iframe width="100%" height="120" src="https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&hide_artwork=1&feed=%2FJauseJones%2Fdisco-3%2F" frameBorder="0"></iframe>
      </div>
      <div className="mixcloud-embed">
        <iframe width="100%" height="120" src="https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&hide_artwork=1&feed=%2FJauseJones%2Fshake-it-malafakas%2F" frameBorder="0"></iframe>
      </div>
      <div className="mixcloud-embed">
        <iframe width="100%" height="120" src="https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&hide_artwork=1&feed=%2FJauseJones%2Ffunkywankenoby%2F" frameBorder="0"></iframe>
      </div>

      <div className="see-all-container">
        <button className="see-all-button-playlist">SEE ALL</button>
      </div>
    </section>
  );
};

export default Playlists;

