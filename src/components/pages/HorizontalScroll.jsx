import { useRef } from 'react';
import { motion, useTransform, useScroll  } from 'framer-motion';
import Card from './Cards';
import { cards } from '../../helper';

export default function HorizontalScroll () {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
      target: targetRef,
    });
  
    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-100%"]);
  
    return (
      <section ref={targetRef} className="relative h-[300vh] pointer-events-auto">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <motion.div style={{ x }} className="flex gap-4">
            {cards.map((card) => {
              return <Card card={card} key={card.id} />;
            })}
          </motion.div>
        </div>
      </section>
    );
  };
  