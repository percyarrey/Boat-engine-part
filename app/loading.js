import { Box } from '@mui/material';
import {ClipLoader} from 'react-spinners'

const Loading=()=>{
    return <div  style={{display:'flex',minHeight:'90vh',justifyContent:'center',alignItems:'center',flexDirection:'column'}} >
        {/* <ClipLoader size={100} color='blue'/> */}{/* Loading */}
        <div className='h-8 w-8 inline-block rounded-full border-4 border-r-gray-800 border-solid animate-spin' role='status'>
        </div>
    </div>
}
export default Loading;