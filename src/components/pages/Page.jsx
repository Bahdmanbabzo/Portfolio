import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import HorizontalScroll from "./HorizontalScroll";

export default function Page() {
    const { scrollY } = useScroll();
    const ref = useRef();

    // Calculate the opacity based on the scroll position
    // If ref is not mounted, use a default height of 150
    const opacity = useTransform(scrollY, [0, ref.current?.offsetHeight / 2 || 150], [1, 0]);

    return (
        <div className="relative z-40 px-6">
          <motion.div className="flex h-screen px-10 relative "  style={{opacity: opacity}}>
            <p className="absolute left-0 top-3 font-light text-6xl text-white">LOREM IPSUM</p>
            <p className="absolute left-1/2 top-1/2 text-white font-light text-6xl"> DOLOR</p>
            <p className="absolute bottom-2 right-4 text-white font-light text-6xl"> SIT AMET</p>  
          </motion.div>
          <HorizontalScroll />
          <div className="flex h-48 items-center justify-center">
            <span className="font-semibold uppercase text-neutral-500 h-screen w-screen">
              Scroll up
            </span>
          </div>
       </div>
    );
}