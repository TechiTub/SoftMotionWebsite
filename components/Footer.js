import Image from 'next/image'
import React from 'react'

const Footer = () => {
    return (
        <div className='bg-gray-950 lg:w-auto lg:mx-96 sm:mx-0 sm:w-full md:w-full md:mx-0 rounded-lg mb-3 text-center'>
            <footer className="text-gray-400 body-font">
                <div className="container px-5 py-8 mx-auto flex items-center justify-center sm:flex-row flex-col">
                    <a className="flex title-font font-medium items-center md:justify-start justify-center text-white">
                        <img src={"logo.png"} className="h-16 w-16" />
                        <span className="ml-3 text-xl">Soft Motion</span>
                    </a>
                    <p className="text-sm text-gray-400 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-800 sm:py-2 sm:mt-0 mt-4">© 2023 Soft Motion —
                        <a href="https://youtube.com/@SoftMotion" className="text-gray-500 ml-1" target="_blank" rel="noopener noreferrer">@SoftMotion</a>
                    </p>
                </div>
            </footer>
        </div>
    )
}

export default Footer
