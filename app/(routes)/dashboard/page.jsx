import React from "react"
import Historylist from "./components/Historylist"
import Doctorlist from "./components/Doctorlist"
import Addsession from "./components/Addsession"

import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

const Dashboard = async () => {

  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/")
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Dashboard</h1>
        <Addsession />
      </div>

      <Historylist />
      <Doctorlist />
    </div>
  )
}

export default Dashboard