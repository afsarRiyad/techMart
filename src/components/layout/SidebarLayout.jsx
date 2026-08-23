import React, { useState, useEffect } from 'react'
import ProductSidebar from '@/components/product/ProductSidebar'
import Container from '@/components/layout/Container'

const SidebarLayout = ({ children, showSidebar = true }) => {
  const [active, setActive] = useState()
  const [activeChild, setActiveChild] = useState()
  const [selectedBrands, setSelectedBrands] = useState([])
  const [selectedColors, setSelectedColors] = useState([])

  useEffect(() => {
    setSelectedBrands([])
    setSelectedColors([])
  }, [active])

  return (
    <Container className="pb-3 ">
      <div className="flex w-full gap-8">
        {showSidebar && (
          <div className="w-[20%] shrink-0 pt-4 hidden md:flex">
            <ProductSidebar
              active={active}
              setActive={setActive}
              activeChild={activeChild}
              setActiveChild={setActiveChild}
              selectedBrands={selectedBrands}
              setSelectedBrands={setSelectedBrands}
              selectedColors={selectedColors}
              setSelectedColors={setSelectedColors}
            />
          </div>
        )}
        <div className={showSidebar ? "flex-1 min-w-0 pt-4" : "w-full pt-4"}>
          {children({
            active,
            setActive,
            activeChild,
            setActiveChild,
            selectedBrands,
            setSelectedBrands,
            selectedColors,
            setSelectedColors
          })}
        </div>
      </div>
    </Container>
  )
}

export default SidebarLayout
