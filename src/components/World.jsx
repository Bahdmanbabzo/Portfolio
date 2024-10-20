import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const World = () => {
    return (
        <div className="h-screen w-screen">
            <Canvas>
                <ambientLight intensity={0.5} />
                <directionalLight position={[0, 10, 5]} intensity={1} />
                <mesh>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshStandardMaterial color="orange" />
                </mesh>
                <OrbitControls />
            </Canvas>
        </div>
    );
};

export default World;