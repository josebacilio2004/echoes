"use client";

import React, { useEffect, useRef } from "react";
import YouTube from "react-youtube";

const YouTubePlayer = ({ videoId, isPlaying, onReady }) => {
  const playerRef = useRef(null);

  useEffect(() => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.playVideo();
      } else {
        playerRef.current.pauseVideo();
      }
    }
  }, [isPlaying]);

  const opts = {
    height: "0",
    width: "0",
    playerVars: {
      autoplay: 0,
      controls: 0,
      disablekb: 1,
      fs: 0,
      modestbranding: 1,
    },
  };

  const _onReady = (event) => {
    playerRef.current = event.target;
    if (onReady) onReady();
  };

  return (
    <div className="hidden">
      <YouTube videoId={videoId} opts={opts} onReady={_onReady} />
    </div>
  );
};

export default YouTubePlayer;
