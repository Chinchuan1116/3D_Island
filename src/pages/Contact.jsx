import React, { useState, useRef, Suspense } from 'react'
import emailjs from '@emailjs/browser'
import { Canvas } from '@react-three/fiber'
import { Fox } from '../models'
import Loader from '../components/Loader'
import useAlert from '../hook/useAlert'
import Alert from '../components/Alert'

const Contact = () => {
  const formRef = useRef(null)
  const [form, setForm] = useState({name:'',email:'',message:''})
  const [isLoading, setIsLoading] = useState(false)
  const [currentAnimation, setcurrentAnimation] = useState('idle')
  const {alert,showAlert,hideAlert } = useAlert()
  const handleFocus = ()=>{
    setcurrentAnimation('walk')
  }
  const handleBlur = (e)=>{
    setcurrentAnimation('idle')
  }
  const handleChange = (e)=>{
    setForm({...form,[e.target.name]:e.target.value})
    setcurrentAnimation('hit')
  }
  const handleSubmit = (e)=>{
    e.preventDefault()
    setIsLoading(true)
    setcurrentAnimation('hit')
    
    emailjs.send(
      import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
      {
        from_name: form.name,
        to_name: 'Chin Chuan',
        from_email:form.email,
        to_email:'chinchuan49@gmail.com',
        message: form.message
      },
      import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY,
      ).then(()=>{
        setIsLoading(false);
        showAlert({show:true,text:'Message Sent!',type:'success'})
        setTimeout(()=>{
          setcurrentAnimation('idle')        
        },[5000])
      }).catch((error)=>{
        showAlert({show:true,text:'Message fail to send!',type:'danger'})
        setIsLoading(false)
        console.log("ContactPage line 36", error)   
      }).finally(()=>{
        setForm({name:'',email:'',message:''})
      })
  }
  return (
    <section className='relative flex lg:flex-row flex-col max-container'>
      {alert.show && <Alert {...alert} />}
      {console.log(alert)}
      <div className='flex-1 min-w-[50%] flex flex-col'>
        <h1 className='head-text'>Get in touch</h1>
        <form className='w-full flex flex-col gap-7 mt-14' onSubmit={handleSubmit}>

          <label className='text-black-500 font-semibold'>Name
          <input type='text' name='name' className='input' placeholder='Your name' required value={form.name} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur}/>
          </label>

          <label className='text-black-500 font-semibold'>Email
          <input type='email' name='email' className='input' placeholder='example@gmail.com' required value={form.email} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur}/>
          </label>

          <label className='text-black-500 font-semibold'>Message
          <textarea name='message' rows={4} className='textarea' placeholder='Let me know how can i help you!' required value={form.message} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur}/>
          </label>

          <button type='submit' className='btn' onFocus={handleFocus} onBlur={handleBlur} disabled={isLoading}>
            {isLoading ? 'Sending...':'Send Message'}
          </button>
        </form>
      </div>
      <div className='lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px]'>
        <Canvas camera={{position:[0,0,5],fov:75,near:0.1,far:1000}} >
          <directionalLight intensity={2.5} position={[0,0,1]}/>
          <ambientLight intensity={0.5}/>
          <Suspense fallback={<Loader/>}>
            <Fox position={[0.5,0.35,0]} rotation={[12.6,-0.6,0]} scale={[0.5,0.5,0.5]} currentAnimation={currentAnimation}/>
          </Suspense>
        </Canvas>
      </div>
    </section>
  )
}

export default Contact