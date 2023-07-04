import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import {  OrbitControls, Preload, SpotLight, useGLTF } from '@react-three/drei';


import CanvasLoader from '../Loader';

const Computers = ({isMobile}) => {
  const computer = useGLTF('../../../dist/desktop_pc/scene.gltf');
  return (
    <mesh>
      <hemisphereLight intensity={0.15} />
      <pointLight intensity={1}
      />
      <SpotLight 
      position={[-20,50,10]}
      angle={0.12}
      penumbra={1}
      intensity={1}
      castShadow
      shadow-mapSize={1024}
      />
      <primitive 
      object={computer.scene}
        scale={isMobile ? 0.7 : 0.75}
        position={isMobile ? [0,-3,-2.2]: [0, -3.25, -1.5]}
        rotation={[-0.01,-0.2,-0.1]}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile,setIsMobile] = useState(false)

  useEffect(() => {
    const mediaQuey = window.matchMedia('(max-width:500px)')

    setIsMobile(mediaQuey.matches)

    const handleMediaQueryChange = (e) => {
      setIsMobile(e.matches)
    }

    mediaQuey.addEventListener('change',handleMediaQueryChange)

    return () => {
      mediaQuey.removeEventListener('change',handleMediaQueryChange)
    }
  },[])
  return (
    <Canvas frameloop="demand" shadows camera={{ position: [20, 3, 5], fov: 25 }} gl={{ preserveDrawingBuffer: true }}>
      <Suspense fallback={<CanvasLoader/>}>
      <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile}/>
      </Suspense>
      <Preload all/>
    </Canvas>
  );
};

export default ComputersCanvas;
