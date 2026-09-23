// Renamed from 'TechnicalSpecifications .jsx' (removed trailing space in the file name).
import React from 'react'

const TechnicalSpecifications = ({ data = [] }) => {
  if (!data.length) return null
  
  return (
    <div className="w-full font-pop">
      <h2 className="text-[22px] font-semibold text-gray-800 dark:text-gray-100 mb-4">
        Technical Specifications
      </h2>

      <div className="flex flex-col">
        {data.map((spec, index) => (
          <div
            key={spec._id || index}
            className={`flex flex-col sm:flex-row sm:items-center py-4 ${
              index !== data.length - 1 ? 'border-b border-gray-200 dark:border-[#333333]' : ''
            }`}
          >
            <p className="w-full sm:w-[220px] shrink-0 text-gray-500 dark:text-gray-400 text-[15px] mb-1 sm:mb-0">
              {spec.name}
            </p>
            <p className="text-gray-800 dark:text-gray-100 text-[15px]">
              {spec.value}
              {spec.unit ? ` ${spec.unit}` : ''}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TechnicalSpecifications