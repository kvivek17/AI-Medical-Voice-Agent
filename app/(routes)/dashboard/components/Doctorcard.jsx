"use client"
import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import axios from "axios"
import { useRouter } from 'next/navigation'


const Doctorcard =({doctor,plan}) => {

  const router = useRouter()
  const startconsult = async ()=>{
  
  const result = await axios.post('/api/session',{
    notes:"Add query",
    selectdoctor:doctor
  })
  if(result.data.sessionId){
    console.log(result.data.sessionId);
    router.push('/dashboard/mediconvo/'+result.data.sessionId)
    

  }

}
   


  return (
    <div className=''>
       <Image src={doctor.image} width={150} height={100} alt={doctor.specialist} className='w-full h-[350px] object-cover mt-5 rounded-2xl'/>
    <h2 className='font-bold mt-1'>{doctor.specialist}</h2>
    <p className='text-sm text-gray-700  '>{doctor.description}</p>
   {!plan && doctor.subscriptionRequired ?<h1>Only subscribers to the paid plan can access this content.</h1>: <Button onClick={startconsult}  className='mt-2 w-full hover hover:bg-gray-600 '>
     
      +Start consult<ArrowRight/>
    </Button>}

    </div>
  )
}

export default Doctorcard