import { Canvas } from '@react-three/fiber';
import { OrbitControls, MeshDistortMaterial, SpotLight, Sphere } from '@react-three/drei';

const World = () => {
    return (
        <div className="h-screen w-screen bg-white">
            <Canvas camera={{ position: [0, 0, 4] }}>
                <ambientLight intensity={1} color="yellow" />
                <pointLight
                    position={[0, 2, 1]}
                    color="red"
                    intensity={10}
                    distance={5}
                />
                <mesh>
                    <sphereGeometry/>
                    <MeshDistortMaterial 
                        distort={0.3} 
                        speed={3}  
                        color="hotpink"
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