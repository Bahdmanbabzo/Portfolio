import AllOrbs from "./AllOrbs";
import { useState } from "react";
import { MeshDistortMaterial, useCubeTexture } from "@react-three/drei";

export default function OrbsScene(){
    const [material, setMaterial] = useState(); 
    const envMap = useCubeTexture(['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png'], { path: 'envmaps/' })

    return (
        <>
            <MeshDistortMaterial
                envMap={envMap}
                ref={setMaterial}
                color={"#010101"}
                roughness={0.1}
                metalness={1}
                radius={1}
                distort={0.4}
            />
            {material && <AllOrbs material={material} />}
        </>
    )
}