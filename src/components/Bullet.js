import { useSphere } from "@react-three/cannon";
import React from "react";

export const Bullet = (props) => {
  
  const [sphereRef] = useSphere(() => ({
    mass: 5,
    args: [0.02,0.02,0.02],
    ...props
  }));

  return (
    <mesh ref={sphereRef} castShadow>
      <sphereGeometry args={[0.02, 0.02, 0.02]} />
      <meshLambertMaterial color="grey" />
    </mesh>
  );
};
