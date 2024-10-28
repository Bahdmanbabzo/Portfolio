import AllOrbs from "./AllOrbs";
import { useState } from "react";
import { MeshDistortMaterial } from "@react-three/drei";

export default function OrbsScene(){
    const [material, setMaterial] = useState(); 

    return (
        <>
            <MeshDistortMaterial
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