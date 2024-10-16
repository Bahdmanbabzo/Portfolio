import { useEffect} from "react";
import { stagger, useAnimate } from "framer-motion";

function Loader() {
  const words = ['The', 'effect', 'of','art']
  const [scope, animate] = useAnimate();  
  useEffect(() => {
      animate('div', {opacity:[0,1,0]}, {delay:stagger(0.5)})
  });
  return (
    <div ref={scope} id="loaderP" className="text-red-500 flex items-center justify-center relative"> 
      {words.map((word, i) => {
        i++
        return <div key={i} className="absolute opacity-0">{word}</div>
      })}
    </div>
  )
}

export default Loader
