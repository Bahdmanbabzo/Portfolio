import { Canvas, useFrame } from '@react-three/fiber';
import { Html, PerspectiveCamera } from '@react-three/drei';
import { Suspense, useRef, useState, useEffect } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import OrbsScene from './OrbsScene';
import DistortionImage from './DistortionImage';
import { usePicture } from '../../context/PictureContext';

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
    const { activeImageUrl } = usePicture();
    const [renderUrl, setRenderUrl] = useState(null)
    const [isExiting, setIsExiting] = useState(false)

    useEffect(() => {
        if (activeImageUrl) {
            setRenderUrl(activeImageUrl)
            setIsExiting(false)
        } else if (renderUrl) {
            setIsExiting(true)
        }
    }, [activeImageUrl])

    const handleExitComplete = () => {
        setRenderUrl(null)
        setIsExiting(false)
    }

    return (
        <div className="h-screen w-screen fixed top-0">
            <Canvas
                shadows
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
                    <OrbsScene />
                    {(renderUrl || isExiting) && (
                        <DistortionImage imageUrl={renderUrl} exiting={isExiting} onExitComplete={handleExitComplete} />
                    )}
                </Suspense>
            </Canvas>
        </div>
    );
};

export default World;