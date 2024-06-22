import { useEffect, useState } from "react"
import throttle from "lodash/throttle"
export const useInputs = () => {
  const [inputs, setInput] = useState({
    forward: false,
    backward: false,
    left: false,
    jump: false,
    screw:false,
    run: false,
    right: false,
   
  })

  const keys = {
    KeyW: "forward",
    KeyS: "backward",
    KeyA: "left",
    KeyD: "right",
    Space: "jump",
    KeyV: "screw",
    ShiftLeft: "run",
  }
  const findKey = (key) => keys[key]
  const setThrottledInput = throttle(setInput, 100)
  useEffect(() => {
    const handleDown = (e) => {
      const action = findKey(e.code)
      if (action) {
        // Check if the action is valid
        setInput((m) => ({ ...m, [action]: true }))
      }
    }
    const handleUp = (e) => {
      const action = findKey(e.code)
      if (action) {
        // Check if the action is valid
        setInput((m) => ({ ...m, [action]: false }))
      }
    }
    // //---------------------mobile
    // const handleTouchStart = (e) => {
    //   e.preventDefault()
    //   const actions = [ "littlejump"]
      
    //   setInput((m) => ({
    //     ...m,
    //     littlejump: actions ,
    //     forward: true,
    //   }))
    // }

    // const handleTouchEnd = (e) => {
    //   setInput((m) => ({ ...m, slide: false, forward: false }))
    // }
    // // Add touch event listeners
    // document.addEventListener("touchstart", handleTouchStart)
    // document.addEventListener("touchend", handleTouchEnd)

    //========================================================
    document.addEventListener("keydown", handleDown)
    document.addEventListener("keyup", handleUp)
    return () => {
      document.removeEventListener("keydown", handleDown)
      document.removeEventListener("keyup", handleUp)
      // document.removeEventListener("touchstart", handleTouchStart)
      // document.removeEventListener("touchend", handleTouchEnd)
    }
  }, [setThrottledInput])

  return inputs
}
