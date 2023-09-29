'use client'
import React,{useState} from 'react'
import axios from 'axios';

import { toast } from 'react-toastify';

import { Button } from '@mui/material'

import { useRouter } from 'next/navigation'

export default function Brandcomp(props) {
    //NAVIGATION
    const router = useRouter()

    const [Edit, toggleEdit] = useState(false)
    const [name, setname] = useState(props.data.name);
    const handleDelete =()=>{
        var res = confirm('Are you sure')
        if(res){
            (
                async()=>{
                axios.delete(`/api/crudbrand?id=${props.data._id}`)
                .then(res=>{
                    res=res.data
                    if(res.message===1){
                        toast.error('Brand Deleted Succesfully', {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        });
                        setTimeout(() => {
                            router.refresh()
                        }, 500);
                    }else{
                        toast.warn('Failed to delete Brand', {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        });
                    }
                    })
                    .catch(e=>{
                    console.log(e)
                    toast.warn('Something went wrong !Try again', {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        });
                    })
                toggleEdit(false)
                }
              )()
        }
    }
    const handleSave =()=>{
    var data={name:name,id:props.data._id};
    if(name){
      (
        async()=>{
        await axios.put('/api/crudbrand',data)
        .then(res=>{
            res=res.data
            if(res.message===1){
                toast.success('Brand Updated Successfully', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
                setTimeout(() => {
                    router.refresh()
                }, 500);
            }else{
                toast.warn('Failed to add Brand', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            }
            })
            .catch(e=>{
            console.log(e)
            toast.warn('Something went wrong !Try again', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            })
        toggleEdit(false)
        }
      )()
    }else{
    toast.warn('Enter a brand', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
    }
    }

    const handleChange=(e)=>{
        setname(e.target.value)
    }
  return (
    <>
    <div className='flex justify-between px-2 pl-5'>
        <div>
            {
                Edit?
                <input className='h-full w-full border-2 border-gray-300 rounded-md' value={name} onChange={handleChange}/>
                :
                <h4 className='font-bold text-lg'>{name}</h4>
            }
        </div>
        <div className='flex gap-2'>
        {
            Edit?
            <Button onClick={handleSave} type='submit'  style={{maxWidth:'25rem',width:'100%',backgroundColor:'#0F9ED3'}} variant='contained' color='primary'>
            Save
            </Button>
            :
            <Button onClick={()=>{toggleEdit(true)}} type='submit'  style={{maxWidth:'25rem',width:'100%',backgroundColor:'#1A5843'}} variant='contained' color='success'>
            Edit
            </Button>
        }
        <Button type='submit' onClick={handleDelete}  style={{maxWidth:'25rem',width:'100%',backgroundColor:'#E02440'}} variant='contained' color='error'>
            Delete
        </Button>
        </div>
    </div>
    <hr className='m-0 mt-1'/>
    </>
  )
}
