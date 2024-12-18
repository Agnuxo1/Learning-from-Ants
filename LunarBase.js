import React, { useRef, useEffect } from 'react';

const LunarBase = ({ location }) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe && iframe.contentWindow) {
      // You would need to implement this function in the NASA viewer
      // to move the camera to the selected location
      iframe.contentWindow.postMessage({
        type: 'moveToLocation',
        location: location.name
      }, '*');
    }
  }, [location]);

  return (
    <div className="lunar-base-container">
      <iframe
        ref={iframeRef}
        src="https://solarsystem.nasa.gov/gltf_embed/2366/"
        title="NASA 3D Moon Model"
        width="100%"
        height="100%"
        frameBorder="0"
        style={{ border: 'none' }}
      />
    </div>
  );
};

export default LunarBase;

