import { useState } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { MeshDistortMaterial, Stage, MeshPortalMaterial  } from '@react-three/drei'

const AnimatedMeshDistortMaterial = animated(MeshDistortMaterial)

export default function Orb() {
  const [clicked, setClicked] = useState(false)

  const springs = useSpring({
    color: clicked ? '#569AFF' : '#ff6d6d',
  })

  const handleClick = () => setClicked(s => !s)

  return (
   
    <mesh scale={0.5} onClick={handleClick} castShadow position={[0,0,0]}>
      <planeGeometry/>
      <MeshPortalMaterial>
        <Stage adjustCamera intensity={0.5} shadows="contact" environment="city">
          <mesh scale={0.5}>
            <sphereGeometry args={[1, 64, 64]} />
            <AnimatedMeshDistortMaterial
              speed={2}
              distort={0.2}
              color={springs.color} />
          </mesh>
        </Stage>
      </MeshPortalMaterial>
    </mesh>
  )
}