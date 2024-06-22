"use client"
import { Canvas } from "@react-three/fiber"
import { Physics } from "@react-three/cannon"
import { Stats } from "@react-three/drei"
import { Suspense, useState,useEffect } from "react"
import { Sky } from "@react-three/drei"
import MyPlayer from "@/components/MyPlayer"
import Ground from "@/components/Land"
import Light from "@/components/Light"
import CrossHair from "@/components/CrossHair"
import Obstacle from "@/components/Obstacle"
import Sofa from "@/components/Sofa"
import Lamp from "@/components/Lamp"
import Pillow from "@/components/Pillow"
import Ocean from "@/components/Water"
import Room from "@/components/Room"
import { useStore } from '@/hooks/store';
import { Debug } from '@react-three/cannon'
import Pics from "@/components/Pics"


const Home = () => {
  const testing = true
  const isNear = useStore(state => state.isNear); 


  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function mobileCheck() {
      if (typeof window !== 'undefined') {
        
        return /android|bb\d+|meego/.test(navigator.userAgent.toLowerCase()) ||
               /iphone|ipad|ipod|blackberry|iemobile|opera mini/.test(navigator.userAgent.toLowerCase());
      }
      return false;
    }
    setIsMobile(mobileCheck());
  }, []);

  if (isMobile) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
      <p className="text-white font-mono text-lg">
        Please use a desktop computer :(
      </p>
    </div>
    );
  }
  else {

    return (
      <div className="container">
        <Canvas
          style={{ width: "100vw", height: "100vh" }}
          shadows
          camera={{ position: [0, 0, 0] }}
          onPointerDown={(e) => e.target.requestPointerLock()}
        >
          <Stats />
          {/* {testing ? <axesHelper /> : null} */}
          {testing ? <gridHelper args={[40, 20]}  /> : null}
  
          <Suspense fallback={null}>
           
            
            <Sky
              distance={450000}
              sunPosition={[5, 1, 2]}
              inclination={0}
              azimuth={0.25}
            />
         
            <Physics
              debug
              gravity={[0, -9, 0]}
              tolerance={0}
              iterations={50}
              broadphase={"SAP"}
            >
               {/* <Debug> */}
           <MyPlayer/>
           <Light/>
           <Sofa/>
           <Pillow/>
           <Pics/>
           
           <Ocean/>
           <Obstacle/>
           <Room/>
        <Lamp/>
           <Ground/>
             {/* </Debug> */}
            </Physics>
          </Suspense>
        </Canvas>
  <CrossHair/>
  {isNear && (<div>
            <div className="fixed bottom-5 left-5  bg-opacity-40 p-2 ">
                <div
      className="relative z-10 flex w-full items-center overflow-hidden border border-slate-800 p-[4px]"
    >
               <div
        className="animate-rotate absolute inset-0 h-full w-full  bg-[conic-gradient(#0ea5e9_20deg,transparent_120deg)]"
      ></div>
      
              <span className="text-black">Space</span>
            </div>
            </div> 
            <div className="fixed bottom-5 left-24  bg-opacity-40 p-2 ">
                <div
      className="relative z-10 flex w-full items-center overflow-hidden border border-slate-800 p-[4px]"
    >
               <div
        className="animate-rotate absolute inset-0 h-full w-full  bg-[conic-gradient(#0ea5e9_20deg,transparent_120deg)]"
      ></div>
      
              <span className="text-black">V</span>
            </div>
            </div>   
            </div>
          )}
      </div>
    )
    
  }


}
export default Home