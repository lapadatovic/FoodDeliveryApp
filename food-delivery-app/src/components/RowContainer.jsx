import React, { useEffect, useRef, useState } from 'react'
import {MdShoppingBasket} from 'react-icons/md'
import {motion} from 'framer-motion'
import NotFound from '../img/NotFound.svg'
import { useStateValue } from './context/StateProvider';
import {actionType} from './context/reducer'

export default function RowContainer({flag, data, scrollValue}) {
  const rowContainer = useRef();

  const [{cartItems}, dispatch] = useStateValue();
  const [items, setItems] = useState([])

  useEffect(() => {
    rowContainer.current.scrollLeft += scrollValue;
  },[scrollValue])
  
  const addToCart = () => {
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: items,
    })
    localStorage.setItem('cartItems', JSON.stringify(items));
  }
  useEffect(() => {
    addToCart()
  },[items])


  return (
    <div
      ref={rowContainer}
      className={`w-full my-12  flex items-center gap-3 scroll-smooth ${
        flag 
        ?'overflow-x-scroll scrollbar-none'
        :'overflow-x-hidden flex-wrap justify-center'}`}
    >
      {data && data.length > 0 ? data.map(item => (
        <div 
          key={item?.id} 
          className='w-300 min-w-[300px] md:w-340 md:min-w-[340px]  h-auto bg-cardOverlay rounded-lg p-2 backdrop-blur-lg hover:drop-shadow-lg flex flex-col items-center justify-between'>
        <div className='w-full flex items-center justify-between relative'>
          <motion.img whileHover={{scale: 1.1}}
            className='object-contain mt-1 h-36 drop-shadow-lg md:w-40'
            src={item?.imageURL} 
            alt="" 
          />
          <motion.div 
           onClick={() => setItems([...cartItems, item])}
           whileTap={{scale: 0.75}} 
           className='absolute top-0 right-0 w-8 h-8 rounded-full bg-red-700 flex items-center justify-center cursor-pointer hover:shadow-md'
          >
            <MdShoppingBasket className='text-white' />
          </motion.div>
        </div>
        <div className='w-full flex flex-col items-end justify-end'>
          <p className='text-textColor font-semibold text-base md:text-lg'>
            {item?.title}
          </p>
          <p className='mt-1 text-sm text-gray-500'>{item?.calories}Calories</p>
          <div className='flex items-center gap-8'>
            <p className='text-lg text-headingColor font-semibold'> 
              <span className='text-sm text-red-500'>$</span>{item?.price}
            </p>
          </div>
        </div>
      </div> 
      )) :  <div className='w-full flex flex-col items-center justify-center'> 
              <img className='h-60' src={NotFound} />
              <p className='text-xl text-headingColor font-semibold my-2'>Items Not Available</p>
            </div>  }
    </div>
  )
}



