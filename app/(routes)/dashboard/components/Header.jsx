import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'

const Header = () => {

    const menuoptions = [
        {id:1, name:"Home", link:"/"},
        {id:2, name:"History", link:"/history"},
        {id:3, name:"Pricing", link:"/pricing"},
        {id:4, name:"Profile", link:"/profile"},
    ]
  return (
    <div className='flex justify-between items-center p-2 shadow px-10 md:px-20 lg:px-30 '>
        <Image src={"./logo.svg"} alt="Logo" width={50} height={50} />
       
       <div className='flex  gap-5 items-center font-semibold ' >
        {menuoptions.map((options,index)=>{
        return <div className=' hover hover:font-bold' key={index}> <Link href={options.link}>{options.name}</Link> </div>
        })
    }
       </div>
       <UserButton/>
       </div>
  )
}

export default Header