import { useAnimations } from "@react-three/drei";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { useMemo, useRef, useState, Suspense ,useEffect } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Vec3 } from "cannon-es";
import { useInputs } from "../hooks/inputs";
import useFollowCam from "../hooks/followCam";
import { useMouseInput } from "@/hooks/mouse";
import { useCompoundBody,useContactMaterial } from '@react-three/cannon'
import * as THREE from "three";
import { useStore } from '@/hooks/store';
import { Bullet } from "./Bullet"; 

const MyPlayer = () => {
  const playerGrounded = useRef(false);
 
  const isNear = useStore(state => state.isNear); 
  const setIsNear = useStore(state => state.setIsNear); 
  const obstacle_position =useStore(state=> state.obstacle_position)
  const time_to_shoot =useStore(state=> state.time_to_shoot)
  const setTimeToShoot =useStore(state=> state.setTimeToShoot)
  const [bullets, setBullets] = useState([]);
  const bulletLifetime = 3000;
  const { scene ,camera } = useThree();
  const controlRef = useRef();
  const group = useRef(null);
  const { yaw } = useFollowCam(group, [0, 1, 1.5]);
  const velocity = useMemo(() => new THREE.Vector3(), []);
  const inputVelocity = useMemo(() => new THREE.Vector3(), []);
  const euler = useMemo(() => new THREE.Euler(), []);
  const quat = useMemo(() => new THREE.Quaternion(), []);
  const targetQuaternion = useMemo(() => new THREE.Quaternion(), []);
  const worldPosition = useMemo(() => new THREE.Vector3(), []);
  const raycasterOffset = useMemo(() => new THREE.Vector3(), []);
  const contactNormal = useMemo(() => new Vec3(0, 0, 0), []);
  const down = useMemo(() => new Vec3(0, -1, 0), []);
  const rotationMatrix = useMemo(() => new THREE.Matrix4(), []);
  const idleTimer = useRef(0); 
  // const { groundObjects } = useStore((state) => state)




  useContactMaterial('ground', 'slippery', {
    friction: 0,
    restitution: 0.01,
    contactEquationStiffness: 1e8,
    contactEquationRelaxation: 3
  })

  const [physicsRef, api] = useCompoundBody(() => ({
    mass: 1,
    shapes: [
      { args: [0.15], position: [0, 0.15, 0], type: 'Sphere' },
      { args: [0.15], position: [0, 0.45, 0], type: 'Sphere' },
      { args: [0.08], position: [0, 0.7, 0], type: 'Sphere' }
    ],
    position: [0, 0, 0],
    type: "Dynamic",
    material: 'slippery',
    linearDamping: 0,
    userData: { type: "player", action: "idle" },
    onCollide: (e) => handleCollision(e),
  }),
  useRef()
);

  let action = "";
  const {
    forward,
    backward,
    left,
    right,    
    jump,
    screw,
    run,

  } = useInputs();

  const press_mouse= useMouseInput();
  const mouse_Ref = useRef(press_mouse);
  useEffect(() => {
    mouse_Ref.current = press_mouse;
  }, [press_mouse]);



  const model = useLoader(GLTFLoader, "./man.glb");
  const gun = useLoader(GLTFLoader, "./gun.glb");

  const { actions } = useAnimations(model.animations, model.scene);


  model.scene.scale.set(0.5, 0.5, 0.5);
  model.scene.rotation.y = Math.PI;
  model.scene.traverse((object) => {
    {
      object.castShadow = true;
    }
  });
  
  model.scene.traverse((child) => {
    const name = child.name.trim(); 
    // console.log(name)
    if ( child.type == 'SkinnedMesh' ) {
      // if (child.name.trim() =="man__Beard003"){
      //   child.visible = false
      // }
      child.frustumCulled = false;
    }
});

  const currentAction = useRef("");
  
 
 

  const handleCollision = (e) => {
    const collidedObjectType = e.body.userData.type;
    const collidedObjectAction = e.body.userData?.action;
    const action = "jump";
    if (collidedObjectType == "obstacle") {
      // play(action);
    } else if (collidedObjectType == "npc") {
      if (collidedObjectAction == "kick") {
        play(action);
      }
    } else {
      return;
    }
  };

  function play(emote) {
    if (currentAction.current != emote) {
      const nextActionPlay = actions[emote];
      const current = actions[currentAction.current];
      current?.fadeOut(0.2);
      nextActionPlay?.reset().fadeIn(0.2).play();
      currentAction.current = emote;
    }
  }



  useFrame(({ raycaster }, delta) => {

    if (!group.current) return;
    const handBone = model.scene.getObjectByName('mixamorigRightHand');
  if (handBone &&mouse_Ref.current.right_mouse) {
    const degree = -115
    const degree2 = -75
    const degree3 = 70
   
    gun.scene.position.set(-0.09,0.2, 0); 
    gun.scene.rotation.set(degree *(Math.PI / 180), degree3 *(Math.PI / 180),degree2 *(Math.PI / 180)); 
    
    handBone.add(gun.scene);
  }
  if(mouse_Ref.current.right_mouse ==false){
    handBone.remove(gun.scene)
  }

   
    api.angularFactor.set(0, 0, 0);
    physicsRef.current.getWorldPosition(worldPosition);

    playerGrounded.current = true;
    raycasterOffset.copy(worldPosition);
    raycasterOffset.y += 0.01;
    raycaster.set(raycasterOffset, down);
    

    api.linearDamping.set(0.9999999)

    const d = worldPosition.distanceTo(group.current.position);

    rotationMatrix.lookAt(
      worldPosition,
      group.current.position,
      group.current.up
    );
    targetQuaternion.setFromRotationMatrix(rotationMatrix);
    if (d > 0.0001 && !group.current.quaternion.equals(targetQuaternion)) {
      targetQuaternion.z = 0;
      targetQuaternion.x = 0;
      targetQuaternion.normalize();
      group.current.quaternion.rotateTowards(targetQuaternion, delta * 20);
    }
 
  
   //////////////////////////////////////// 
 const origin = new THREE.Vector3(0, 0, 0); 
// console.log(obstacle_position.x)
 const boxPosition =  new THREE.Vector3(obstacle_position.x, obstacle_position.y, obstacle_position.z)
 const distance = worldPosition.distanceTo(origin);
 const distancetoBox = worldPosition.distanceTo(boxPosition);
 
 const maxDistance = 20; 
 
 if (distance > maxDistance) {
     
     const direction = worldPosition.clone().sub(origin).normalize();
   
     const clampedPosition = direction.multiplyScalar(maxDistance);
     physicsRef.current.position.copy(clampedPosition);
     group.current.position.copy(clampedPosition);
     api.position.copy(clampedPosition)
 }
////////////////////

 if (distancetoBox <= 1.4 && !isNear) {
  setIsNear(true);
  
 
} else if (distancetoBox > 1.4 && isNear) {
  setIsNear(false);
  
}

//////////////////
//Shooting 
const playerDirection = new THREE.Vector3(0, 0, 0); 
camera.getWorldDirection(playerDirection);
const bulletDirection = playerDirection.clone().multiplyScalar(20);
   const bulletPosition = group.current.position
      .clone()
      .add(playerDirection.clone().multiplyScalar(1.2));
      

      bulletPosition.y += 1; 

   
 //////////////
const s = scene.children
const plane = s.find(child => 
  child.type == "GridHelper"
);
const intersects = raycaster.intersectObjects([plane], true);


      if (intersects.length > 0) {
        const distance = intersects[0].distance;
     
        if (distance > 0.3) {
          
          api.applyImpulse([0, -9,0], [0, 0, 0]); 
        }}



    if(document.pointerLockElement){
    if (forward || left || right || backward) {
        inputVelocity.set(0, 0, 0)
        if(forward) {
          inputVelocity.z = -1
        }
        if(backward) {
          inputVelocity.z = 1
        }
        if(left) {
          inputVelocity.x = -1
        }
        if(right) {
          inputVelocity.x = 1
        }
      
      physicsRef.current.userData.action = "walking";
      action = "walking";
      
      if (run) {
        physicsRef.current.userData.action = "run";
        action = "run";
      } else if (jump) {
        if(isNear){
          action = "jump";
        }
        else {
          action ="runjump"
        }
        
      } 
      else if (screw){
        if(isNear){
          action ="screw"
        }
      }
    } else if (jump) {
      action = "littlejump";
    } 

    else {
      physicsRef.current.userData.action = "idle";
      
      if(idleTimer.current <=20){
        action ="idle"
        idleTimer.current += delta;
      }
      if(idleTimer.current > 20)
{action = "idle2";
  idleTimer.current += delta;
}      
if(idleTimer.current > 28){
    idleTimer.current = 0;
}
    
    }
    if(mouse_Ref.current.right_mouse){
      
      action ="draw"
    }
    if(mouse_Ref.current.left_mouse && mouse_Ref.current.right_mouse){
      action="fire"
      const lookTarget = group.current.position.clone().add(playerDirection.clone().multiplyScalar(10));
      group.current.lookAt(lookTarget);
      const now = Date.now();
      if (now >= time_to_shoot) {
        setTimeToShoot( now + 300);
        setBullets((bullets) => [
          ...bullets,
          {
            id: now,
            position: [bulletPosition.x, bulletPosition.y, bulletPosition.z],
            forward: [bulletDirection.x, bulletDirection.y, bulletDirection.z],
            expiresAt: now + bulletLifetime
          }
        ]);
      }
      setBullets((oldBullets) => oldBullets.filter(bullet => Date.now() < bullet.expiresAt));
    }
  }
  else {
    physicsRef.current.userData.action = "idle";
      action = "idle";
  }

    if (currentAction.current != action) {
      if(action =="draw"){
        actions[action].clampWhenFinished = true;
actions[action].loop = THREE.LoopOnce;
      }
      const nextActionPlay = actions[action];
      const current = actions[currentAction.current];
      current?.fadeOut(0.2);
      nextActionPlay?.reset().fadeIn(0.2).play();
      currentAction.current = action;
    }

  
    inputVelocity.setLength(delta * 40)
    
    if (
      currentAction.current == "walking" ||
      currentAction.current == "run" ||
      currentAction.current == "jump" ||
      currentAction.current == "runjump" ||
      currentAction.current == "screw"
    ) {
     if(currentAction.current =="walking"){
         inputVelocity.multiplyScalar(14 * delta *1) 
    }  
       else   if (currentAction.current == "run") {

      } 
      
       else   if (currentAction.current == "roll") {
        inputVelocity.multiplyScalar(10 * delta *1) 
      } 
      
      else if (currentAction.current == "jump") {
        inputVelocity.y = 0.3;
        // inputVelocity.z = -0.5;

      } else if (currentAction.current == "screw") {
        inputVelocity.y = 0.3;
        // inputVelocity.z = -0.5;
       
      }else if (currentAction.current == "runjump") {
        inputVelocity.y = 0.2;
    
      } else if (currentAction.current == "kick") {
       
      } else if (currentAction.current == "back") {
       
      } else {
      }
    
      euler.y = yaw.rotation.y;
      quat.setFromEuler(euler);
      inputVelocity.applyQuaternion(quat);
      velocity.set(inputVelocity.x, inputVelocity.y, inputVelocity.z);
      api.applyImpulse([velocity.x, velocity.y, velocity.z], [0, 0, 0]);
      group.current.position.lerp(worldPosition, 0.3);



      
    }
  });
  return (
    <>
      <group ref={group}>
        <Suspense fallback={null}>
          <primitive object={model.scene}  />
        </Suspense>
      </group>
      {bullets.map((bullet) => {
        return (
          <Bullet
            key={bullet.id}
            velocity={bullet.forward}
            position={bullet.position}
          />
        );
      })}
    </>
  );
};
export default MyPlayer;
