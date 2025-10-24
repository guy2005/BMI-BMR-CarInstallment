import React from 'react'


function DtiHeader(props) {
    const {title2, aa2 , detail2} = props
  return (
    <>

        <h1 className='text-center mt-10 text-3xl font-bold mb-5'>
              {title2}
        </h1>

        <p className=' text-center text-2xl text-gray-400'>
              {aa2}
        </p>
          
        <h3 className=' mt-5 w-60 h-min mx-auto'>
              <img src={detail2} alt="" />
        </h3>
    </>
  )
}

export default DtiHeader