import React from 'react';
import VideoEmbed from './VideoEmbed';

const VideoPopup = ({ videoId, onClose }) => {
  return (
    <div className="video-popup">
      <VideoEmbed videoId={videoId} />
      <button className="close-button" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default VideoPopup;
