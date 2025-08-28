"use client"
import React from "react"
import Doctorcard from "./Doctorcard";
import { useState } from "react";
import Image from 'next/image'


export default function Suggestdoctor({ doctors = [], defaultDoctor = [],onSelect }) {

  const [click, setclick] = useState(null)
  return (
    <div className=" relative flex gap-10 justify-center items-center  ">
      {doctors.map((doc, idx) => (
         <div key={idx}  onClick={()=>{onSelect(doc); setclick(doc)}} className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
       click?.id===doc.id ?  "border-green-500" : "border-gray-300"
      }`}>
           <Image src={doc.image} width={150} height={100} alt={doc.specialist} className='w-full h-[350px] object-cover mt-5 rounded-2xl'/>
              <h2 className='font-bold mt-1'>{doc.specialist}</h2>
              <p className='text-sm text-gray-700  '>{doc.description}</p>
         </div>
       
      ))}
       <div >
        <div className="grid gap-4">
          {defaultDoctor.map((doc, idx) => (
 <div key={idx}  onClick={()=>{onSelect(doc); setclick(doc)}} className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
        click?.id===doc.id? "border-green-500" : "border-gray-300"
      }`}>
           <Image src={doc.image} width={150} height={100} alt={doc.specialist} className='w-full h-[350px] object-cover mt-5 rounded-2xl'/>
              <h2 className='font-bold mt-1'>{doc.specialist}</h2>
              <p className='text-sm text-gray-700  '>{doc.description}</p>
         </div>          ))}
        </div>
      </div>
    </div>
  );
}

