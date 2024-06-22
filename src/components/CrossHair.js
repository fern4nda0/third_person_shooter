import React, { useEffect, useState } from 'react';

const CrossHair = () => {
  const [pointerLockActive, setPointerLockActive] = useState(false);

  useEffect(() => {
    const onPointerLockChange = () => {
      setPointerLockActive(document.pointerLockElement !== null);
    };

    document.addEventListener('pointerlockchange', onPointerLockChange);
    document.addEventListener('pointerlockerror', () => {
      console.error('Pointer Lock Error');
    });

    return () => {
      document.removeEventListener('pointerlockchange', onPointerLockChange);
      document.removeEventListener('pointerlockerror', () => {
        console.error('Pointer Lock Error');
      });
    };
  }, []);

  return pointerLockActive ? (
    <div className="fixed top-1/2 left-1/2 w-2.5 h-2.5 transform -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-brown flex items-center justify-center z-1000">
      <div className="w-1 h-1 bg-gray rounded-full"></div>
    </div>
  ) : null;
};

export default CrossHair;
