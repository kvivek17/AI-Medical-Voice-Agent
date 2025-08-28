import React from 'react'
import Header from './components/Header'

const DashboardLayout = ({children}) => {
  return (
    <div>
        <Header/>
        <div className='px-10 md:px-20 lg:px-30 py-5'>

        {children}
        </div>
        
        </div>
  )
}

export default DashboardLayout