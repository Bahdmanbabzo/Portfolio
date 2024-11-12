import {
    Sphere, 
    useTexture,
    useCubeTexture, 
    MeshDistortMaterial, 
} from '@react-three/drei';
import * as THREE from 'three'; 
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react'; 
import { motion } from 'framer-motion'

export default function MainOrb({material}){
    const ref= useRef(); 
    useFrame(({clock, mouse}) => {
        ref.current.rotation.z = clock.getElapsedTime(); 
        ref.current.rotation.y = THREE.MathUtils.lerp(
            ref.current.rotation.y, 
            mouse.x * Math.PI, 
            0.1
        ); 
        ref.current.rotation.x = THREE.MathUtils.lerp(
            ref.current.rotation.x, 
            mouse.y * Math.PI,
            0.1
        )

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