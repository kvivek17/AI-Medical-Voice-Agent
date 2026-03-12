import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    const { messages, sessiondetails, session } = body;

    console.log(messages);
    console.log(sessiondetails);
    console.log(session);

    // your AI logic or report generation here

    return NextResponse.json({
      success: true,
      message: "Medical report generated",
    });

  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}