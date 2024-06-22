
import { usePlane } from "@react-three/cannon"


const Ground = () => {
 
//   useHelper(  meshRef,BoxHelper,"grey" )

  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 0, 0],
    material: "ground",
    userData: {type: "plane"},
    args:[40,40,40]
  }))
 
  return (
    // ref={meshRef}

    <mesh
      receiveShadow={true}
      ref={ref}
      visible={true}
      scale={[40,40, 40]}
      rotation-x={Math.PI * -0.5}
    >
      <planeGeometry />

      {/* wireframe */}
      <meshPhongMaterial color="#00000" opacity={5} visible= {true} />
      {/* <meshPhongMaterial map={texture}  opacity={10} visible= {true} /> */}
    </mesh>
  )
}
export default Ground
