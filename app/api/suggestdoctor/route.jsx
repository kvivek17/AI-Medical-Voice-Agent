import { AIDoctorAgents } from "@/shared/list";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const { notes } = body;

  const keyword = notes.toLowerCase();

  const matchdoc = AIDoctorAgents.filter((doc) => {
    const combinedText = `${doc.specialist} ${doc.description} ${doc.agentPrompt}`.toLowerCase();
    return combinedText.includes(keyword);
  });

  const result = matchdoc.length > 0 ? matchdoc : [AIDoctorAgents[0]];

  return NextResponse.json({ doctors: result ,default:[AIDoctorAgents[0]] }); 
}
