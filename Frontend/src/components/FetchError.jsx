import React, { useState } from 'react'

const FetchError = () => {

  return (
    <div className='m-5 h-20'>
        <span className='text-3xl'>Connecting to database</span>
        
        <span className='text-5xl ml-2'>. . .</span>
    </div>
  )
}

export default FetchError