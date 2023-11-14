import { Suspense, useState, useEffect, useRef} from 'react'
import { Canvas } from '@react-three/fiber'
import Loader from '../components/Loader'
import  {Bird, Island, Plane, Sky}  from '../models'
import Homeinfo from '../components/Homeinfo'
import sakura from '../assets/sakura.mp3'
import { soundoff, soundon } from '../assets/icons'

const Home = () => {
  const audioRef = useRef(new Audio(sakura))
  audioRef.current.volume = 0.5
  audioRef.current.loop = true
  const [isRotating, setIsRotating] = useState(false);
  const [currentstage, setCurrentstage] = useState(1)
  const [isPlayingMusic, setIsPlayingMusic] = useState(false)
  useEffect(()=>{
    if(isPlayingMusic){
      audioRef.current.play()
    }

    return()=>{
      audioRef.current.pause()
    }
  },[isPlayingMusic])
  const adjustIslandForScreenSize = ()=>{
    let screenScale = null;
    let screenPosition;
    let rotation = [0.1,4.7,0]

    if(window.innerWidth < 768){
      screenScale= [0.9,0.9,0.9];
      screenPosition = [0, -6.5, -43]
    }else{
      screenScale= [1,1,1];
      screenPosition = [0, -6.5, -43]
    }
    return[screenScale, screenPosition,rotation]
  }

  const adjustBiplaneForScreenSize  = ()=>{
    let screenScale,screenPosition;

    if(window.innerWidth < 768){
      screenScale= [1.5,1.5,1.5];
      screenPosition = [0, -1.5, 0];
    }else{
      screenScale= [3,3,3];
      screenPosition = [0, -4, -4];
    }
    return[screenScale, screenPosition]
  }

  const [biplaneScale, biplanePosition] = adjustBiplaneForScreenSize();
  const [islandScale, islandPosition] = adjustIslandForScreenSize();
    
  return (
    <section className='w-full h-screen relative'>
      <div className='absolute top-28 left-0 right-0 z-10 flex items-center justify-center'>
        {currentstage && <Homeinfo currentStage={currentstage}/>}
      </div>
      <></>
      <Canvas className={`w-full h-screen bg-transparent ${isRotating ? 'cursor-grabbing' : 'cursor-grab'}`} camera={{near:0.1,far:1000}}  >
        <Suspense fallback={<Loader/>}>
          <directionalLight position={[5,1,1]} intensity={2.5}/>
          <ambientLight intensity={0.5}/>
          <hemisphereLight skyColor='#b1e1ff' groundColor='#000000' intensity={0.5} />
          <Sky isRotating={isRotating} />
          <Bird/>
          <Island position={islandPosition} scale ={islandScale} rotation={[0.1, 4.7077, 0]} isRotating={isRotating} setIsRotating={setIsRotating} setCurrentStage={setCurrentstage} /> 
          <Plane scale={biplaneScale} position ={biplanePosition} isRotating={isRotating} rotation={[0,20,0]}/>
        </Suspense>
      </Canvas>
      <div className='absolute bottom-2 left-2'>
        <img src={isPlayingMusic ? soundon : soundoff} alt='sound' className='w-10 h-10 cursor-pointer object0-contain' onClick={()=>setIsPlayingMusic(!isPlayingMusic)}/>
      </div>
    </section>
  )
}

export default Home