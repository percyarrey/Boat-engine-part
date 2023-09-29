'use client'
import React from 'react'
import { Button } from '@mui/material'
import { useRouter } from 'next/navigation'
export default function Orderbtn({page,npage}) {
    const router = useRouter()
  //HANDLE SEARCH
  const handlePage=(e)=>{
    var pg= page + parseInt(e.target.id)<0 ? 0 : page + parseInt(e.target.id)
    router.push('/orders' + '?'+'page='+pg)
  }
  return (
    <div className='flex justify-around py-4'>
        {
            page>0 &&
            <Button id='-1' onClick={handlePage} type='submit' style={{ maxWidth: '5rem', width: '100%', backgroundColor: '#0E9F6E' }} variant='contained' color='success'>
            Prev
            </Button>
        }
        {
            npage && 
            <Button id='1' onClick={handlePage} type='submit' style={{ maxWidth: '5rem', width: '100%', backgroundColor: '#0E9F6E' }} variant='contained' color='success'>
            Next
            </Button>
        }
    </div>
  )
}
