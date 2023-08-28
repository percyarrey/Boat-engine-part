import React, {ReactNode} from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

export default async function PrivateLayout({children}){
    const session = await getServerSession(authOptions)
    if(session?.user?.role !=='admin') redirect('/')
    return <>{children}</>

}