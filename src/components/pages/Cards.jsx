import { motion } from "framer-motion";

export default function Card ({ card }) {
    return (
      <div
        key={card.id}
        className="group relative h-[450px] w-[450px] overflow-hidden bg-neutral-200 rounded-xl"
      > 
        <div
          style={{
            backgroundImage: `url(${card.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"
        ></div>
        <motion.div 
          initial={{clipPath: "circle(9.1% at 87% 14%)"}}
          whileHover={{clipPath:"circle(70.6% at 50% 51%)",backdropFilter: "blur(10px)",  transition:{duration:0.5}}}
          id='card-overlay'
          className="absolute z-30 text-white h-full w-full bg-white/30"
        > lorem 50</motion.div>
      </div>
    );
  };