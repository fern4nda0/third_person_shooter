import { useEffect, useState } from "react";

export const useMouseInput = () => {
  const [keysPressed, setPressedKeys] = useState({ left_mouse: false, right_mouse: false });

  useEffect(() => {
    const handleMouseDown = (e) => {
      if (e.button === 2) {
        setPressedKeys((current) => ({ ...current, right_mouse: true }));
      } else if (e.button === 0) {
        setPressedKeys((current) => ({ ...current, left_mouse: true }));
      }
    };
    const handleMouseUp = (e) => {
      if (e.button ===2) {
        setPressedKeys((current) => ({ ...current, right_mouse: false }));
      } else if (e.button === 0) {
        setPressedKeys((current) => ({ ...current, left_mouse: false }));
      }
    };

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return keysPressed;
};