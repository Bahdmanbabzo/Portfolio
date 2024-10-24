import { useState } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { MeshDistortMaterial } from '@react-three/drei'

const AnimatedMeshDistortMaterial = animated(MeshDistortMaterial)

export default function Orb() {
  const [clicked, setClicked] = useState(false)

  const springs = useSpring({
    color: clicked ? '#569AFF' : '#ff6d6d',
  })

  const handleClick = () => setClicked(s => !s)

  return (
    <mesh onClick={handleClick}>
      <sphereGeometry args={[1.5, 64, 32]} />
      <AnimatedMeshDistortMaterial
        speed={2}
        distort={0.2}
        color={springs.color} />
    </mesh>
  )
}