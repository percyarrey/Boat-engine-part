import './globals.css'


//COMPONENTS
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import HeaderToggler from './components/header/HeaderToggler'
import { Suspense } from 'react'
import Loading from './loading'
import Margin from './components/header/Margin'

//TOASTER JS
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import AuthProvider from './components/auth-redux/AuthProvider'

export const metadata = {
  icons:{
    icon:'/favicon.png'
  },
  title: `Creative Part's - Buy boats engine`,
  description: `We sell engine boats part's  of all type of boat`,
}

export default function RootLayout({ children }) {
  
return (
    <AuthProvider>
        <html lang="en">
      <body className='flex justify-between flex-col w-[100vw] overflow-x-hidden min-h-[100vh]'>
        <div>
          
          {/* REACT TOAST */}
          <ToastContainer
              position="top-center"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              />
          <HeaderToggler/>
          
          <Header />
          <Margin/>
          <div className=' px-1 lg:px-8'>
            <Suspense fallback={<Loading/>}>
            {children}
            </Suspense>
          </div>
        </div>
        <Footer />
      </body>
    </html>
    </AuthProvider>
  )
}
