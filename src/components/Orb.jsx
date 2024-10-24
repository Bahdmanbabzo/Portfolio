
import { MeshDistortMaterial } from '@react-three/drei';

const Orb = () => {
    return (
        <>
            <ambientLight intensity={0.5} />
            <directionalLight position={[0, 10, 5]} intensity={1} />
            <mesh>
                <sphereGeometry args={[1, 32, 32]} />
                <MeshDistortMaterial 
                        distort={0.5} 
                        speed={3}
                        color='#DF7FFA'
                />
            </mesh>
        </>
    );
};

export default Orb;