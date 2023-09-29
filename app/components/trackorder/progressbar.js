import React from 'react';

const ProgressBar = ({ status,date }) => {
  var steps;
  if(status==='Pending'){
    steps=0
  }else if(status==='Processing'){
    steps=1
  }else if(status==='Delivering'){
    steps=2
  }else if(status==='Delivered'){
    steps=3
  }
  
  var penDate = new Date(date)
  var penMonth = penDate.toLocaleString('en-US', { month: 'short' })
  var deliverDate = new Date(date)
  deliverDate.setDate(deliverDate.getDate() + 7)
  var deliverMonth = deliverDate.toLocaleString('en-US', { month: 'short' })
  return (
    <div className="relative h-4 w-full">
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div className=' -right-3 -top-2  absolute'>
          <div className='flex justify-end'>
            <div className='w-6 h-6 bg-gray-200 rounded-full overflow-hidden border-2 border-[#0E9F6E]'>
            </div>
          </div>
          <div className={steps==3?'mt-1 opacity-80 relative -right-3 text-end' : 'mt-1 opacity-40 relative text-end'}>
            <small className=' font-semibold leading-[1.1]'>
            <div>Max: 7 days</div>
            <div>{deliverMonth}. {deliverDate.getDate()}</div>
            </small>
          </div>
        </div>
        <div className="bg-[#0E9F6E] h-2.5 relative rounded-full" style={{width:`${steps*33.06}%`}}>
          <div className='absolute -right-4 -top-2'>
            <div className='flex justify-end'>
              <div className='w-6 h-6 bg-[#0E9F6E] rounded-full overflow-hidden  border-2'>
              </div>
            </div>
            {
              steps==0?
                <div className=' text-end relative -top-[3.3rem] -right-9'>
                  Pending
                </div>:
              steps==1?
                <div className=' text-end relative -top-[3.3rem] -right-5'>
                  Processing
                </div>:
              steps==2?
                <div className=' text-end relative -top-[3.3rem] -right-5'>
                  Delivering
                </div>
              :   
                <div className=' text-end relative -top-[3.3rem] -right-0'>
                  Delivered
                </div>

            }
          </div>
        </div>
        <div className=' -left-1 top-1  absolute'>
          <div className={'mt-3 opacity-80'}>
            <small className=' font-semibold leading-[1.4]'>
            <div>Ordered</div>
            <div>{penMonth}. {penDate.getDate()}</div>
            </small>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default ProgressBar;