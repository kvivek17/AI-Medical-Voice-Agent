import React from 'react'
import { AIDoctorAgents } from '@/shared/list'
import Doctorcard from './Doctorcard'

const  Doctorlist =async () => {
  
  

 
  return (
    <div className='mt-10'>
       <h1 className='font-bold text-xl flex justify-center'>AI Specialist doctor</h1>

       <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 '>
        {AIDoctorAgents.map((doctor,index)=>{
            return <div key={index}>
                <Doctorcard doctor={doctor} />

                </div>
        })}
       </div>

    </div>
  )
}

export default Doctorlist