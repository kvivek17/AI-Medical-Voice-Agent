import React from 'react'
import { PricingTable } from '@clerk/nextjs'

const Biling = () => {
  return (
    <div>
        <h2 className='text-3xl font-bold'>Join subscription</h2>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1rem' }}>
      <PricingTable />
    </div>
    </div>
  )
}

export default Biling