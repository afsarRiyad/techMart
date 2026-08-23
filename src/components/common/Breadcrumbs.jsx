import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import Container from '@/components/layout/Container'
import { House, ChevronRight } from 'lucide-react'

const Breadcrumbs = ({ items = [] }) => {
  const location = useLocation()
  const navigate = useNavigate()

  const hasBackendBreadcrumbs = items.length > 0

  const pathItems = location.pathname
    .split('/')
    .filter(Boolean)
    .filter((item) => item !== 'category')

  const capitalize = (text = '') => {
    return text
      .split('-')
      .map(
        (word) =>
          word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join(' ')
  }
  const urlBreadcrumbs = pathItems.map((item, index) => {
    const originalSegments = location.pathname.split('/').filter(Boolean)

    const originalIndex =
      originalSegments.indexOf(item)

    const url =
      '/' +
      originalSegments
        .slice(0, originalIndex + 1)
        .join('/')

    return {
      name: capitalize(item),
      slug: item,
      url,
    }
  })

  const breadcrumbs = hasBackendBreadcrumbs
    ? items.map((item, index) => {
        // Build hierarchical URL: /category/parent/child
        const pathSegments = items.slice(0, index + 1).map(i => i.slug)
        const url = `/category/${pathSegments.join('/')}`
        return {
          name: item.name,
          slug: item.slug,
          url,
        }
      })
    : urlBreadcrumbs

  return (
    <div className="border-b border-gray-200 text-[15px] dark:border-gray-700">
      <Container>
        <div className="flex gap-5 px-3 py-4 lg:px-5">
          <ul className="flex items-center gap-3">
            {/* HOME */}
            <li className="rounded hover:bg-black/10">
              <Link
                aria-label="go to home page"
                to="/"
                className="font-inter flex items-center tracking-widest dark:text-white"
              >
                <House size={20} />
              </Link>
            </li>

            {/* BREADCRUMBS */}
            {breadcrumbs.map((item, index) => {

              const isLast =
                index === breadcrumbs.length - 1

              return (

                <li
                  key={`${item.slug}-${index}`}
                  className="flex items-center gap-2"
                >
                  <span className="font-bold dark:text-white">
                    <ChevronRight size={20} />
                  </span>
                  {isLast ? (
                    <span className="font-inter tracking-widest text-[#29323A] dark:text-white">
                      {item.name}
                    </span>

                  ) : (
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        navigate(item.url)
                      }}
                      className="cursor-pointer rounded-md bg-gray-200 px-3 py-2 font-inter tracking-widest text-[#29323A] transition-all hover:bg-black/20 dark:bg-white/20 dark:text-white dark:hover:bg-white/10"
                    >
                      {item.name}
                    </button>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      </Container>
    </div>
  )
}

export default Breadcrumbs