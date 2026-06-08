import { useRef, useState } from "react";
import { motion } from "framer-motion";
import OpenButton from "../OpenButton";

export default function Card ({ card }) {
    const videoRef = useRef(null);
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);

    return (
      <div
        key={card.id}
        className="group relative w-[85vw] h-[70vh] md:h-[450px] md:w-[450px] shrink-0 snap-center overflow-hidden bg-neutral-200 rounded-xl font-Epilogue"
        onMouseEnter={() => videoRef.current?.play()}
        onMouseLeave={() => {
          setIsOverlayOpen(false); // Close overlay when mouse leaves the card entirely
          if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
          }
        }}
      > 
        <video
          ref={videoRef}
          src={card.url}
          loop
          muted
          playsInline
          className="absolute inset-0 z-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />

        {/* Invisible Hitbox around the pulse dot that triggers the overlay */}
        <motion.div 
          initial={{ top: '10%' }}
          whileInView={{ top: '50%' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          className={`absolute z-20 flex items-center justify-center cursor-pointer transition-opacity duration-300 ${isOverlayOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          style={{
            left: '85%',
            transform: 'translate(-50%, -50%)',
            width: '48px',
            height: '48px',
          }}
          onMouseEnter={() => setIsOverlayOpen(true)}
          onClick={() => setIsOverlayOpen(true)} // Added for mobile tap support
        >
          {/* Pulsing inner dot */}
          <motion.div
            animate={{ scale: [1, 1.6, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-[16px] h-[16px] rounded-full"
            style={{ 
               backgroundColor: card.hex, 
               boxShadow: `0 0 16px 4px ${card.hex}` 
            }}
          />
        </motion.div>

        <motion.div 
        id='card-overlay'
        initial="rest"
        animate={isOverlayOpen ? "hover" : "rest"}
        variants={{
          rest: { 
            clipPath: "circle(0% at 90% 50%)",
            transition: { ease: [0.25, 1, 0.5, 1], duration: 0.55 }
          },
          hover: {
            clipPath: "circle(100% at 50% 50%)",
            backdropFilter: "blur(12px)",  
            transition: { ease: [0.25, 1, 0.5, 1], duration: 0.55 } // Snappier, professional easeOutQuart
          }
        }}
        className="absolute inset-0 z-30 flex flex-col justify-end p-4 md:p-6 bg-zinc-950/80 md:bg-zinc-950/60 border border-white/5 opacity-80 hover:opacity-100 transition-opacity duration-300"
      >
        {/* The Text Content Group (Hidden smoothly when unhovered to avoid clipping artifacts) */}
        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out text-left">
          <div 
            className="w-12 h-1 rounded-full mb-3" 
            style={{ backgroundColor: card.hex }} 
          />
          <h3 
            className="text-xl md:text-2xl font-bold tracking-tight mb-2 antialiased"
            style={{ color: card.hex }}
          >
            {card.title}
          </h3>
          <p className="text-sm md:text-base leading-relaxed text-zinc-300 font-normal antialiased max-w-sm">
            {card.description}
          </p>
          <OpenButton
            source={card.source}
            className="mt-4 px-4 py-2 text-sm font-semibold rounded-lg transition-colors duration-300"
            style={{ backgroundColor: card.hex, color: "#000" }}
          >
            VIEW PROJECT
          </OpenButton>
        </div>
      </motion.div>
      </div>
    );
  };