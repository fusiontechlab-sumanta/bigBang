import React from 'react';
import ReactPlayer from 'react-player';

function HLSPlayer() {
  return (
    <div className='mb-96 z-50'>
    <video controls width="100%" height="auto">
      <source src="https://www.youtube.com/watch?v=v08qmr8m_-w&ab_channel=ImagineDragonsVEVO" type="video/*" />
      Your browser does not support the video tag.
    </video>
  </div>
  );
}

export default HLSPlayer;
