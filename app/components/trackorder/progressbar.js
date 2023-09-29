import React from 'react';

const ProgressBar = ({ steps }) => {
  return (
    <div className="relative h-4 w-full">
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
      <div className='w-6 h-6 bg-gray-200 rounded-full overflow-hidden absolute border-2 border-[#0E9F6E] -right-3 -top-2'>
        </div>
        <div className="bg-[#0E9F6E] h-2.5 relative rounded-full" style={{width:`${steps*33.06}%`}}>
          <div className='absolute -right-4 -top-2'>
            <div className='flex justify-end'>
              <div className='w-6 h-6 bg-[#0E9F6E] rounded-full overflow-hidden  border-2'>
              </div>
            </div>
            <div className=' text-end relative -right-6'>
              {
                steps==0?
                  'Pending':
                steps==1?
                'Processing':
                steps==2?
                'Delivering':
                'Delivered'                  
              }
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default ProgressBar;