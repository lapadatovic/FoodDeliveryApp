import React, { useEffect, useState } from 'react'
import {MdOutlineKeyboardBackspace} from 'react-icons/md'
import {motion} from 'framer-motion'
import {RiRefreshFill} from 'react-icons/ri'

import EmptyCart from '../img/emptyCart.svg'
import CartItem from './CartItem'

import {useStateValue} from './context/StateProvider'
import {actionType} from './context/reducer'

function CartContainer() {

 const [{cartShow, user, cartItems}, dispatch] = useStateValue();

 const [total, setTotal]= useState(0)
 const [flag, setFlag] = useState(1);

 const showCart = () => {
    dispatch({
        type: actionType.SET_CART_SHOW,
        cartShow: !cartShow
    });
  };

  useEffect(( ) => {
    let totalPrice = cartItems.reduce(function (acc, item) {
        return acc + item.quantity * item.price;
    },0);

    setTotal(totalPrice);
    console.log(totalPrice)
  },[total,flag])

  return (
    <motion.div 
     initial = {{opacity: 0, x: 200}}
     animate = {{opacity: 1, x: 0}}
     exit    = {{opacity: 0, x: 200}}
     className='fixed top-0 right-0 w-full md:w-375 h-screen bg-white drop-shadow-md flex flex-col z-[101] '>
        <div className='w-full flex items-center justify-between p-4 cursor-pointer'>
            <motion.div 
             whileTap={{scale:0.75}} 
             onClick={showCart}>
                <MdOutlineKeyboardBackspace className='text-textColor text-3xl'/>
            </motion.div>
            <p className='text-textColor text-lg font-semibold'>
                Cart
            </p>

            <motion.p 
             whileTap={{scale:0.75}} 
             className='flex items-center gap-2 p-1 px-2 bg-gray-100 rounded-md hover:shadow-md duration-100 ease-in-out transition-all cursor-pointer text-textColor text-base'>
                Clear <RiRefreshFill /> {" "}
            </motion.p>
        </div>
        {cartItems && cartItems?.length > 0 ? (
            // bottom section
            <div className=' w-full h-full bg-cartBg rounded-t-[1rem] flex flex-col'>
                {/* cart items section */}
                <div className='w-full h-600 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none'>
                    {/* cart item */}

                    {cartItems && cartItems.map((cartItem) => (
                      <CartItem  
                        key={cartItem?.id} 
                        item={cartItem} 
                        setFlag={setFlag} 
                        flag={flag}
                      />
                    ))}
                    
                </div>
                    {/* total section */}
                <div className='w-full flex-1 bg-cartTotal rounded-t-[1rem] flex flex-col items-center justify-evenly px-8 py-2'>
                    {/* subtotal */}
                    <div className='w-full flex items-center justify-between'>
                        <p className='text-gray-400 text-lg '>Sub Total</p>
                        <p className='text-gray-400 text-lg '>${total}</p>
                    </div>
                    {/* delivery price */}
                    <div className='w-full flex items-center justify-between'>
                        <p className='text-gray-400 text-lg '>Delivery</p>
                        <p className='text-gray-400 text-lg '>$3</p>
                    </div>

                    <div className='w-full border-b border-gray-600 my-2' ></div>
                    
                    <div className='w-full flex items-center justify-between'>
                        <p className='text-gray-200 text-xl font-semibold '>Total</p>
                        <p className='text-gray-200 text-xl font-semibold '>${total + 3}</p>
                    </div> 
                    
                    {user  ? (
                        <motion.button
                         className='w-full p-2 rounded-full bg-orange-500 hover:bg-orange-600   text-gray-50 text-lg my-2 hover:shadow-lg transition-all duration-150 ease-out '
                         whileTap={{scale:0.8}}
                         type='button'
                        >
                            Check out
                        </motion.button>
                    ) : (
                        <motion.button
                         className='w-full p-2 rounded-full bg-orange-500 hover:bg-orange-600   text-gray-50 text-lg my-2 hover:shadow-lg transition-all duration-150 ease-out '
                         whileTap={{scale:0.8}}
                         type='button'
                       >
                           Login to check out
                       </motion.button> 
                    )}

                    
                </div>
            </div>
            
        ) : ( 
            <div className='w-full h-full flex flex-col items-center justify-center gap-6'>
                <img 
                 className='w-300'
                 src={EmptyCart} 
                 alt="" />
                 <p className='text-xl text-textColor font-semibold'>
                    Add some items to your cart
                 </p>
            </div>
         )}
       
        
    </motion.div>
  )
}

export default CartContainer