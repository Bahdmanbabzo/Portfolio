import * as THREE from 'three'; 
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react'; 
import { motion } from 'framer-motion'
import { damp3 } from 'maath/easing'
export default function MainOrb({material}){
    const ref= useRef(); 
    useFrame(({clock, mouse, delta}) => {
        ref.current.rotation.z = clock.getElapsedTime(); 
        damp3(
            ref.current.rotation,
            [mouse.y * Math.PI, mouse.x * Math.PI, ref.current.rotation.z],
            0.1,
            delta
        );
        
    })
    return (
        <motion.mesh 
            whileHover={{scale: 0.5}}
            ref={ref}
            material={material}
            position={[0, 0, 0]}
        >
            <sphereGeometry args={[1, 64, 64]} />
        </motion.mesh>
    )
}