import { useLoader } from "@react-three/fiber"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"


const Pillow = () => {


  const model = useLoader(GLTFLoader, "./pillow.glb")


  
  model.scene.scale.set(0.2, 0.2, 0.2)
  model.scene.traverse((object) => {
    object.castShadow = false
  })

  return (
    <object3D
    >
      <primitive object={model.scene} />
    </object3D>
  )
}
export default Pillow
