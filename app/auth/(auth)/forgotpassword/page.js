'use client'
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { Button } from '@mui/material';
import Link from 'next/link'
import { sendForgotPassEmail } from '../../../../server actions/auth/actions'

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle email change
  function handleChange(e) {
    setEmail(e.target.value);
  }

  // Validate email format
  function isEmailValid(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Handle form submission
  async function handleSubmit(e) {
    e.preventDefault();

    if (loading) return;

    if (email && isEmailValid(email)) {
      setLoading(true);
      try {
        const {id} = await sendForgotPassEmail(email);
        toast.success('Recovery email sent successfully!', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
        
        setTimeout(() => {
          router.push(`/auth/resetpassword?id=${id}`); // Use template string for query parameters
        }, 500);
        
      } catch (error) {
        toast.error(error.message==="Email not found in our database"?"Email not found in our database":'Something went wrong! Please try again.', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
      } finally {
        setLoading(false);
      }
    } else {
      toast.warn('Please enter a valid email address.', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }
  }

  return (
    <section className='flex min-h-[95vh] justify-center items-center'>
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Forgot Password</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-2 text-md font-medium text-gray-900">Your email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2.5 block w-full"
              placeholder="name@company.com"
              required
            />
          </div>
          <Button type="submit" style={{ width: '100%', backgroundColor: '#00442E' }} variant='contained' color='success' fullWidth>
            {loading ? 'Sending...' : 'Send Recovery Code'}
          </Button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-md font-light text-gray-500">
            Remembered your password? <Link href="/auth/login" className="font-semibold text-blue-600 hover:underline">Log in</Link>
          </p>
        </div>
      </div>
    </section>
  );
}