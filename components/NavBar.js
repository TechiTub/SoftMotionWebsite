import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { RiAccountCircleFill } from 'react-icons/ri'

const FloatingNavbar = () => {
  const [dropdown, setDropdown] = useState(false);
  const [login, setLogin] = useState(false);
  useEffect(() => {
    let a = localStorage.getItem("Login");
    if (a == "true") {
      setLogin(true);
    }
  }, [])

  const logout = () => {
    setLogin(false);
    localStorage.removeItem("Email");
    localStorage.removeItem("Password");
    localStorage.removeItem("Login");
    localStorage.removeItem("i");
    setDropdown(false);
  }

  return (
    <div>
      <header className="text-gray-400 shadow-md lg:rounded-md lg:mx-80 lg:mt-5 shadow-gray-900 bg-gray-950 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
            <img src="logo.png" className='h-12 w-12' />
          </a>
          <nav className="md:ml-auto md:mr-auto lg:mx-auto flex flex-wrap items-center text-base justify-center">
            <Link href={"/"}><span className="mr-5 hover:text-white">Home</span></Link>
            <Link href={"/Videos"}><span className="mr-5 hover:text-white">Videos</span></Link>
            <Link href={"/Community"}><span className="mr-5 hover:text-white">Community</span></Link>
            <Link href={"/Coupons"}><span className="mr-5 hover:text-white">Coupons</span></Link>
            <Link href={"/SubscriberSpotlight"}><span className="mr-5 hover:text-white">Subscriber Spotlight</span></Link>
            <Link href={"/ContactUS"}><span className="mr-5 hover:text-white">Contact Us</span></Link>
            <Link href={"/About"}><span className="mr-5 hover:text-white">About</span></Link>
          </nav>
          {login && <button onClick={() => { if (!dropdown) { setDropdown(true) } else { setDropdown(false) } }} className="inline-flex items-center bg-gray-900 border-gray-800 border text-2xl py-1 px-1 focus:outline-none hover:bg-gray-800 active:bg-gray-900 rounded mt-4 md:mt-0"><RiAccountCircleFill /></button>}
          {!login && <Link href={"/Login"}><button className="inline-flex items-center bg-gray-900 border-gray-800 border text-2xl py-1 px-1 focus:outline-none hover:bg-gray-800 active:bg-gray-900 rounded mt-4 md:mt-0"><RiAccountCircleFill /></button></Link>}
        </div>
      </header>
      {dropdown && <div className="dropdown bg-gray-950 w-36 gap-2 py-2 px-3 flex flex-col rounded-md z-10 absolute lg:right-80 sm:mx-auto md:right-80 mt-3 text-center">
        <Link href={"/MyProfile"}><span>My Profile</span></Link>
        <Link href={"/MySubscription"}><span>My Subscription</span></Link>
        <button onClick={logout}>Logout</button>
      </div>}
    </div>
  );
};

export default FloatingNavbar;
