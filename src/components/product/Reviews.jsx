import React, { useState } from 'react'
import { Star } from 'lucide-react'

const RATING_LABELS = [5, 4, 3, 2, 1]

const Reviews = ({
  productName = 'Wireless Audio System Multiroom 360',
  reviews = [], // [{ rating, comment, name, email, date }]
  onSubmitReview,
}) => {
  const [hoverRating, setHoverRating] = useState(0)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [saveInfo, setSaveInfo] = useState(false)

  const totalReviews = reviews.length

  const averageRating =
    totalReviews === 0
      ? 0
      : reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews

  const countsByStar = RATING_LABELS.reduce((acc, star) => {
    acc[star] = reviews.filter((r) => Math.round(r.rating) === star).length
    return acc
  }, {})

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!rating || !name || !email) return

    onSubmitReview?.({ rating, comment, name, email, saveInfo })

    setRating(0)
    setComment('')
    setName('')
    setEmail('')
    setSaveInfo(false)
  }

  return (
    <div className="w-full font-pop">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Left: rating summary */}
        <div>
          <p className="text-gray-800 dark:text-gray-100 text-[16px] mb-4">
            Based on {totalReviews} review{totalReviews !== 1 ? 's' : ''}
          </p>

          <p className="text-[40px] font-bold text-gray-900 dark:text-gray-100 leading-none">
            {averageRating.toFixed(1)}
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">overall</p>

          <div className="flex flex-col gap-2">
            {RATING_LABELS.map((star) => {
              const count = countsByStar[star]
              const percent = totalReviews ? (count / totalReviews) * 100 : 0

              return (
                <div key={star} className="flex items-center gap-3">
                  <div className="flex shrink-0">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={
                          i < star
                            ? 'fill-primary text-primary'
                            : 'fill-gray-200 text-gray-200'
                        }
                      />
                    ))}
                  </div>

                  <div className="flex-1 h-2 rounded-full bg-gray-200 dark:bg-[#333333] overflow-hidden max-w-[220px]">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${percent}%` }}
                    />
                  </div>

                  <span className="text-gray-500 dark:text-gray-400 text-sm w-4 text-right shrink-0">
                    {count}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right: review form */}
        <div>
          <h3 className="text-[20px] text-gray-800 dark:text-gray-100 mb-6">
            Be the first to review "{productName}"
          </h3>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Rating input */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
              <label className="font-semibold text-gray-800 dark:text-gray-100 shrink-0">
                Your Rating
              </label>
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => {
                  const starValue = i + 1
                  const isFilled = starValue <= (hoverRating || rating)
                  return (
                    <button
                      type="button"
                      key={i}
                      onClick={() => setRating(starValue)}
                      onMouseEnter={() => setHoverRating(starValue)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="focus:outline-none"
                    >
                      <Star
                        size={22}
                        className={
                          isFilled
                            ? 'fill-primary text-primary'
                            : 'fill-transparent text-primary'
                        }
                      />
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Review textarea */}
            <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
              <label className="font-semibold text-gray-800 dark:text-gray-100 shrink-0 sm:pt-3 sm:w-[100px]">
                Your Review
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={5}
                className="flex-1 border border-gray-300 dark:border-[#333333] rounded-2xl px-4 py-3 text-sm resize-none focus:outline-none focus:border-gray-400 max-w-[420px]"
              />
            </div>

            {/* Name */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
              <label className="font-semibold text-gray-800 dark:text-gray-100 shrink-0 sm:w-[100px]">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="flex-1 border border-gray-300 dark:border-[#333333] rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-gray-400 max-w-[420px]"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
              <label className="font-semibold text-gray-800 dark:text-gray-100 shrink-0 sm:w-[100px]">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 border border-gray-300 dark:border-[#333333] rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-gray-400 max-w-[420px]"
              />
            </div>

            {/* Save info checkbox */}
            <label className="flex items-start gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={saveInfo}
                onChange={(e) => setSaveInfo(e.target.checked)}
                className="mt-1 accent-primary cursor-pointer shrink-0"
              />
              <span className="font-semibold text-gray-800 dark:text-gray-100">
                Save my name, email, and website in this browser for the
                next time I comment.
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              className="mt-2 w-fit px-8 py-3 rounded-full bg-primary hover:brightness-95 font-semibold text-gray-900 dark:text-[#1f1f1f] text-sm transition-colors"
            >
              Add Review
            </button>
          </form>
        </div>
      </div>

      {/* No reviews banner */}
      {totalReviews === 0 && (
        <div className="mt-14 bg-primary rounded-md px-6 py-5">
          <p className="text-gray-900 dark:text-gray-100 text-[15px]">There are no reviews yet.</p>
        </div>
      )}
    </div>
  )
}

export default Reviews

