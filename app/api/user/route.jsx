import clientPromise from "@/lib/mongo";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function POST(req) {
    const  user = await  currentUser();

    const client = await clientPromise;
    const db = client.db("MedicalAI");
    const collection = db.collection("users");
    try {

        const users = await collection.findOne({email:user.primaryEmailAddress.emailAddress});
        if(!users){
            const newuser = await collection.insertOne({
                name:user.fullName,
                email:user.primaryEmailAddress.emailAddress,
                credits:10
            })
            return NextResponse.json({
                message: "User created successfully",newuser})
            }
            return NextResponse.json({
                message: "User already exists",
                user: users
            })
    } catch(error) {
        console.log(error);
        
        
    }
     
  }


