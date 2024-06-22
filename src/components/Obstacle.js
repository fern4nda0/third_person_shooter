import { useBox } from '@react-three/cannon';
import {  useRef ,useEffect } from 'react'
import {Vector3} from "three";
import { useStore } from '@/hooks/store';

const Obstacle = () => {
  const set_obstacle_position = useStore(state => state.set_obstacle_position); 
    const [ref ,api] = useBox(() => ({
      mass: 10,  
      position: [5, 0, 0],
      userData: { type: 'obstacle' },
      args: [0.3, 0.1, 1],
    
    }),useRef());

    useEffect(() => {
     
      const unsubscribe = api.position.subscribe((position) => {
     
        set_obstacle_position(new Vector3(position[0],position[1],position[2]));
       
      });
  
    
      return () => unsubscribe();
    }, [api.position, set_obstacle_position]);


    return (
      <mesh ref={ref}>
        <boxGeometry args={[0.3, 1, 1]} />
        <meshStandardMaterial  color="#c9c8c3" />
      </mesh>
    );
  };

  export default Obstacle