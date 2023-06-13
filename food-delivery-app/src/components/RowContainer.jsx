import React from 'react'
import {MdShoppingBasket} from 'react-icons/md'
import {motion} from 'framer-motion'

export default function RowContainer({flag, data}) {
  console.log(data)
  return (
    <div className={`w-full my-12 bg-rowBg flex items-center gap-3 ${flag ? 'overflow-x-scroll scrollbar-none' :'overflow-x-hidden flex-wrap'}`}>
      {data && data.map(item => (
        <div 
          key={item.id} 
          className='min-w-[300] w-full my-12 md:min-w-[340]:  md:w-340 h-auto backdrop-blur-lg bg-gray-100 rounded-lg p-2 hover:shadow-md'>
        <div className='w-full flex items-center justify-between'>
          <motion.img whileHover={{scale: 1.1}}
            className='object-contain -mt-4 h-36 drop-shadow-lg md:w-40'
            src={item.imageURL} 
            alt="" 
          />
          <motion.div whileTap={{scale: 0.75}} className='w-8 h-8 rounded-full bg-red-700 flex items-center justify-center cursor-pointer hover:shadow-md'>
            <MdShoppingBasket className='text-white' />
          </motion.div>
        </div>
        <div className='w-full flex flex-col items-end justify-end'>
          <p className='text-textColor font-semibold text-base md:text-lg'>
            {item.title}
          </p>
          <p className='mt-1 text-sm text-gray-500'>{item.calories}Calories</p>
          <div className='flex items-center gap-8'>
            <p className='text-lg text-headingColor font-semibold'> 
              <span className='text-sm text-red-500'>$</span>{item.price}
            </p>
          </div>
        </div>
      </div> 
      ))}
    </div>
  )
}



