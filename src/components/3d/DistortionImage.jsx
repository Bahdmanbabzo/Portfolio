import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import PropTypes from 'prop-types'
import * as THREE from 'three'

const vertexShader = `
  uniform float uTime;
  uniform float uDistortion;

  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec3 pos = position;

    float wave = sin(pos.x * 6.0 + uTime * 4.0) * cos(pos.y * 5.0 + uTime * 3.0) * 0.12;
    pos.z += wave * uDistortion;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform float uDistortion;

  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    vec2 center = vec2(0.5);
    vec2 dir = uv - center;
    float dist = length(dir);

    float radial = sin(dist * 30.0 - uTime * 5.0) * 0.03;
    vec2 distortedUv = uv + normalize(dir + 0.001) * radial * uDistortion;

    float waveX = sin(uv.y * 25.0 + uTime * 4.0) * 0.02 * uDistortion;
    float waveY = cos(uv.x * 25.0 + uTime * 3.5) * 0.02 * uDistortion;
    distortedUv += vec2(waveX, waveY);

    float r = texture2D(uTexture, distortedUv + vec2(0.015 * uDistortion, 0.0)).r;
    float g = texture2D(uTexture, distortedUv).g;
    float b = texture2D(uTexture, distortedUv - vec2(0.015 * uDistortion, 0.0)).b;

    gl_FragColor = vec4(r, g, b, 1.0);
  }
`

export default function DistortionImage({ imageUrl, exiting, onExitComplete }) {
  const meshRef = useRef()
  const animatingRef = useRef(false)
  const elapsedRef = useRef(0)

  const texture = useTexture(imageUrl)
  const materialRef = useRef(null)

  if (!materialRef.current) {
    materialRef.current = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uDistortion: { value: 0 },
        uTexture: { value: texture },
      },
      vertexShader,
      fragmentShader,
    })
  }

  const material = materialRef.current

  useEffect(() => {
    material.uniforms.uTexture.value = texture
  }, [texture, material])

  useEffect(() => {
    animatingRef.current = true
    elapsedRef.current = 0
    if (exiting) {
      material.uniforms.uDistortion.value = 0
    } else {
      material.uniforms.uDistortion.value = 1
    }
  }, [exiting])

  useFrame((_, delta) => {
    material.uniforms.uTime.value += delta

    if (animatingRef.current) {
      elapsedRef.current += delta
      const progress = Math.min(elapsedRef.current / 2, 1)
      const eased = 1 - Math.pow(1 - progress, 3)

      if (exiting) {
        material.uniforms.uDistortion.value = eased
      } else {
        material.uniforms.uDistortion.value = 1 - eased
      }

      if (progress >= 1) {
        animatingRef.current = false
        if (exiting) {
          material.uniforms.uDistortion.value = 1
          onExitComplete?.()
        } else {
          material.uniforms.uDistortion.value = 0
        }
      }
    }
  })

  const aspect = texture?.image
    ? texture.image.width / texture.image.height
    : 1
  const height = 2
  const width = aspect * height

  return (
    <mesh ref={meshRef} material={material} position={[-1.2, 0.3, 1.5]}>
      <planeGeometry args={[width, height]} />
    </mesh>
  )
}

DistortionImage.propTypes = {
  imageUrl: PropTypes.string,
  exiting: PropTypes.bool,
  onExitComplete: PropTypes.func,
}
