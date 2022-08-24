import React from 'react'
import { useDropzone } from 'react-dropzone'

const getClassName = (className, isActive) => {
    if (!isActive) return className
    return `w-full py-6 flex flex-col items-center justify-center border-dashed border-4 rounded-md space-y-4 mb-8 text-zinc-500 cursor-pointer group bg-black/5 duration-200 border-purple-700 text-purple-700`
}

const Dropzone = ({ onDrop, accept }) => {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept,
    })

    return (
        <div
            className={getClassName(
                'w-full py-6 flex flex-col items-center justify-center border-dashed border-4 border-black/20 rounded-md space-y-4 mb-8 text-zinc-500 cursor-pointer group hover:bg-black/5 duration-200 hover:border-purple-700 hover:text-purple-700',
                isDragActive
            )}
            {...getRootProps()}>
            <input className='dropzone-input' {...getInputProps()} />

            <svg
                xmlns='http://www.w3.org/2000/svg'
                className='w-16 h-16'
                viewBox='0 0 24 24'
                strokeWidth='2'
                stroke='currentColor'
                fill='none'
                strokeLinecap='round'
                strokeLinejoin='round'>
                <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
                <line x1={15} y1={8} x2='15.01' y2={8}></line>
                <rect x={4} y={4} width={16} height={16} rx={3}></rect>
                <path d='M4 15l4 -4a3 5 0 0 1 3 0l5 5'></path>
                <path d='M14 14l1 -1a3 5 0 0 1 3 0l2 2'></path>
            </svg>
            <p className='text-xl text-black'>
                <span className='text-purple-600 cursor-pointer group-hover:text-purple-700'>Upload your files</span> or drag and drop
            </p>
            <p className='text-sm text-black font-light'>JPG, WEBP, PNG up to 4mb each</p>
            {/* <div className='text-center'>
                {isDragActive ? (
                    <p className='dropzone-content'>Release to drop the files here</p>
                ) : (
                    <p className='dropzone-content'>Drag &amp; drop some files here, or click to select files</p>
                )}
            </div> */}
        </div>
    )
}

export default Dropzone
