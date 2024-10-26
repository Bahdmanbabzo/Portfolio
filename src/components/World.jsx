import { Canvas } from '@react-three/fiber';
import { OrbitControls} from '@react-three/drei';
import Orb from './Orb';

const World = () => {
    return (
        <div className="h-screen w-screen bg-white">
            <Canvas shadows camera={{ position: [0, 0, 1] }}>
                <ambientLight intensity={100} color="yellow" />
                <Orb />
                <OrbitControls />
            </Canvas>
        </div>
    );
};

export default World;