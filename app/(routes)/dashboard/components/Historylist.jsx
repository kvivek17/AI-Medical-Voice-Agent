"use client"
import React, { useEffect } from 'react'
import { useState } from 'react'
import Image from 'next/image'

import Addsession from './Addsession'
import axios from 'axios'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


const Historylist = () => {
    const [history, sethistory] = useState([])

    useEffect(()=>{
      gethistory()
    },[])

    const gethistory = async()=>{
      const result = await axios.get('/api/session?session=all')
      console.log(result.data);
      sethistory(result.data)
      console.log(history);
      
      
    }
  return (
    <div className=' mt-4'>
        {history.length ==0?<div className='flex flex-col justify-center items-center gap-5 border border-shadow  rounded-2xl mt-5 p-5'>
            <Image src={"/assistant.jpg"} width={200} height={200}/>
            <h1 className='text-2xl font-bold'>No History Found</h1>
            <p className='text-gray-500 font-semibold'>You have not consulted any doctor yet.</p>
            <Addsession/>

        </div>:<div>
          <Table>
  <TableCaption>A list of your All your consult</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">specialist</TableHead>
      <TableHead>description</TableHead>
      <TableHead>date</TableHead>
      <TableHead className="text-right">Action</TableHead>
    </TableRow>
  </TableHeader>
  {history.map((item,index)=>{
   return <TableBody key ={index}>
  
    <TableRow>
      <TableCell className="font-medium">{item.selectdoctor?.specialist}</TableCell>
      <TableCell>{item.selectdoctor?.description}</TableCell>
      <TableCell>{item.createdAt}</TableCell>
      <TableCell className="text-right">{item.notes}</TableCell>
    </TableRow>
  </TableBody>
  })}

</Table>
          </div>}
    </div>
  )
}

export default Historylist