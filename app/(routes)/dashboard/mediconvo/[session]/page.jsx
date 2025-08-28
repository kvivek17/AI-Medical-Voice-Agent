"use client";
import axios from "axios";
import { Circle, Flag, PhoneCall, PhoneOff } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import Vapi from "@vapi-ai/web";
import react from "react";

const Mediconvo = () => {
  const { session } = useParams();
  const [sessiondetails, setsessiondetails] = useState({});
  const [callStart, setCallStart] = useState(false);
  const [currentrole, setcurrentrole] = useState("");
  const [livetranscript, setlivetranscript] = useState("");
  const [messages, setmessages] = useState([]);
  const [VapiInstance, setVapiInstance] = useState()




  useEffect(() => {
    if (session) {
      getsessiondetails();
    }
  }, [session]);

  const getsessiondetails = async () => {
    const result = await axios.get("/api/session?session=" + session);
    setsessiondetails(result.data.session);
  };

  // Start voice conversation
  const startCall = () => {
    const vapi = new Vapi(process.env.NEXT_PUBLIC_YOUR_PUBLIC_API_KEY);
    setVapiInstance(vapi)


    
      const vapiconfig = {
  
      name: "AI Medical Doctor Voice Agent",
      firstMessage: "Hi there, I am your AI medical assistant",
      transcriber: {
        provider: "assembly-ai",
        language: "en",
      },
      voice: {
        provider: "playht",
        voiceId: sessiondetails?.selectdoctor?.voiceId || "will",
      },
      model: {
        provider: "openai",
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: sessiondetails?.selectdoctor?.agentPrompt,
          },
        ],
      },
    
  }


    vapi.start(vapiconfig);
    vapi.on('call-start', () => {
      setCallStart(true)
      console.log('Call started')
    });
    vapi.on('call-end', () => {
      setCallStart(false)
      console.log('Call ended')

    });
        vapi.on('speech-start', () => {
      console.log("asiisatnce start speaking");
     setcurrentrole("Assistance")

    })
    vapi.on('speech-end', () => {
      console.log("asiisatnce stop speaking");
      setcurrentrole("user")

    })


    vapi.on('message', (message) => {
      if (message.type === 'transcript') {
        const {role,transcriptType,transcript}=message;
        console.log(`${message.role}: ${message.transcript}`);
        if(transcriptType=='partial'){
          setlivetranscript(transcript)
          setcurrentrole(message.role)
          console.log(role,transcript);
          

        }
        else if(transcriptType=='final'){
          setmessages((prev)=>[
            ...prev,{role:message.role,text:transcript}
          ])
          console.log(messages);
          
          setlivetranscript("")
          setcurrentrole(null)

        }


      }
    });


  }


  const endCall = async() => {
    if (!VapiInstance) return;

    VapiInstance.stop();
    VapiInstance.off("call-start")
    VapiInstance.off("call-end")
    VapiInstance.off("message")
    VapiInstance.off("speech-start");
    VapiInstance.off("speech-end");

    setCallStart(false)
    setVapiInstance(null)

    const result = await generatereport()


  };

const generatereport= async()=>{
  const result = await axios.post('/api/medical-report',{
    messages:messages,
    sessiondetails:sessiondetails,
    session:session
  })

  console.log(result.data);
  return result.data
  

}
  


  return (
    <div className="p-10 border rounded-4xl">
      <div className="flex justify-between items-center">
        <h2 className="p-1 px-2 border rounded-md flex gap-2 items-center">
          <Circle
            className={`h-4 w-4 rounded-full ${callStart ? "bg-green-400" : "bg-red-500"}`}
          />
          {callStart ? "Connected" : "Not connected"}
        </h2>
        <h2 className="font-bold text-xl text-gray-700">00:00</h2>
      </div>

      <div className="flex flex-col gap-2 justify-center items-center mt-5">
        {sessiondetails?.selectdoctor?.image && (
          <Image
            src={sessiondetails.selectdoctor.image}
            alt={sessiondetails.selectdoctor.specialist || "Doctor"}
            width={120}
            height={120}
            className="w-[100px] h-[100px] rounded-full object-cover"
          />
        )}
        <h2 className="font-semibold">
          {sessiondetails?.selectdoctor?.specialist}
        </h2>

        <div className="mt-10">
          {messages.map((msg, idx) => (
            <div key={idx}>
              <h2>
                {msg.role || "Unknown"}: {msg.text}

              </h2>
            </div>
          ))}

          <h2 className="text-gray-600">
            {currentrole}
            {livetranscript}
          </h2>

          {!callStart ? (
            <Button className="mt-5" onClick={startCall}>
              <PhoneCall /> Start Call
            </Button>
          ) : (
            <Button variant="destructive" onClick={endCall} className="mt-5">
              <PhoneOff /> Disconnected
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Mediconvo;
