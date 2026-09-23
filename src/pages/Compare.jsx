import { useCallback, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { X } from 'lucide-react'
import { useCompare } from '@/features/compare/hooks/useCompare'
import { useRemoveCompare } from '@/features/compare/hooks/useRemoveCompare'
import { useAddToCart } from '@/features/cart/hooks/useAddToCart'

// api value helpers -------------------------------------------------------

const empty = (value) => value === null || value === undefined || value === ''

// specifications hold name/value/unit, e.g. { name: "Weight", value: 45, unit: "g" }
const specOf = (item, name) => {
  const spec = (item.specifications || []).find((entry) => entry.name?.toLowerCase() === name)
  if (!spec || empty(spec.value)) return null
  return spec.unit ? `${spec.value} ${spec.unit}` : `${spec.value}`
}

// customAttributes is the flexible bag, value can be a list
const attrOf = (item, name) => {
  const attr = (item.customAttributes || []).find((entry) => entry.name?.toLowerCase() === name)
  if (!attr || empty(attr.value)) return null
  return Array.isArray(attr.value) ? attr.value.join(', ') : `${attr.value}`
}

const colorOf = (item) => {
  const attr = (item.customAttributes || []).find(
    (entry) => entry.type === 'color' || /^colou?r$/i.test(entry.name || ''),
  )
  const value = attr ? (Array.isArray(attr.value) ? attr.value.join(', ') : attr.value) : null
  return specOf(item, 'color') || (empty(value) ? null : `${value}`)
}

// a product column never squeezes narrower than this, the table scrolls instead
const PRODUCT_COLUMN_MIN = 210
const LABEL_COLUMN_MIN = 300

// phones have room for two products, side by side and still readable
const PHONE_LIMIT = 2

const money = (value) =>
  `$${(value ?? 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

const stockOf = (item) => (item.stock > 0 ? `${item.stock} in stock` : 'Out of stock')

// the rows the design asks for, in its order
const designRows = [
  { label: 'Price', value: (item) => money(item.price), strong: true },
  { label: 'SKU', value: (item) => item.sku || '-' },
  { label: 'Availability', value: stockOf, stock: true },
  { label: 'Weight', value: (item) => specOf(item, 'weight') || '-' },
  { label: 'Dimensions', value: (item) => specOf(item, 'dimensions') || '-' },
  { label: 'Brands', value: (item) => item.brand || '-' },
  { label: 'Color', value: (item) => colorOf(item) || '-' },
]

// the design has fixed rows; anything else the api carries is added so
// comparing two random products still shows the specs they do have
const extraRows = (items) => {
  const taken = new Set(['weight', 'dimensions', 'color'])
  const names = []
  const add = (name) => {
    const key = name?.toLowerCase()
    if (!key || taken.has(key) || names.some((entry) => entry.toLowerCase() === key)) return
    names.push(name)
  }

  items.forEach((item) => {
    ;(item.specifications || []).forEach((spec) => add(spec.name))
    ;(item.customAttributes || []).forEach((attr) => add(attr.name))
  })

  return names.map((name) => ({
    label: name,
    value: (item) => specOf(item, name.toLowerCase()) || attrOf(item, name.toLowerCase()) || '-',
  }))
}

// one table, rendered twice: the two up phone view and the full list
const SpecTable = ({ items, rows, onRemove, onAddToCart, className = '', minWidth }) => (
  <div className={`w-full overflow-x-auto ${className}`}>
    <table
      className='w-full table-fixed border-collapse text-center align-middle'
      style={minWidth ? { minWidth: `${minWidth}px` } : undefined}
    >
      <thead>
        <tr>
          {/* the label corner stays put while both axes scroll */}
          <th className='sticky left-0 top-0 z-30 w-[96px] bg-white/90 dark:bg-[#212121]/95 sm:w-[300px]' />

          {/* product columns carry no width, table-fixed hands them the leftover room */}
          {items.map((item) => (
            <th key={item._id} className='sticky top-0 z-20 bg-white/90 px-2 pt-6 align-bottom dark:bg-[#212121]/95'>
              <div className='relative flex flex-col items-center gap-3'>
                <button
                  type='button'
                  aria-label={`Remove ${item.name || 'product'} from compare`}
                  onClick={() => onRemove(item._id)}
                  className='absolute -right-1 -top-3 cursor-pointer text-gray-400 transition-colors duration-200 hover:text-black dark:hover:text-gray-100'
                >
                  <X size={18} />
                </button>

                <div className='flex h-[100px] w-full items-center justify-center sm:h-[190px]'>
                  {item.pending || !item.image ? (
                    // added but the response is still on its way
                    <span aria-hidden='true' className='h-full w-full animate-pulse rounded bg-gray-100 dark:bg-[#1c1c1c] dark:bg-[#2c2c2c]' />
                  ) : (
                    <Link to={`/products/${item.slug || item._id}`} className='flex h-full w-full items-center justify-center'>
                      <img
                        src={item.image}
                        alt={item.name}
                        loading='lazy'
                        className='max-h-full max-w-full object-contain'
                      />
                    </Link>
                  )}
                </div>

                <Link
                  to={`/products/${item.slug || item._id}`}
                  className='text-[13px] font-medium leading-5 text-tcolor transition-colors duration-200 hover:text-black sm:text-[15px] dark:text-gray-100 dark:hover:text-gray-100'
                >
                  {item.name}
                </Link>

                <button
                  type='button'
                  onClick={() => onAddToCart(item._id)}
                  className='rounded-full bg-primary px-4 py-1.5 text-[12px] font-semibold text-tcolor transition-colors duration-200 hover:bg-black hover:text-white sm:text-[13px]'
                >
                  Add to cart
                </button>
              </div>
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {rows.map((row) => (
          <tr key={row.label}>
            <td className='sticky left-0 z-10 border-b border-gray-200 dark:border-[#333333] bg-white/90 py-4 pr-3 text-left text-[13px] font-semibold text-tcolor sm:text-[15px] dark:border-b-[#333333] dark:bg-[#212121]/95 dark:text-gray-100'>
              {row.label}
            </td>

            {items.map((item) => (
              <td
                key={item._id}
                className={`border-b border-gray-200 px-2 py-4 text-[13px] dark:border-b-[#333333] sm:text-[15px] ${
                  row.stock
                    ? item.stock > 0
                      ? 'bg-[#eaf7e5] font-medium text-green-700 dark:bg-[#1d3320] dark:text-green-300'
                      : 'bg-red-50 font-medium text-red-600 dark:bg-[#3a1f1f] dark:text-red-300'
                    : row.strong
                      ? 'font-semibold text-tcolor dark:text-gray-100'
                      : 'text-[#4b5563] dark:text-gray-300'
                }`}
              >
                {row.value(item)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

const Compare = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const removeCompareMutation = useRemoveCompare()
  const addtocartMutation = useAddToCart()
  const { data, isPending } = useCompare()
  const items = data?.data ?? []

  // the panel covers the page, so the page behind it should not scroll
  useEffect(() => {
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [])

  const close = useCallback(() => {
    // back to the page the comparison was opened from, /products on a direct load
    if (location.key !== 'default') navigate(-1)
    else navigate('/products')
  }, [navigate, location.key])

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [close])

  const rows = [...designRows, ...extraRows(items)]
  const remove = (id) => removeCompareMutation.mutate(id)
  const addToCart = (id) => addtocartMutation.mutate({ product: id, quantity: 1 })

  // z-1000 keeps the veiled panel above the sticky header (z-999)
  return (
    <div className='fixed inset-0 z-[1000] flex items-center justify-center bg-white/85 p-[9px] font-pop dark:bg-black/70'>
      <div className='flex h-full w-full flex-col overflow-hidden rounded-lg bg-white/90 shadow-2xl dark:bg-[#181818]/98'>
        <div className='flex shrink-0 items-center justify-between gap-4 border-b border-gray-100 dark:border-[#333333] px-4 py-4 dark:border-b-[#333333] sm:px-8 sm:py-6'>
          <h1 className='text-[20px] font-normal text-tcolor sm:text-[32px] dark:text-gray-100'>Compare products</h1>
          <button
            type='button'
            aria-label='Close comparison'
            onClick={close}
            className='tapTarget cursor-pointer text-tcolor dark:text-gray-100 transition-colors duration-200 hover:text-black dark:text-gray-200 dark:hover:text-gray-100'
          >
            <X size={26} />
          </button>
        </div>

        <div className='flex flex-1 flex-col overflow-y-auto px-4 pb-8 sm:px-8'>
          {isPending ? (
            <p className='py-16 text-center text-[15px] text-gray-400 dark:text-gray-500'>Loading compare list...</p>
          ) : items.length === 0 ? (
            <div className='flex h-full flex-col justify-center py-10 sm:py-16'>
              <div className='relative overflow-hidden rounded bg-primary px-8 py-6 md:px-10'>
                <span className='absolute left-0 top-0 h-full w-1.5 bg-yellow-600' />
                <p className='text-center text-[18px] text-tcolor dark:text-gray-100 md:text-[24px]'>
                  Your compare list is currently empty.
                </p>
              </div>

              <div className='mt-8 flex justify-center'>
                <Link
                  to='/'
                  className='rounded-full bg-gray-100 dark:bg-[#1c1c1c] px-8 py-3 text-[15px] font-medium text-gray-700 transition-colors duration-200 hover:bg-black hover:text-white dark:bg-[#212121] dark:text-gray-200'
                >
                  Return to shop
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* phones compare the first two, so both fit without side scrolling */}
              <SpecTable
                className='sm:hidden'
                items={items.slice(0, PHONE_LIMIT)}
                rows={rows}
                onRemove={remove}
                onAddToCart={addToCart}
              />

              <SpecTable
                className='hidden sm:block'
                items={items}
                rows={rows}
                onRemove={remove}
                onAddToCart={addToCart}
                minWidth={LABEL_COLUMN_MIN + items.length * PRODUCT_COLUMN_MIN}
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Compare
