import React, { useEffect, useState } from 'react'
import {IoFastFood} from 'react-icons/io5'
import {categories} from '../utils/data'
import {motion} from 'framer-motion'
import RowContainer from './RowContainer'
import {useStateValue} from './context/StateProvider'

function MenuContainer() {

    const [filter, setFilter] = useState('chicken');
    const [{foodItems}, dispatch] = useStateValue();

  return (
    <section className='w-full mt-5' id='menu'>
        <div className='w-full flex flex-col items-center justify-center'>
            <p className='text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-16 before:h-1 before:-bottom-1 before:left-0 before:bg-gradient-to-r from-orange-400 to-orange-500 transition-all ease-in-out duration-100 mr-auto'>
                Our Hot Dishes
            </p>

            <div className='w-full flex items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll scrollbar-none'>
                {categories && categories.map(cat => (
                    <motion.div whileTap={{scale: 0.75}}
                     key={cat.id} 
                     className={`group ${filter === cat.urlParamName ? 'bg-red-600' : 'bg-white'} w-24 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center justify-center hover:bg-red-600 `}
                    onClick={() => setFilter(cat.urlParamName)} 
                    >
                        <div 
                         className={`w-10 h-10 rounded-full 
                            ${filter === cat.urlParamName ? 'bg-white' : 'bg-red-600'}
                          group-hover:bg-white flex items-center justify-center`}
                        >
                            <IoFastFood 
                             className={`${filter === cat.urlParamName ? 'text-textColor' : 'text-white'} group-hover:text-textColor text-xl`}/>
                        </div>
                        <p 
                         className={`text-sm ${filter === cat.urlParamName ? 'text-white' : 'text-textColor'}`}>
                            {cat.name}
                        </p>
                    </motion.div>
                ))}
            </div>

            <div className='w-full'>
                <RowContainer flag={false} data={foodItems?.filter(item  => item.category == filter)} />
            </div>
        </div>
    </section>
  )
}

export default MenuContainer


{/*  */}