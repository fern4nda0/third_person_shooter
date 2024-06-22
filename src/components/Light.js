import React, { useRef } from "react"
// import { Canvas, useThree } from "@react-three/fiber"
// import { useHelper } from "@react-three/drei"
// import { DirectionalLightHelper, DirectionalLightShadow } from "three"
function Light() {
  // const lightRef = useRef()
  // useHelper(lightRef, DirectionalLightHelper, 5, "gray")
  return (
    <>
      <ambientLight intensity={0.8} />
      {/* 
      <directionalLight
        ref={lightRef}
        intensity={0.5}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        position={[30, 70, -200]}
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
        shadow-camera-near={0.5}
        shadow-camera-far={500}
      /> */}

      {/* ref={lightRef} */}
      <directionalLight
        // ref={lightRef}
        intensity={4}
        color={"#ffec69"}
        // color={"#fff6ab "}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-left={-20}
        position={[200, 70, 150]}
      >
   
      </directionalLight>
    </>
  )
}

export default Light
