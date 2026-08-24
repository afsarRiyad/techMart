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

  const segments = location.pathname.split('/').filter(Boolean)

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
    <div className="border-b border-gray-200 text-[15px] dark:border-gray-700">
      <Container>
        <div className="px-3 py-4 lg:px-5">
          <ul className="flex items-center gap-3">

            {/* Home */}
            <li className="rounded hover:bg-black/10">
              <Link
                to="/"
                aria-label="Go to home page"
                className="flex items-center font-inter tracking-widest dark:text-white"
              >
                <House size={20} />
              </Link>
            </li>

            {/* Breadcrumb items */}
            {breadcrumbs.map((item, index) => {
              const isLast = index === breadcrumbs.length - 1

              return (
                <li
                  key={`${item.name}-${index}`}
                  className="flex items-center gap-2"
                >
                  <ChevronRight
                    size={20}
                    className="dark:text-white"
                  />

                  {isLast || !item.url ? (
                    <span className="font-inter tracking-widest text-[#29323A] dark:text-white">
                      {item.name}
                    </span>
                  ) : (
                    <Link
                      to={item.url}
                      className="rounded-md bg-gray-200 px-3 py-2 font-inter tracking-widest text-[#29323A] transition-all hover:bg-black/20 dark:bg-white/20 dark:text-white dark:hover:bg-white/10"
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