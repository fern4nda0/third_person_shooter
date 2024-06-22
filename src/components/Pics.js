import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";


const Pics = () => {


  const model = useLoader(GLTFLoader, "./pics.glb");
  model.scene.scale.set(0.2,0.2,0.2);
//   model.scene.position.set()
  model.scene.traverse((object) => {
    object.castShadow = false;
  });



  return (
    <group  >
      <primitive object={model.scene} />
    </group>
  );
}

export default Pics;
