import React from 'react'
import {MdShoppingBasket} from 'react-icons/md'
import {motion} from 'framer-motion'


export default function RowContainer({flag}) {
  return (
    <div className={`w-full my-12 bg-rowBg  ${flag ? 'overflow-x-scroll' :'overflow-x-hidden'}`}>
      <div className='w-300 my-12 md:w-340 h-auto backdrop-blur-lg bg-gray-100 rounded-lg p-2 hover:shadow-md'>
        <div className='w-full flex items-center justify-between'>
          <motion.img whileHover={{scale: 1.1}}
            className='object-contain w-40 -mt-4 drop-shadow-lg'
            src="https://firebasestorage.googleapis.com/v0/b/fooddeliveryapp-1dcf9.appspot.com/o/Images%2F1685442787549-fi3.png?alt=media&token=37c1062b-1759-4bcf-b67d-764d6cd31db8" 
            alt="" 
          />
          <motion.div whileTap={{scale: 0.75}} className='w-8 h-8 rounded-full bg-red-700 flex items-center justify-center cursor-pointer hover:shadow-md'>
            <MdShoppingBasket className='text-white' />
          </motion.div>
        </div>
        <div className='w-full flex flex-col items-end justify-end'>
          <p className='text-textColor font-semibold text-base md:text-lg'>
            Zander & Greens
          </p>
          <p className='mt-1 text-sm text-gray-500'>450Calories</p>
          <div className='flex items-center gap-8'>
            <p className='text-lg text-headingColor font-semibold'> 
              <span className='text-sm text-red-500'>$</span>154
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
