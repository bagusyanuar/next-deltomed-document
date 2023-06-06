import React from 'react'

function VerticalStepper() {

  return (
    <ol className="relative text-gray-500">
      <li className="animate-pulse">
        <a href='' className='flex items-center'>
          <span className="flex items-center justify-center w-8 h-8 rounded-full ring-1 ring-green-500 mr-2">
            <span className='text-green-500'>11</span>
          </span>
          <p className="text-sm text-green-500">Step details here</p>
        </a>
      </li>
      <li className="relative animate-pulse">
        <div className='h-8 border-l border-green-500 absolute left-4 -top-8'></div>
        <a href='' className='flex items-center mt-8'>
          <span className="flex items-center justify-center w-8 h-8 rounded-full ring-1 ring-green-500 mr-2">
            <span className='text-green-500'>1</span>
          </span>
          <p className="text-sm text-green-500">Step details here</p>
        </a>
      </li>
    </ol>

  )
}

export default VerticalStepper

export const Shimmer = () => {

  const data: Array<string> = ['', '', ''];
  return (
    <ol className="relative text-gray-500">
      {
        data.map((v, i) => {
          if (i === 0) {
            return (
              <li key={i} className="animate-pulse">
                <a href='' className='flex items-center'>
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-300 mr-2">
                  </span>
                  <div className='w-2/3 h-2 bg-slate-300 rounded-md'></div>
                </a>
              </li>
            )
          }
          return (
            <li key={i} className="relative animate-pulse">
              <div className='h-8 border-l border-slate-300 absolute left-4 -top-8'></div>
              <a href='' className='flex items-center mt-8'>
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-300 mr-2">
                </span>
                <div className='w-2/3 h-2 bg-slate-300 rounded-md'></div>
              </a>
            </li>
          )
        })
      }
    </ol>
  )
}