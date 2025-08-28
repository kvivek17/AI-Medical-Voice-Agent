"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Suggestdoctor from "./Suggestdoctor"


import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import React from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from "@/components/ui/textarea"
import { DialogClose } from "@radix-ui/react-dialog"
import { ArrowBigRight } from "lucide-react"

import axios from "axios"
const Addsession = () => {
    const [note, setnote] = useState("")
    const [loadind, setloadind] = useState(false)
    const [suggestdoctor, setsuggestdoctor] = useState({})
    const [showDoctorSection, setShowDoctorSection] = useState(false);
const [showDoctorDialog, setShowDoctorDialog] = useState(false);

    const [selectdoctor, setselectdoctor] = useState(null)
    const router = useRouter()




const onNext = async()=>{
  const  result =  await axios.post('/api/suggestdoctor',{
    notes:note
  })
  console.log(result.data);
  setloadind(false)
  setsuggestdoctor(result.data)
  console.log(result.data);
  
  setShowDoctorSection(true)
      const doctorList = result.data.doctors;
      setShowDoctorDialog(true); // 👈 this opens the dialog


    // ✅ Redirect to new page with doctor list

  
}

const startconsult = async ()=>{
  setloadind(true)
  const result = await axios.post('/api/session',{
    notes:note,
    selectdoctor:selectdoctor
  })
  if(result.data.sessionId){
    console.log(result.data.sessionId);
    router.push('/dashboard/mediconvo/'+result.data.sessionId)
    

  }
setloadind(false)
}
   

  return (
    <>
   <Dialog>
  <DialogTrigger><Button >+Start with Consultant</Button></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Add Basic Details</DialogTitle>
      <DialogDescription aschild>
       <div>
        <h2>Add symptoms or any other details</h2>
        <Textarea onChange={(e)=>{setnote(e.target.value)}} placeholder="Add detils here....." className='h-[200px] mt-1' value={note}  />
       </div>
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
        <DialogClose>
            <Button>Close</Button>
        </DialogClose>
        <Button onClick={onNext}  disabled={!note} > Next <ArrowBigRight/></Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

 <Dialog open={showDoctorDialog} onOpenChange={setShowDoctorDialog}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Suggested Doctors</DialogTitle>
      </DialogHeader>

<Suggestdoctor
  doctors={suggestdoctor.doctors || []}
  defaultDoctor={suggestdoctor.default || []}
   onSelect={(doctor) => {
    setselectdoctor(doctor);
    console.log("Selected:", doctor);
  }}
/>

      <Button onClick={startconsult}   disabled={!selectdoctor} className="w-full bg-green-600">
        ✅ Start Consultation
      </Button>
   


      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Close</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</>
  )
}

export default Addsession