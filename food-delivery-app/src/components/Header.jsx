import React, {useState} from 'react'
import Logo from '../img/logo.png'
import Avatar from '../img/avatar.png'
import { MdOutlineShoppingBasket, MdAdd, MdLogout } from "react-icons/md";

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

  const [isMenu, setIsMenu] = useState(false)

  const login = async () => {
    if(!user) {
      const {user: {refreshToken, providerData}} = await signInWithPopup(firebaseAuth,provider);
      await dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      })
      localStorage.setItem('user',JSON.stringify(providerData[0]))
    }{
      setIsMenu(!isMenu)
    }
  }

  const logout = () => {
    setIsMenu(false);
    localStorage.clear();

    dispatch({
      type : actionType.SET_USER,
      user: null
    });
  }

  return (
    <header className='fixed z-50 w-screen p-3 px-4 md:p-6 md:px-16'>
        {/*  Desktop and Tablet */}
        <div className='hidden md:flex w-full h-full items-center justify-between'> 
        {/* Logo */}
          <div className='flex items-center gap-2'>
            <Link to={"/"}>
              <img  className='w-8 object-cover'src={Logo}  alt="LogoImg"/>
              <p className='text-headingColor text-xl font-bold'>Chicky</p>
            </Link>
          </div>

          <div className='flex items-center gap-8'>
            <motion.ul 
              initial={{opacity: 0, x: 200, }} 
              animate={{opacity: 1, x: 0, }} 
              exit   ={{opacity: 0, x: 200, }} 
              className='flex items-center gap-8 '>
              <li className='text-base text-color hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>Home</li>
              <li className='text-base text-color hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>Menu</li>
              <li className='text-base text-color hover:text-headingColor duration-100 transition-allease-in-out cursor-pointer '>Service</li>
              <li className='text-base text-color hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>About Us</li>
            </motion.ul>

            <div className='relative flex items-center justify-center'>
              <MdOutlineShoppingBasket className='text-textColor text-2xl cursor-pointer'/>
              <div className='absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center'>
                <p className='text-xs text-white font-semibold'>2</p>
              </div>
            </div>

            <div className='relative'>
              <motion.img whileTap={{scale: 0.6}}
                className=' object-cover rounded-full w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl' 
                src={user ? user.photoURL : Avatar} 
                alt=""
                onClick={login}
                referrerPolicy="no-referrer"
              />

              {
                isMenu && ( 
                  <motion.div 
                    initial ={{ opacity: 0, scale: 0.6 }}
                    animate ={{ opacity: 1, scale: 1   }}
                    exit    ={{ opacity: 0, scale: 0.6 }}
                    className='w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0 py-2'
                  >
                    {
                      user && user.email === 'lapadatovic.dev@gmail.com' && (
                        <Link to='/createItem'>
                          <p 
                            className='flex px-4 py-2 items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base' 
                          >
                            New item <MdAdd/>
                          </p>
                        </Link>
                        
                      )
                    }
                    <p 
                      onClick={logout}
                      className='flex px-4 py-2 items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base'>
                        Logout <MdLogout/> 
                    </p>
                  </motion.div>
                )
              }
            </div>
            
          </div>
        </div>

        {/* Mobile */}
        <div className='flex items-center justify-between md:hidden w-full h-full'>
          <div className='relative flex items-center justify-center'>
            <MdOutlineShoppingBasket className='text-textColor text-2xl cursor-pointer'/>
            <div className='absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center'>
              <p className='text-xs text-white font-semibold'>2</p>
            </div>
          </div>
          
          <Link to={"/"} className='flex items-center gap-2' >
            <img  className='w-8 object-cover'src={Logo}  alt="LogoImg"/>
            <p className='text-headingColor text-xl font-bold'>Chicky</p>
          </Link>
          
          <div className='relative'>
              <motion.img whileTap={{scale: 0.6}}
                className=' object-cover rounded-full w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl' 
                src={user ? user.photoURL : Avatar} 
                alt=""
                onClick={login}
                referrerPolicy="no-referrer"
              />

              {
                isMenu && ( 
                  <motion.div 
                    initial ={{ opacity: 0, scale: 0.6 }}
                    animate ={{ opacity: 1, scale: 1   }}
                    exit    ={{ opacity: 0, scale: 0.6 }}
                    className='w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0 py-2'
                  >
                    {
                      user && user.email === 'lapadatovic.dev@gmail.com' && (
                        <Link to='/createItem'>
                          <p 
                            className='flex px-4 py-2 items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base' 
                          >
                            New item <MdAdd/>
                          </p>
                        </Link>
                        
                      )
                    }

                  <ul
                    className='flex flex-col '>
                    <li className='px-4 py-2 hover:bg-slate-100 text-textColor text-base text-color hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>Home</li>
                    <li className='px-4 py-2 hover:bg-slate-100 text-textColor text-base text-color hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>Menu</li>
                    <li className='px-4 py-2 hover:bg-slate-100 text-textColor text-base text-color hover:text-headingColor duration-100 transition-allease-in-out cursor-pointer '>Service</li>
                    <li className='px-4 py-2 hover:bg-slate-100 text-textColor text-base text-color hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>About Us</li>
                  </ul>
                    <p 
                      onClick={logout}
                      className='flex m-2 p-2 rounded-md  shadow-md justify-center bg-gray-200 items-center gap-3 cursor-pointer hover:bg-gray-300 transition-all duration-100 ease-in-out text-textColor text-base'>
                        Logout <MdLogout/> 
                    </p>
                  </motion.div>
                )
              }
            </div>
        </div>
    </header>
  )
}
