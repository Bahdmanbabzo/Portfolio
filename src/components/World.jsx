import { Canvas } from '@react-three/fiber';
import { OrbitControls} from '@react-three/drei';
import Orb from './Orb';

const World = () => {
    return (
        <div className="h-screen w-screen">
            <Canvas 
            shadows 
            camera={{ position: [0, 0, 1] }}
            colorManagement
            gl={{
                powerPreference:"high-performance",
                alpha:false, 
                antialias:false,
                stencil:false,
                depth:false
            }}
            >
                <color attach="background" args={['#050505']} />
                <fog attach="fog" args={['#050505', 8, 40]} />
                <Orb />
                <OrbitControls />
            </Canvas>
        </div>
    );
};

export default World;