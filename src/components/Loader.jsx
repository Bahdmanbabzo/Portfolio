import { useEffect, useRef} from "react";
import { stagger, useAnimate,motion } from "framer-motion";

function Loader() {
  const [scope, animate] = useAnimate();  
  const sequence = [
    ['.war', {opacity:[0,1]}], 
    ['.war', {x:[0,-100]}, {at: "+0.5"}],
    ['.foo',{opacity:[0,1]}, {duration: 0.5}],
    ['.clipper',{clipPath:['polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)','polygon(0 0, 0 0, 0 100%, 0% 100%)']},{duration:2}]
  ]
  useEffect(() => {
      animate(sequence)
  });
  return (
    <div ref={scope} className="h-screen w-screen">
      <div className="h-full w-full flex items-center justify-center relative bg-yellow-500 clipper">
        <p className="absolute war">WARNING</p>
        <div className="absolute ml-5 foo">This is a demo</div>
      </div>
  </div>
  )
}

export default Loader
