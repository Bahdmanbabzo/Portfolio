import { useRef } from 'react';
import { motion, useTransform, useScroll  } from 'framer-motion';
import Card from './Cards';

export default function HorizontalScroll () {
    const cards = [
        {
          url: "/Lapland,-Finland.jpg",
          title: "Title 1",
          id: 1,
          hex:"#8ECAE6"
        },
        {
          url: "/Las-Medulas,-Spain.jpg",
          title: "Title 2",
          id: 2,
          hex:"#606C38"
        },
        {
          url: "/Lofoten-islands-Norway.jpg",
          title: "Title 3",
          id: 3,
          hex:"#003566"
        },
        {
          url: "/Swiss-Alps-Switzerland.jpg",
          title: "Title 4",
          id: 4,
          hex:"#A2D2FF"
        },
        {
          url: "/Vatnajokull-Iceland.jpg",
          title: "Title 5",
          id: 5,
          hex:"#D90429"
        }
      ];
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
      target: targetRef,
    });
  
    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-100%"]);
  
    return (
      <section ref={targetRef} className="relative h-[300vh]">
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
  