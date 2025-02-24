'use client'
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { verifyEmail, verifyEmailCode } from '../../../server actions/auth/actions';

//NEXT AUTH
import { signOut, useSession } from 'next-auth/react';

const Page = () => {
  const [code, setCode] = useState('');
  const [sendCode,setSendCode] = useState(false)
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  //SESSION
    const { data, status } = useSession()

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      
      var result = await verifyEmailCode(data?.user?.email,code)

      if (result.success) {
        toast.success('Email is verified! Please Login');
        signOut({redirect:false})
        setTimeout(() => {
          router.push('/login');
        }, 600);
        // Navigate to desired page after successful verification
         // or wherever you want to redirect
      } else {
        toast.warn(result.message);
      }
    } catch (error) {
      console.error('Error verifying email:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyEmail = async(e)=>{
    try {
      await verifyEmail(data?.user?.email)
      setSendCode(true)
    } catch (error) {
     console.error(error) 
    }
  }

  return (
    <section className='flex min-h-[95vh] justify-center items-center'>
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Verify Your Email</h1>
        <form onSubmit={handleVerify} className="space-y-4 mt-5">
          <div>
            <label htmlFor="code" className="block mb-2 text-md font-medium text-gray-900">Verification Code</label>
            <input
              type="text"
              id="code"
              value={code}
              onChange={handleCodeChange}
              maxLength={4}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2.5 block w-full"
              placeholder="Enter the verification code"
              required
            />
          </div>
          <Button
            type="submit"
            style={code.length === 4 ? { width: '100%', backgroundColor: '#00442E' } : { width: '100%', backgroundColor: 'gray' }}
  disabled={code.length !== 4} // Disable the button if the code length is not 4
            variant='contained'
            color='success'
          >
            {loading ? 'Verifying...' : 'Verify'}
          </Button>


        </form>
        <div className="mt-4 text-center">
          <p className="text-md font-light text-gray-500">
            {
              sendCode ? <>New verification code has been send again to your Email.</>:<>{"Didn't "}recieve code? <button className=' text-green-700' onClick={handleVerifyEmail}
              >
                Send code
              </button></>
            }
          </p>
        </div>
      </div>
    </section>
  );
};

export default Page;