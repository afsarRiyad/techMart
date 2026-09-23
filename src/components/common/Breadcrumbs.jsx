import React from 'react'
import { Link, useLocation } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import Container from '@/components/layout/Container'
import { House, ChevronRight } from 'lucide-react'
import { getCategories } from '@/features/product/services/productService'
import { apiCustomer } from '@/api/apiCustomer'

const capitalize = (text = '') =>
  text
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

const Breadcrumbs = ({ items = [] }) => {
  const location = useLocation()

  const segments = location.pathname
    .split('/')
    .filter(Boolean)
    .map((segment) => {
      // category names arrive percent encoded in the path
      try {
        return decodeURIComponent(segment)
      } catch {
        return segment
      }
    })

  const isProductPage =
    segments[0] === 'products' && segments[1]

  const isCategoryPage =
    segments[0] === 'category' && segments[1]

  const productSlug = isProductPage ? segments[1] : null
  const categorySlug = isCategoryPage ? segments[1] : null
  const childSlug = isCategoryPage ? segments[2] : null

  // Categories
  const { data: categoryData } = useQuery({
    queryKey: ['categories', 'hierarchical'],
    queryFn: getCategories,
    enabled: Boolean(isCategoryPage || isProductPage),
  })

  // Product
  const { data: product } = useQuery({
    queryKey: ['product', productSlug],
    queryFn: async () => {
      const response = await apiCustomer.get(
        `/api/products/${productSlug}`
      )

      return response.data?.data
    },
    enabled: Boolean(productSlug),
    staleTime: 5 * 60 * 1000,
  })

  const categories = categoryData?.data ?? []

  const buildBreadcrumbs = () => {
    // Manually provided breadcrumbs
    if (items.length > 0) {
      return items.map((item, index) => {
        const isLast = index === items.length - 1

        return {
          name: item.name,
          url: isLast
            ? null
            : `/category/${items
                .slice(0, index + 1)
                .map((item) => item.slug)
                .join('/')}`,
        }
      })
    }

    // Product page
    if (isProductPage && product) {
      const productCategories = product.categories ?? []

      const parentName = productCategories[0]
      const childName = productCategories[1]

      const breadcrumbs = []

      const parentCategory = categories.find(
        (category) => category.name === parentName
      )

      if (parentCategory) {
        breadcrumbs.push({
          name: parentCategory.name,
          url: `/category/${parentCategory.slug}`,
        })

        if (childName && parentCategory.children) {
          const childCategory = parentCategory.children.find(
            (child) => child.name === childName
          )

          if (childCategory) {
            breadcrumbs.push({
              name: childCategory.name,
              url: `/category/${parentCategory.slug}/${childCategory.slug}`,
            })
          }
        }
      }

      breadcrumbs.push({
        name: product.name,
        url: null,
      })

      return breadcrumbs
    }

    // Category + child
    if (isCategoryPage && categorySlug && childSlug) {
      const parentCategory = categories.find(
        (category) => category.slug === categorySlug
      )

      const breadcrumbs = []

      if (parentCategory) {
        breadcrumbs.push({
          name: parentCategory.name,
          url: `/category/${parentCategory.slug}`,
        })
      }

      breadcrumbs.push({
        name: capitalize(childSlug),
        url: null,
      })

      return breadcrumbs
    }

    // Category
    if (isCategoryPage && categorySlug) {
      const category = categories.find(
        (category) => category.slug === categorySlug
      )

      if (category) {
        return [
          {
            name: category.name,
            url: null,
          },
        ]
      }

      // the segment can also be a child category
      for (const parent of categories) {
        const child = parent.children?.find((item) => item.slug === categorySlug)

        if (child) {
          return [
            { name: parent.name, url: `/category/${parent.slug}` },
            { name: child.name, url: null },
          ]
        }
      }

      // unknown segment, show it but never link back to /category
      return [
        {
          name: capitalize(categorySlug),
          url: null,
        },
      ]
    }

    // Fallback
    return segments.map((segment, index) => {
      const isLast = index === segments.length - 1

      return {
        name: capitalize(segment),
        url: isLast
          ? null
          : `/${segments.slice(0, index + 1).join('/')}`,
      }
    })
  }

  const breadcrumbs = buildBreadcrumbs()

  if (breadcrumbs.length === 0) {
    return null
  }

  return (
    <div className="border-b border-gray-200 dark:border-[#333333] text-[15px] dark:border-gray-700">
      <Container>
        <div className="px-3 py-3 lg:px-5 lg:py-4">
          <ul className="flex items-center gap-2 overflow-x-auto whitespace-nowrap lg:gap-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

            {/* Home */}
            <li className="shrink-0 rounded hover:bg-black/10">
              <Link
                to="/"
                aria-label="Go to home page"
                className="flex items-center font-inter tracking-widest dark:text-gray-100"
              >
                <House size={20} />
              </Link>
            </li>

            {/* small screens hide the middle steps, this keeps the trail readable */}
            {breadcrumbs.length > 2 && (
              <li className="flex shrink-0 items-center gap-2 sm:hidden">
                <ChevronRight size={20} className="dark:text-gray-100" />
                <span className="font-inter tracking-widest text-gray-400">…</span>
              </li>
            )}

            {/* Breadcrumb items */}
            {breadcrumbs.map((item, index) => {
              const isLast = index === breadcrumbs.length - 1
              // phones show the current step only, the rest is behind the "..."
              const showOnMobile = isLast

              return (
                <li
                  key={`${item.name}-${index}`}
                  className={`items-center gap-2 ${showOnMobile ?'flex' : 'hidden sm:flex'} ${isLast ? 'min-w-0' : 'shrink-0'}`}
                >
                  <ChevronRight
                    size={20}
                    className="shrink-0 dark:text-gray-100"
                  />

                  {isLast || !item.url ? (
                    <span className="block truncate font-inter tracking-widest text-[#29323A] dark:text-gray-100">
                      {item.name}
                    </span>
                  ) : (
                    <Link
                      to={item.url}
                      className="inline-block truncate max-w-[40vw] rounded-md bg-gray-200 dark:bg-[#333333] px-3 py-2 font-inter tracking-widest text-[#29323A] transition-all hover:bg-black/20 dark:text-gray-100 dark:hover:bg-white/10 sm:max-w-none"
                    >
                      {item.name}
                    </Link>
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