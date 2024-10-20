import { useEffect} from "react";
import { stagger, useAnimate,motion } from "framer-motion";

function Loader() {
  const words = ['The', 'effect', 'of','art']
  const [scope, animate] = useAnimate();  
  const sequence = [
    ['p', {opacity:[0,1]}], 
    ['p', {x:[0,-100]}, {at: "+0.5"}],
    ['div',{opacity:[0,1]}, {duration: 0.5}],
  ]
  useEffect(() => {
      animate(sequence)
  });
  return (
    <div ref={scope} className="h-screen w-screen flex items-center justify-center relative">
      <p className="absolute ">WARNING</p>
      <div className="absolute ml-5">This is a demo</div>
    </div>
  )
}

export default Loader
