import { useState } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { MeshDistortMaterial, Stage } from '@react-three/drei'

const AnimatedMeshDistortMaterial = animated(MeshDistortMaterial)

export default function Orb() {
  const [clicked, setClicked] = useState(false)

  const springs = useSpring({
    color: clicked ? '#569AFF' : '#ff6d6d',
  })

  const handleClick = () => setClicked(s => !s)

  return (
    <Stage adjustCamera intensity={0.5} shadows="contact" environment="city">
    <mesh onClick={handleClick} castShadow>
      <sphereGeometry args={[1.5, 64, 32]} />
      <AnimatedMeshDistortMaterial
        speed={2}
        distort={0.2}
        color={springs.color} />
    </mesh>
    </Stage>
  )
}