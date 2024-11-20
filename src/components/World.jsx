import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, PerspectiveCamera } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import Portal from './Portal';
import OrbsScene from './OrbsScene';

const CameraController = ({ scrollY }) => {
    const cameraRef = useRef();

    // Map scroll position to camera position
    const cameraZ = useTransform(scrollY, [0,1000], [5,2]);
    const cameraX = useTransform(scrollY, [0,1000], [0,-1]);

    useFrame(() => {
        if (cameraRef.current) {
            cameraRef.current.position.z = cameraZ.get();
            cameraRef.current.position.x = cameraX.get();
        }
    });

    return (
        <PerspectiveCamera position={[0,0,3]} ref={cameraRef} makeDefault />
    );
};

const World = () => {
    const { scrollY } = useScroll();

    return (
        <div className="h-screen w-screen fixed top-0">
            <Canvas
                shadows
                colorManagement
                gl={{
                    powerPreference: "high-performance",
                    alpha: false,
                    antialias: false,
                    stencil: false,
                    depth: false
                }}
            >
                <Suspense fallback={<Html>Loading...</Html>}>
                    <CameraController scrollY={scrollY} />
                    {/* <OrbitControls /> */}
                    {/* <Portal /> */}
                    <OrbsScene />
                </Suspense>
            </Canvas>
        </div>
    );
};

export default World;