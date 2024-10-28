import MainOrb from "./MainOrb";
import { useFrame } from "@react-three/fiber";
import { Icosahedron } from "@react-three/drei";
import { useState } from "react"

export default function AllOrbs({ material }){
    // Store orbs in state but never change them
    const [orbRefs] = useState(() => []); 
    //Initialise background orbs at different locations 
    const initialPositions = [
        [-4, 20, -12],
        [-10, 12, -4],
        [-11, -12, -23],
        [-16, -6, -10],
        [12, -2, -3],
        [13, 4, -12],
        [14, -2, -23],
        [8, 10, -20],
      ];
    useFrame(() => {
    // animate each sphere in the array
    orbRefs.forEach((el) => {
        el.position.y += 0.02;
        if (el.position.y > 19) el.position.y = -18;
        el.rotation.x += 0.06;
        el.rotation.y += 0.06;
        el.rotation.z += 0.02;
    });
    });
    return (
        <>
          <MainOrb material={material} />
          {initialPositions.map((pos, i) => (
            <Icosahedron
              args={[1, 4]}
              position={[pos[0], pos[1], pos[2]]}
              material={material}
              key={i}
              //Aligns to that index position once the component mounts
              ref={(ref) => (orbRefs[i] = ref)}
            />
          ))}
        </>
      );
}