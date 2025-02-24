'use client';

import React, { useState,useCallback,useEffect } from 'react';
import { toast } from 'react-toastify';
import { Button } from '@mui/material';
import Link from 'next/link';
import { resetPassword, verifyResetPasswordCode } from '../../../server actions/auth/actions';
import{ useSearchParams,useRouter,usePathname} from 'next/navigation';

export default function ResetPassword({searchParams}) {
  const router = useRouter();
  const id = searchParams.id
  const pathname = usePathname()
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isCodeVerified, setisCodeVerified] = useState(false);
  const [code, setCode] = useState(searchParams.code ||'');

//CREATE QUERY STRING
const createQueryString = useCallback(
  (name, value) => {
    const params = new URLSearchParams(searchParams)
    params.set(name, value)

    return params.toString()
  },
  [searchParams]
)

//VERIFY CODE 
const verifyCode = async (e) => {

  if (code.length === 4 && id) {
    try {
      const result = await verifyResetPasswordCode(id, code);
      if(result.success){
        router.push(`${pathname}?${createQueryString('code', code)}`);
      setisCodeVerified(true);
      }else{
        toast.warn(result.message, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
      }
      
    } catch (error) {
      toast.warn('Something went wrong. Try again!', {
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
};

useEffect(() => {
  if (code.length === 4 && id) {
    verifyCode();
  }
});
  // Handle password change
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  // Handle confirm password change
  function handleConfirmPasswordChange(e) {
    setConfirmPassword(e.target.value);
  }

  // Handle code change
  function handleCodeChange(e) {
    setCode(e.target.value);
  }

  // Validate strong password criteria
  function validateStrongPassword(password) {
    const errors = [];
    const minLength = 8;

    if (password.length < minLength) {
      errors.push(`at least ${minLength} characters long`);
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('at least one uppercase letter');
    }

    return errors;
  }

  // Handle form submission
  async function handleSubmit(e) {
    e.preventDefault();

    if (loading) return;

    if (isCodeVerified) {
      // Reset password logic
      if (password && confirmPassword) {
        if (password === confirmPassword) {
          const passwordErrors = validateStrongPassword(password);

          if (passwordErrors.length === 0) {
            setLoading(true);
            try {
              // Simulate API call for resetting the password
              try {
                const result = await resetPassword(id, code,password);
                if(result.success){
                  toast.success('Password reset successfully!', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "light",
                  });
    
                  setTimeout(() => {
                    router.push('/login'); // Redirect to login page after success
                  }, 500);
                }else{
                  toast.warn(result.message, {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "light",
                  });
                }
                
              } catch (error) {
                console.error(error)
                toast.warn('Something went wrong. Try again!', {
                  position: "top-center",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  theme: "light",
                });
              }

              
            } catch (error) {
              toast.error('Something went wrong! Please try again.', {
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
            toast.warn(`Password must include: ${passwordErrors.join(', ')}.`, {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "light",
            });
          }
        } else {
          toast.warn('Passwords do not match.', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
          });
        }
      } else {
        toast.warn('Please fill in all fields.', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
      }
    } else {
      verifyCode()  
    }
  }

  return (
    <section className='flex min-h-[95vh] justify-center items-center'>
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        {isCodeVerified ? (
          <>
            <h1 className="text-2xl font-bold text-center">Reset Password</h1>
            <form onSubmit={handleSubmit} className="space-y-4 mt-5">
              <div>
                <label htmlFor="password" className="block mb-2 text-md font-medium text-gray-900">New Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2.5 block w-full"
                  placeholder="Enter new password"
                  required
                />
              </div>
              <div>
                <label htmlFor="confirm-password" className="block mb-2 text-md font-medium text-gray-900">Confirm New Password</label>
                <input
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2.5 block w-full"
                  placeholder="Confirm new password"
                  required
                />
              </div>
              <Button type="submit" style={{ width: '100%', backgroundColor: '#00442E' }} variant='contained' color='success' fullWidth>
                {loading ? 'Resetting...' : 'Reset Password'}
              </Button>
            </form>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-center">Enter Code</h1>
            <p className="text-center">
              Check your email for a code to reset your password. If it doesn’t appear within a few minutes, check your spam folder.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4 mt-5">
              <div>
                <label htmlFor="code" className="block mb-2 text-md font-medium text-gray-900">Code</label>
                <input
                  type="text"
                  name="code"
                  id="code"
                  value={code}
                  onChange={handleCodeChange}
                  maxLength={4} // Set maximum length to 4 characters
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2.5 block w-full"
                  placeholder="Enter the code"
                  required
                />
              </div>
              <div className='text-end'>{"Didn't"} receive a code, <Link href={'/forgotpassword'} className='text-blue-500'>Try Again</Link></div>

              <Button
  type="submit"
  style={code.length === 4 ? { width: '100%', backgroundColor: '#00442E' } : { width: '100%', backgroundColor: 'gray' }}
  disabled={code.length !== 4} // Disable the button if the code length is not 4
  variant='contained'
  color='success'
  fullWidth
>
  {loading ? 'Checking...' : 'Check Code'}
</Button>
            </form>
          </>
        )}
        <div className="mt-4 text-center">
          <p className="text-md font-light text-gray-500">
            Remembered your password? <Link href="/login" className="font-semibold text-blue-600 hover:underline">Log in</Link>
          </p>
        </div>
      </div>
    </section>
  );
}