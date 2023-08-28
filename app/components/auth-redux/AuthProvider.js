'use client'
import { SessionProvider } from 'next-auth/react'
import React from 'react'
import { store } from '@/store/store'
import { Provider} from 'react-redux'

export default function AuthProvider({children}) {
  return (
    <Provider store={store}>
      <SessionProvider>
          {children}
      </SessionProvider>
    </Provider>
  )
}
