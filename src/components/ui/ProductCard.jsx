

import React from "react";
import { FaOpencart } from "react-icons/fa6";
import { GitCompareArrows, Heart } from "lucide-react";
import Tooltip from "./Tooltip";
import Container from "../layouts/Container";

const ProductCard = ({ pro }) => {
  return (
    <Container>
      <div className="relative py-3 bg-white mr-1 group/card hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)] border-r border-r-gray-300 mb-2 cursor-pointer">
      <div className="px-5">
        <div className="flex items-center pt-1">
          {pro?.categories?.map((tag, index) => (
            <p
              key={index}
              className="truncate text-[12px] text-gray-500 font-inter hover:font-semibold"
            >
              {tag}
              {index < pro.categories.length - 1 && ","}
            </p>
          ))}
        </div>

        {pro.name && (
          <span className="text-[#0062BD] text-[16px] leading-tight pt-2 font-semibold line-clamp-2 block">
            {pro.name}
          </span>
        )}

        {pro.image && (
          <img
            loading="lazy"
            src={pro.image}
            alt={pro.name}
            className="md:w-full w-30 md:h-full object-contain mix-blend-multiply dark:mix-blend-normal transition-transform group-hover/card:scale-105"
          />
        )}

        <div className="flex items-center justify-between pb-3">
          <p className="text-tcolor text-[20px]">${pro.price}</p>

          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer group-hover/card:bg-primary group relative mr-2">
            <FaOpencart size={25} className="text-white" />
            <Tooltip title="Add to Cart" />
          </div>
        </div>

        <div className="absolute left-0 right-0 bottom-4 translate-y-full bg-white p-3 opacity-0 invisible group-hover/card:opacity-100 group-hover/card:visible z-50 shadow-xl before:absolute before:top-0 before:right-5 before:w-47 lg:before:w-40 before:border-t-2 before:border-gray-200 before:content-['']">
          <div className="flex items-center gap-1 mr-10 justify-end cursor-pointer hover:text-black text-gray-500">
            <Heart size={18} />
            <span className="text-sm pl-2">Wishlist</span>
          </div>

          <div className="flex items-center gap-1 mt-2 mr-10 justify-end cursor-pointer hover:text-black text-gray-500 pb-1">
            <GitCompareArrows size={18} />
            <span className="text-sm">Compare</span>
          </div>
        </div>
      </div>
    </div>
    </Container>
  );
};

export default ProductCard;