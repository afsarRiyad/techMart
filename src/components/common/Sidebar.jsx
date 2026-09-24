import React, { useRef, useState } from 'react'
import { menu } from '@/data/navigation'
import { ChevronDown, ChevronUp, Moon, Sun, X  } from 'lucide-react';
import useOutsideClick from '@/hooks/useOutsideClick';
import Logo from '@/assets/images/logo.svg?react'
import LogoWhite from '@/assets/images/LogoWhite.svg?react'
import useScrollBlocker from '@/hooks/useScrollBlocker';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { useTheme } from '@/features/theme/ThemeProvider';
import { useGetCategories } from '@/features/product/hooks/useGetCategories';
import { setSearch, setActiveCategory, setActiveChildCategory, resetFilters } from '@/features/product/productPageSlice';

// The drawer is a static tree of 180+ marketing names while the api knows only
// nine categories, so links are resolved in three steps: a small alias table for
// the groups that clearly mean one category, then the api's own names, then a
// loose word match. Anything still unmatched opens the shop with that name as
// the search term, which is far more useful than a link to the whole catalogue.
const ALIASES = {
  'computers and accessories': 'laptops-computers',
  'components': 'computer-components',
  'laptops desktops and monitors': 'laptops',
  'desktop monitors': 'laptops',
  'mobile and tablets': 'smart-phones-tablets',
  'camera': 'cameras',
  'gadget': 'gadgets',
  'watches and eyewear': 'smartwatches',
  'video games': 'video-games-consoles',
  'game console': 'game-consoles',
  'audio speakers': 'audio-speakers',
  'home theater systems': 'home-theater-systems',
}

// words that carry no meaning for matching, and the plural shortening that turns
// "Cameras" into "Camera" so a label and a category name can still meet
const NOISE = new Set(['and', 'the', 'all', 'of', 'for', 'misc', 'other', 'shop', 'products'])
const singular = (word) => word.replace(/ies$/, 'y').replace(/s$/, '')
const normalize = (value) =>
  (value || '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
const wordsOf = (value) =>
  normalize(value)
    .split(' ')
    .filter(Boolean)
    .map(singular)
    .filter((word) => !NOISE.has(word))
const Hamberger = ({ className = '' }) => {
  const menuRef = useRef(null)
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false)
  // the side switch is desktop only, so the drawer carries the phone one
  const { isDark, toggleTheme } = useTheme()
  useOutsideClick(menuRef, () => { setSideDrawerOpen(false); setActiveIndex(null); }, sideDrawerOpen)
  useScrollBlocker(sideDrawerOpen)
  const [activeIndex, setActiveIndex] = useState(null)
  const [activeItem, setActiveItem] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { data: catData } = useGetCategories()
  const categories = catData?.data ?? []

  const handleclick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  }

  // every api category and child, flattened, with the parent slug kept so a child
  // can be linked as /category/<parent>/<child>
  const entries = categories.flatMap((cat) => [
    { name: cat.name, slug: cat.slug, parentSlug: null },
    ...(cat.children ?? []).map((child) => ({
      name: child.name,
      slug: child.slug,
      parentSlug: cat.slug,
    })),
  ])

  const byExactName = (name) => {
    const wanted = normalize(name)
    return entries.find((entry) => normalize(entry.name) === wanted)
  }

  // "Casing" and "Computer Cases" are one word apart, so a match needs most of the
  // category's words to be present before we trust it
  const byWords = (name) => {
    const wanted = wordsOf(name)
    if (!wanted.length) return null
    let best = null
    let bestScore = 0
    for (const entry of entries) {
      const target = wordsOf(entry.name)
      if (!target.length) return null
      const shared = target.filter((word) => wanted.includes(word)).length
      const score = shared / target.length
      if (shared > 0 && score > bestScore) {
        best = entry
        bestScore = score
      }
    }
    return bestScore >= 0.6 ? best : null
  }

  const findTarget = (item) => {
    if (item.url) return { link: item.url }
    const alias = ALIASES[normalize(item.name)]
    if (alias) return { entry: entries.find((entry) => entry.slug === alias) }
    return { entry: byExactName(item.name) ?? byWords(item.name) }
  }

  // the store, not the url, decides what the products page shows, so the search
  // term and the category are pressed in here and then we navigate
  const openItem = (item) => {
    const { link, entry } = findTarget(item)
    dispatch(resetFilters())
    dispatch(setActiveCategory(null))
    dispatch(setActiveChildCategory(null))
    if (link) {
      navigate(link)
    } else if (entry?.parentSlug) {
      dispatch(setSearch(''))
      navigate(`/category/${entry.parentSlug}/${entry.slug}`)
    } else if (entry?.slug) {
      dispatch(setSearch(''))
      navigate(`/category/${entry.slug}`)
    } else {
      dispatch(setSearch(item.name))
      navigate('/products')
    }
    setSideDrawerOpen(false)
  }
  return (
    < >
      <button aria-label="toggle" className={`flex flex-col w-auto gap-[6px] ${className} cursor-pointer`} onClick={() => setSideDrawerOpen(!sideDrawerOpen)}>
        <span className={`w-6 h-[2px] transition-transform duration-300 ease-in-out bg-black lg:dark:bg-gray-200 ${sideDrawerOpen &&'rotate-50 translate-y-2'}`}> </span>
        <span className={`w-6 h-[2px] transition-transform duration-300 ease-in-out bg-black lg:dark:bg-gray-200 ${sideDrawerOpen &&'opacity-0'}`}> </span>
        <span className={`w-6 h-[2px] transition-transform duration-300 ease-in-out bg-black lg:dark:bg-gray-200 ${sideDrawerOpen &&'-rotate-60 -translate-y-2'}`}> </span>
      </button>
      {/* overlay  */}
      {
        sideDrawerOpen &&
        <div className='bg-black/40 fixed inset-0 z-50 h-screen' onClick={()=> setSideDrawerOpen(false)}/>
      }
      <div ref={menuRef} >
        <div className={`fixed inset-0 dark:bg-[#181818] -translate-x-full bg-white h-screen z-50 pb-4 sm:w-100 w-80 transform transition-all ease-in-out duration-300 shadow-xl overflow-y-auto ${sideDrawerOpen &&'translate-x-0'}`}>
          {isDark ?
            <LogoWhite className='w-25 h-auto pt-6 pb-2 px-2' /> :
            <Logo className='w-25 h-auto pt-6 pb-2 px-2' />
          }
          <X aria-label='close menu' className='absolute cursor-pointer right-4 top-6 text-tcolor dark:text-gray-100 dark:text-gray-200' onClick={()=> setSideDrawerOpen(false)}/>
          <button
            type='button'
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className='mx-3 mb-2 mt-1 flex min-h-11 w-[calc(100%-1.5rem)] cursor-pointer items-center justify-between rounded-xl border border-gray-200 px-4 font-inter text-[14px] text-gray-900 dark:text-gray-100 transition-colors duration-200 hover:bg-gray-100 dark:border-[#333333] dark:text-gray-200 dark:hover:bg-[#212121]'
          >
            <span className='flex items-center gap-2'>
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
              {isDark ? 'Light mode' : 'Dark mode'}
            </span>
            <span aria-hidden='true' className={`relative h-5 w-10 rounded-full transition-colors duration-300 ${isDark ?'bg-primary' : 'bg-gray-300 dark:bg-gray-600'}`}>
              <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all duration-300 ${isDark ?'left-5.5' : 'left-0.5'}`} />
            </span>
          </button>
          <ul>
            {
              menu.map((item, index) => (
                <li key={index} className={`sm:px-3 dark:text-gray-100 px-1 select-none text-[14px] sm:text-[#333E48] text-gray-900 font-inter border-b border-b-gray-200 dark:border-b-[#333333] py-1 ${item.hasChild === false &&'hover:bg-gray-100 hover:text-black dark:hover:bg-[#2a2a2a] dark:hover:text-gray-100 transition-all'} ${activeItem == item && 'bg-primary text-black'}`}>
                  {item.hasChild === false ? (
                    // a leaf category is a link, not an accordion with nothing in it
                    <button
                      type='button'
                      className='flex accordionHeading items-center justify-between w-full h-[38px] pr-2 cursor-pointer text-left transition-all hover:text-black dark:hover:text-gray-100'
                      onClick={() => openItem(item)}
                    >
                      {item.name}
                    </button>
                  ) : (
                    <button aria-label={`Toggle ${item.name}`} className={`flex accordionHeading items-center justify-between cursor-pointer w-full h-[38px] pr-2 transition-all hover:text-black dark:hover:text-gray-100`}  onClick={(e) => { handleclick(index); e.stopPropagation(); setActiveItem(item) }}>
                      {item.name}
                      <span><ChevronDown className={`${activeIndex === index ?'rotate-180' : 'rotate-0'} transform transition-transform duration-300 `} /></span>
                    </button>
                  )}
                  {item.children &&
                    <div className={`grid grid-rows-[0fr] opacity-0 transform transition-all ease-in-out duration-300 ${activeIndex === index &&'grid-rows-[1fr] opacity-100 pointer-events-auto'}`}>
                      <div className='overflow-hidden'>
                        <ul className='bg-gray-100 dark:bg-[#1c1c1c] rounded-2xl'>
                          {item.children.map((child, i) => (
                            <li key={i} className={`relative z-10 border-b border-b-gray-300 last:border-0 font-inter sm:text-gray-600 sidebarLiHover ${child.isBold &&'font-bold'}`}>
                              <button
                                type='button'
                                onClick={() => openItem(child)}
                                className='block w-full cursor-pointer py-[9px] px-4 text-left'
                              >
                                {child.name}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  }

                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </>
  )
}

export default Hamberger
