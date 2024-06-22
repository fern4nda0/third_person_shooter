import {create} from 'zustand';
import {Vector3} from "three";
export const useStore = create((set) => ({
  obstacle_position: new Vector3(0,0,0),
  isNear: false,
  time_to_shoot:0,
  setIsNear: (isNear) => set({ isNear }),
  set_obstacle_position: (obstacle_position) => set({ obstacle_position}),
  setTimeToShoot: (time_to_shoot) => set({ time_to_shoot })
}));