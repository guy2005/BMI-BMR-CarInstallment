import React from 'react'


function HeaderHome(props) {
    const { title, aa, detail } = props
    return (
        <>
            <div className="border-b-gray-300 shadow-2xl shadow-black/100 rounded-3xl w-full mx-auto h-full">
                <h3 className=' mt-5 w-50 h-min mx-auto'>
                    <img src={detail} alt="" />
                </h3>


                <p className='text-center text-2xl font-bold'>
                    {aa}
                </p>

                <span className='text-center text-lg text-gray-400'>
                    {title}
                </span>
            </div>

        </>
    )
}

export default HeaderHome