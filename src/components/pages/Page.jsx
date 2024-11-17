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
        <div className="text-red-500 relative z-40 pt-14 px-6">
          <div className="flex h-48 items-center justify-center">
            
          </div>
          <HorizontalScroll />
          <div className="flex h-48 items-center justify-center">
            <span className="font-semibold uppercase text-neutral-500 h-screen w-screen">
              Scroll up
            </span>
          </div>
       </div>
    );
}