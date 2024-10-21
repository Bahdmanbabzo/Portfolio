import { Canvas } from '@react-three/fiber';
import { OrbitControls, MeshDistortMaterial, SpotLight } from '@react-three/drei';

const World = () => {
    return (
        <div className="h-screen w-screen bg-white">
            <Canvas>
                {/* <ambientLight intensity={1} color="white" /> */}
                <pointLight
                    position={[0, 2, 1]}
                    color="red"
                    intensity={10}
                    distance={5}
                />
                 <pointLight
                    position={[0, 2, 1]}
                    color="red"
                    intensity={10}
                    distance={5}
                />
                 <pointLight
                    position={[4, 2, 1]}
                    color="red"
                    intensity={10}
                    distance={5}
                />

                <mesh>
                    <sphereGeometry />
                    <MeshDistortMaterial 
                        distort={0.4} 
                        speed={3}  
                        color="white"
                        metalness={0} // Set metalness to 1 for high reflectivity
                        roughness={1} // Set roughness to 0 for a smooth surface
                    />
                </mesh>

                <OrbitControls />
            </Canvas>
        </div>
    );
};

export default World;