import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useRef } from "react";
import { useBox } from '@react-three/cannon';

const Lamp = () => {
 
  const [physicsRef, api] = useBox(() => ({
    mass: 10,
    args: [0.4, 1.5, 0.5],
    position: [-1, 2, -1.5],
    type: "Dynamic",
    userData: { type: "lamp" },
  }), useRef());

  const model = useLoader(GLTFLoader, "./lamp.glb");
  model.scene.scale.set(0.15, 0.15, 0.15);
  model.scene.position.set(-0.2,-0.6,0)
  model.scene.traverse((object) => {
    object.castShadow = false;
  });



  return (
    <group ref={physicsRef} >
      <primitive object={model.scene} />
    </group>
  );
}

export default Lamp;
