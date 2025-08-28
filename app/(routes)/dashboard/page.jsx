import React from 'react'
import Historylist from './components/Historylist'
import Doctorlist from './components/Doctorlist'
import Addsession from './components/Addsession'

const Dashboard = () => {
  return (
<div>
    <div className='flex justify-between items-center'> 
      <h1 className='text-2xl font-bold'> my Dashboard</h1>
    <Addsession/>
    </div>
    <Historylist/>
    <Doctorlist/>
    </div>
  )
}

export default Dashboard