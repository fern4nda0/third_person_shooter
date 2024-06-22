import { useFrame, useLoader } from "@react-three/fiber"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { useRef } from "react"
import { useCompoundBody } from '@react-three/cannon'

const Sofa = () => {

  const [physicsRef, api] = useCompoundBody(() => ({
    mass: 50,
    shapes: [
      { args: [3,0.3,1], position: [-0.4, 0, 1.5], type: 'Box' },
      { args: [1,0.3,3  ], position: [-1.5, , 0.2], type: 'Box' },
      
    ],
    position: [0, 0, 0],
    type: "static",
   
    userData: { type: "sofa" },
    
  }),
  useRef()
);

  const model = useLoader(GLTFLoader, "./sofa.glb")


  
  model.scene.scale.set(0.2, 0.2, 0.2)
  model.scene.traverse((object) => {
    object.castShadow = false
  })

  
  return (
    <object3D
      ref={physicsRef}
      position={[0, 0, 5]}
      rotation={[0, 0, 0]}
    >
     
      <primitive object={model.scene} />
    </object3D>
  )
}
export default Sofa
