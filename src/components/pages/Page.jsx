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
    const [heroScope, heroAnimate] = useAnimate();
    const isInView = useInView(scope, {amount:0.3})

    // Calculate the opacity based on the scroll position
    // If ref is not mounted, use a default height of 150
    const opacity = useTransform(scrollY, [0, ref.current?.offsetHeight / 2 || 150], [1, 0]);
    const sequence = [
      ['#main', {opacity:[0,1]}], 
      ['#main', {x:[0,-15]}, {at: "+0.5"}],
      ['.foo',{opacity:[0,1], x:[-15,-14]}, {duration: 0.5}]
    ]
    useEffect(() => {
      heroAnimate(sequence);
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
          <div className="text-white h-screen relative font-Epilogue grid place-items-center">
           <motion.div ref={heroScope} style={{opacity: opacity}}>
            <span id="main" className="text-6xl font-bold font-Ewert inline-block">BECKLEY</span><span className="text-sm foo inline-block">.PORTFOLIO</span>
           </motion.div>
          </div>
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