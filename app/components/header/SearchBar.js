import { Container, InputAdornment, TextField } from '@mui/material';
import { useSearchParams,useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useState } from "react";

export default function SearchBar(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const searchParams = useSearchParams()
  const router = useRouter()
  //SEARCH FUNCTIONALITY
  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)
 
      return params.toString()
    },
    [searchParams]
  )

  //HANDLE SEARCH
  const handleSearch=(e)=>{
    if(e.key==='Enter'){
      router.push('/deals' + '?' + createQueryString('query',e.target.value))
    }
  }
  const handlebtnSearch=(e)=>{
      if(searchTerm){
        router.push('/deals' + '?' + createQueryString('query',searchTerm))
      }
  }
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  //HANDLE SEARCHING
  const handleSearchToggle=(e)=>{
    props.handleSearchToggle(e)
  }
  return (
    <div className="flex pb-3 w-full">
        
    <div className="relative w-full">
        <input  type="search" id="default-search" className="block h-10 w-full p-4 pl-2 text-sm text-gray-900 border border-gray-300  rounded-full bg-gray-100 focus:bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onKeyDown={handleSearch} placeholder="Search Product" onChange={handleChange} onFocus={handleSearchToggle} value={searchTerm} />
            <button onClick={handlebtnSearch} className="absolute top-0 right-0 p-2.5 text-sm font-medium h-full ">
                <svg className="w-4 h-4" color="gray" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </button>
        </div>
    </div>
  );
}