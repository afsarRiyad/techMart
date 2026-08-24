import React, { useState, useCallback, useEffect } from 'react'
import SidebarContent from '@/components/product/ProductSidebar/index'
import Container from '@/components/layout/Container'
import { X } from 'lucide-react'

const SidebarLayout = ({ children, showSidebar = true }) => {
  const [active, setActive] = useState()
  const [activeChild, setActiveChild] = useState()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const closeSidebar = useCallback(() => setSidebarOpen(false), [])

  useEffect(() => {
    if (sidebarOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [sidebarOpen])

  return (
    <Container className="pb-3 ">
      {showSidebar && (
        <>
          {/* Mobile backdrop */}
          <div
            className={`fixed inset-0 z-[60] bg-black/50 transition-opacity duration-300 lg:hidden ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onClick={closeSidebar}
          />

          {/* Mobile slide-in drawer */}
          <div
            className={`fixed inset-y-0 left-0 z-[70] w-[300px] overflow-y-auto bg-white shadow-xl transition-transform duration-300 ease-in-out lg:hidden dark:bg-gray-900 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
          >
            <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
              <span className="font-medium text-tcolor dark:text-white">Filters</span>
              <button onClick={closeSidebar} className="cursor-pointer rounded p-1 text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white"><X size={20} /></button>
            </div>
            <div className="p-4">
              <SidebarContent active={active} setActive={setActive} activeChild={activeChild} setActiveChild={setActiveChild} onClose={closeSidebar} />
            </div>
          </div>
        </>
      )}

      <div className="flex w-full gap-8">
        {showSidebar && (
          <aside className="w-[20%] shrink-0 pt-4 hidden lg:block">
            <SidebarContent active={active} setActive={setActive} activeChild={activeChild} setActiveChild={setActiveChild} onClose={closeSidebar} />
          </aside>
        )}
        <div className={showSidebar ? "flex-1 min-w-0 pt-4" : "w-full pt-4"}>
          {children({
            active,
            setActive,
            activeChild,
            setActiveChild,
            onOpenSidebar: () => setSidebarOpen(true),
          })}
        </div>
      </div>
    </Container>
  )
}

export default SidebarLayout
