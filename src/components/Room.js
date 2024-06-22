import { useLoader } from "@react-three/fiber"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { useBox } from '@react-three/cannon'
import { useRef } from "react"


const Room = () => {

  const [physicsRef, api] = useBox(() => ({
    mass: 50,
  
     args: [0.1,3,4.5],
     
    position: [-2.4, 1, -0.1],
    type: "static",
   
    userData: { type: "walls" },
    
  }),
  useRef()
);
const [physicsRef2, api2] = useBox(() => ({
  mass: 50,

   args: [0.1,3,4.5],
   rotation:[0,Math.PI/2,0],
  position: [0, 1.1, -2.2],
  type: "static",
 
  userData: { type: "walls" },
  
}),
useRef()
);


  const model = useLoader(GLTFLoader, "./room.glb")

  model.scene.scale.set(0.2, 0.2, 0.2)
  model.scene.traverse((object) => {
    object.castShadow = false
  })

  return (
    <object3D>
      <primitive object={model.scene} />
    </object3D>
  )
}
export default Room
