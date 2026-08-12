import React, { useEffect, useState } from 'react'
import { ChevronDown, ChevronUp, } from 'lucide-react';
import { Link } from 'react-router';
import { useGetCategories } from './../../features/products/hooks/useGetCategories';
import Dropdown from './../ui/Dropdown';
import { apiCustomer } from '../../api/apiCustomer';
import { FaStar } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import sidebarAd from '../../assets/images/sidebar-ad.webp' 

const CheckBox = ( {filter, selectedItems, setSelectedItems} ) => {
   const filterName = typeof filter === 'string' ? filter : filter?.name || '';
   const filterId = filterName.replace(/\s+/g, '-').toLowerCase();
 const checked = selectedItems?.includes(filterName) || false

  const handleChange = () => {
    setSelectedItems((current) => {
      if (current.includes(filterName)) {
        return current.filter(
          (item) => item !== filterName
        )
      }
      return [...current, filterName]
    })
  }

   return (
     <div className="flex items-center gap-2 group">
        <input
        onChange={handleChange}
            type="checkbox"
            id={filterId}
            className="peer hidden"
        />

        <label
            htmlFor={filterId}
            className="
      w-4 h-4
      border-1 border-gray-400
      rounded-sm
      bg-white
      cursor-pointer
      flex items-center justify-center
      group-hover:text-yellow-400
      text-transparent
      peer-checked:bg-yellow-400
      peer-checked:text-white
      group-hover:border-yellow-400
      peer-checked:border-yellow-400
      transition-all duration-200
    "
        >
            ✓
        </label>

        <label
            htmlFor={filterId}
            className="
      cursor-pointer
      select-none
      text-tcolor
      transition-colors duration-200
    "
        >
            {filterName}
        </label>
    </div>
   )
}

const ProSidebar = ({active, setActive, activeChild, setActiveChild, selectedBrands, setSelectedBrands, selectedColors, setSelectedColors}) => {
    const [latest, setLatest] = useState()
    const [expanded, setExpanded] = useState(false);
    const [expandedColors, setExpandeColors] = useState(false);
    const { data: cat, isLoading, isError, error } = useGetCategories()

    const brands = active?.filters?.brands
    const colors = active?.filters?.colors
    const visibleBrands = expanded ? brands : brands?.slice(0, 5);

    const handleClick = (name) => {
        const clicked = cat?.data?.find((item) => item.name === name)
        setActive(clicked)
        setActiveChild(undefined);
        setSelectedBrands([]);
        setSelectedColors([]);
    }
    
    useEffect(()=>{
        const fetchData = async()=>{
            try {
                const res = await apiCustomer.get('/api/products')
                setLatest(res.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
            
        }
        fetchData()
    },[])

    const rating = (rate) =>{
        const fullRating = Math.floor(rate)
        let rateVisual = []
        for(let i = 0; i < 5; i++){
            if(i<fullRating){
                rateVisual.push(<FaStar  className='text-primary' key={i} />)
            }else{
                rateVisual.push(<FaRegStarHalfStroke className='text-primary' key={i}/>)
            }
        }
        
        return rateVisual
    }

    if (isLoading) return ' loading....'

    return (
        <div className=' w-full'>
            <div className='border-[2px]  pt-3 border-gray-300 rounded '>
                <Dropdown title={'Show All Categories'}
                    icon={<ChevronDown size={20} />}
                    icon2={<ChevronUp size={20} />}
                    duration={'duration-400'}
                    titleCls='text-tcolor font-pop pl-5 pb-4 font-medium '>
                    <hr className='text-gray-300' />
                    <div className='px-3'>
                        {cat?.data
                            ?.filter((category) => category.name !== active?.name).map((cat) => (
                                <Link key={cat._id} onClick={() => handleClick(cat.name)} className='font-pop flex text-[15px] items-center gap-2  text-tcolor border-b border-b-gray-200 pl-6 py-2'>{cat.name}
                                    <span className='font-pop text-[12px] text-gray-400 font-normal'>({cat.count})</span>
                                </Link>
                            ))}
                    </div>
                </Dropdown>
                {active &&
                    <>
                        <div className={`border-t border-t-gray-300 font-semibold pl-6 font-pop border-b border-b-gray-300  pt-4 pb-2 `}>{active.name}
                            <span className='font-pop text-[12px] text-gray-400 font-normal pl-2'>({active.count})</span>
                        </div>
                        {active.children &&
                            active.children.map((child) => (
                                <div key={child._id} onClick={()=>{setActiveChild(child.name); setSelectedBrands([]); setSelectedColors([]);}} className='font-pop flex text-[15px] items-center gap-2  text-tcolor border-b mx-3 border-b-gray-200 pl-7 py-2 cursor-pointer'>{child.name}
                                    <span className='font-pop  text-[12px] text-gray-400 font-normal pl-2'>({child.count})</span>
                                </div>
                            ))
                        }
                    </>
                }
            </div>
            <div>
                {brands && (
                    <>
                        <div className="border-b border-b-gray-300 pb-3 pt-8 mb-5 ">
                            <span className="font-medium text-[18px] text-tcolor border-b-[2px] border-b-primary pb-[13px]">
                                Filters
                            </span>
                        </div>

                       <div className='pb-4'>
                         <h2 className="font-bold font-pop text-tcolor text-[14px] pb-2">
                            Brands
                        </h2>

                        {brands.slice(0, 5).map((filter) => (
                           <CheckBox key={filter.name || filter} filter={filter} selectedItems={selectedBrands} setSelectedItems={setSelectedBrands}/>
                        ))}

                        <div
                            className={`grid transition-all duration-500 ease-in-out ${expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                                }`}
                        >
                            <div className="overflow-hidden">
                                <div
                                className={`grid transition-all duration-500 ease-in-out ${expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                                    }`}
                            >
                                {brands.slice(5).map((filter) => (
                                   <CheckBox key={filter.name || filter} filter={filter} selectedItems={selectedBrands} setSelectedItems={setSelectedBrands}/>
                                ))}
                            </div>
                            </div>
                        </div>
                       </div>

                        {brands.length > 5 && (
                            <button
                                type="button"
                                className="cursor-pointer pt-3 font-semibold font-pop pb-3"
                                onClick={() => setExpanded((prev) => !prev)}
                            >
                                {expanded ? "− Show less" : "+ Show more"}
                            </button>
                        )}
                    </>
                )}

                <div className={`border-t border-t-gray-300 pb-5 ${colors && colors.length > 0 && 'border-b border-b-gray-300'}`}>
                    {colors && colors.length > 0 &&
                        <>
                            <h2 className="font-bold font-pop text-tcolor text-[14px] pb-2 pt-4">
                                Colors
                            </h2>
                            {colors?.slice(0, 5).map((color) => (
                               <CheckBox key={color.name || color} filter={color} selectedItems={selectedColors} setSelectedItems={setSelectedColors}/>
                            ))}

                            <div
                                className={`grid transition-all duration-500 ease-in-out ${expandedColors ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                                    }`}
                            >
                                <div className="overflow-hidden">
                                    {colors.slice(5).map((color) => (
                                       <CheckBox key={color.name || color} filter={color} selectedItems={selectedColors} setSelectedItems={setSelectedColors}/>
                                    ))}
                                </div>
                            </div>

                            {colors.length > 5 && (
                                <button
                                    type="button"
                                    className="cursor-pointer pt-3 font-semibold font-pop"
                                    onClick={() => setExpandedColors((prev) => !prev)}
                                >
                                    {expandedColors ? "− Show less" : "+ Show more"}
                                </button>
                            )}
                        </>
                    }
                </div>
                        <img src={sidebarAd} alt="sidebar-Ad" className='pt-6' />
              <div className='pt-10 font-pop'>
                 <div className="border-b border-b-gray-300 pb-3 mb-8 ">
                            <span className="font-medium text-[18px] text-tcolor border-b-[2px] border-b-primary pb-[13px]">
                                Latest Products
                            </span>
                        </div>
                {latest?.data?.slice(0,5).map(item =>(
                    <div key={item._id} className='flex gap-4 leading-none pb-5'>
                        <img src={item.image} alt={item.image} loading='lazy' className='w-20 h-auto' />
                         <div>
                            <span className='text-[14px] line-clamp-2 text-gray-500 font-medium'>{item.name}</span>
                            {item.rating && 
                             <div className='flex py-2'>{rating(item?.rating)}</div>
                            }
                         <span className='font-semibold text-[15px]'>${item.price}</span>
                         </div>
                    </div>
                ))}
              </div>
            </div>
        </div>
    )
}

export default ProSidebar