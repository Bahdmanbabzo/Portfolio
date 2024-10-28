import {
    Sphere, 
    useTexture,
    useCubeTexture, 
    MeshDistortMaterial, 
} from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react'; 

export default function MainOrb({material}){
    const ref= useRef(); 
    useFrame(({clock, mouse}) => {
        ref.current.rotation.z = clock.getElapsedTime(); 
        ref.current.rotation.y = THREE.MathUtils.lerp(
            ref.current.rotation.y, 
            mouse.x * Math.PI, 
            0.1
        ); 

    })
    return (
        <Sphere 
            args={[1,64,64]}
            ref={ref}
            material={material}
            position={[0,0,0]}
        />
    )
}