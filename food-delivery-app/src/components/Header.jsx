import React from 'react'
import Logo from '../img/logo.png'
import Avatar from '../img/avatar.png'
import { MdOutlineShoppingBasket } from "react-icons/md";

import { Link } from 'react-router-dom';
import {motion} from 'framer-motion'

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {app} from '../firebase.config'

import {useStateValue } from './context/StateProvider'
import { actionType } from './context/reducer';

export default function Header() {

  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [{user}, dispatch] = useStateValue()

  const login = async () => {
    const {user: {refreshToken, providerData}} = await signInWithPopup(firebaseAuth,provider);
    dispatch({
      type: actionType.SET_USER,
      user: providerData[0],
    })
  }
  
  return (
    <header className='fixed z-50 w-screen p-6 px-16'>
        {/*  Desktop and Tablet */}
        <div className='hidden md:flex w-full h-full items-center justify-between'> 
        {/* Logo */}
          <div className='flex items-center gap-2'>
            <Link to={"/"}>
              <img className='w-8 object-cover' src={Logo} alt="LogoImg"/>
              <p className='text-headingColor text-xl font-bold'>Chicky</p>
            </Link>
          </div>
          
          <div className='flex items-center gap-8'>
            <ul className='flex items-center gap-8 '>
            <li className='text-base text-color hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>Home</li>
              <li className='text-base text-color hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>Menu</li>
              <li className='text-base text-color hover:text-headingColor duration-100 transition-allease-in-out cursor-pointer '>Service</li>
              <li className='text-base text-color hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>About Us</li>
            </ul>

            <div className='relative flex items-center justify-center'>
              <MdOutlineShoppingBasket className='text-textColor text-2xl cursor-pointer'/>
              <div className='absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center'>
                <p className='text-xs text-white font-semibold'>2</p>
              </div>
            </div>

            <div className='relative'>
              <motion.img whileTap={{scale: 0.6}}
                className='w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl' 
                src={Avatar} 
                alt="useprofile" 
                onClick={login}
              />
            </div>
            
          </div>
        </div>

        {/* Mobile */}
        <div className='flex md:hidden w-full h-full'>

        </div>
    </header>
  )
}
