import { Canvas } from '@react-three/fiber';
import { OrbitControls} from '@react-three/drei';
import Orb from './Orb';

const World = () => {
    return (
        <div className="h-screen w-screen bg-white">
            <Canvas camera={{ position: [0, 0, 3] }}>
                <ambientLight intensity={0.5} />
                <Orb />
                <OrbitControls />
            </Canvas>
        </div>
    );
};

export default World;