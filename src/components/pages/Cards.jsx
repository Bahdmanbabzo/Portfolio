import { motion } from "framer-motion";

export default function Card ({ card }) {
    return (
      <div
        key={card.id}
        className="group relative h-[450px] w-[450px] overflow-hidden bg-neutral-200 rounded-xl font-Epilogue"
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
          whileHover={{
            clipPath:"circle(70.6% at 50% 51%)",
            backdropFilter: "blur(10px)",  
            transition:{ease: "easeInOut", mass:10}
          }}
          id='card-overlay'
          className="absolute z-30 text-white h-full w-full bg-white/30  text-center text-lg flex items-center justify-center font-black"
          style={{
            color: card.hex,
          }}
        >
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque, molestias omnis sed at amet ad voluptatum distinctio quas unde harum.</p>
        </motion.div>
      </div>
    );
  };