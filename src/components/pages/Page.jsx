import { 
  motion, 
  useScroll, 
  useTransform, 
  useInView, 
  useAnimate, 
  stagger 
} from "framer-motion";
import { useEffect, useRef } from "react";
import HorizontalScroll from "./HorizontalScroll";

export default function Page() {
    const { scrollY } = useScroll();
    const ref = useRef();
    const [scope, animate] = useAnimate(); 
    const isInView = useInView(scope, {amount:0.3})

    // Calculate the opacity based on the scroll position
    // If ref is not mounted, use a default height of 150
    const opacity = useTransform(scrollY, [0, ref.current?.offsetHeight / 2 || 150], [1, 0]);

    useEffect(() => {
      if (isInView) {
        animate("p", {y:"0%"}, {delay: stagger(0.3), ease:"easeIn", type:"spring", stiffness:50})
      }else { 
        animate("p", {y:"100%"}, {delay: stagger(0.3, {from: "last"}), ease:"easeOut"})
      }
    }, [isInView])

    return (
        <div className="relative z-40 px-6 pointer-events-none">
          <nav className="sticky top-0 z-50 bg-black text-white p-4 font-Bebas">
            <ul className="flex justify-between">
              <li><a href="#section1"> BAHDMANBABZ0</a></li>
              <li><a href="#section2">CREATIVE DEVELOPER</a></li>
              <li><a href="#section3">CLINICIAN</a></li>
            </ul>
          </nav>
          <motion.div className="flex h-screen px-10 relative font-Epilogue"  style={{opacity: opacity}}>
            <p className="absolute left-0 top-3 font-light text-6xl text-white">LOREM IPSUM</p>
            <p className="absolute left-1/2 top-1/2 text-white font-light text-6xl"> DOLOR</p>
            <p className="absolute bottom-2 right-4 text-white font-light text-6xl"> SIT AMET</p>  
          </motion.div>
          <HorizontalScroll />
          <div className=" text-white font-light text-6xl h-screen font-Epilogue" ref={scope}>
            <div className="overflow-hidden">
              <motion.p initial={{y:"100%"}}>Lorem ipsum dolor</motion.p>
            </div>
            <div className=" overflow-hidden">
              <motion.p initial={{y:"100%"}}>Lorem i dont understand</motion.p>
            </div>
            <div className=" overflow-hidden">
              <motion.p initial={{y:"100%"}}>lorem is the name</motion.p>
            </div>
          </div>
       </div>
    );
}