import Container from '@/components/layout/Container';
import { X } from 'lucide-react';
import { Link } from "react-router";
import { useWishlist } from '@/features/wishlist/hooks/useWishlist';
import { useAddToCart } from '@/features/cart/hooks/useAddToCart';
import { FaFacebookF, FaWhatsapp  } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { TfiPinterest } from "react-icons/tfi";
import { IoMail } from "react-icons/io5";
import { useRemoveWishlist } from '@/features/wishlist/hooks/useRemoveWishlist';

const shareLinks = [
 {icon: FaFacebookF },
 {icon: BsTwitterX} ,
  {icon: TfiPinterest} ,
  {icon: IoMail} ,
  {icon:FaWhatsapp} 
];

const Wishlist = () => {
    const addtocartMutation = useAddToCart()
    const removeWishlistMutation  = useRemoveWishlist()
  const { data, isLoading, error } = useWishlist();
  const wishlistItems = data?.data;
  const handleRemove = (id) =>{
           removeWishlistMutation.mutate(id)
  }
  const handleCart =async(id)=>{
       await addtocartMutation.mutateAsync({
                 product: id,
                 quantity: 1
       })
  }

  return (
    <>
     {!wishlistItems || wishlistItems.length === 0 ? (
      <div className="py-10">
        <div className="relative overflow-hidden rounded bg-primary px-8 py-6 md:px-10">
          <span className="absolute left-0 top-0 h-full w-1.5 bg-yellow-600" />
          <p className="text-center text-[22px] text-tcolor dark:text-gray-100 md:text-[26px]">
            Your wishlist is currently empty.
          </p>
        </div>
    
        <div className="mt-8 flex justify-center">
          <Link
            to="/"
            className="rounded-full bg-gray-100 dark:bg-[#1c1c1c] dark:bg-[#212121] px-8 py-3 text-[15px] font-medium text-gray-700 dark:text-gray-200 transition-colors duration-200 hover:bg-black hover:text-white"
          >
            Return to shop
          </Link>
        </div>
      </div>
    ) : (
    <section className="font-pop">
      <Container>
        <h1 className="text-[28px] sm:text-[40px] text-tcolor dark:text-gray-100 w-full text-center pt-6 pb-6 sm:pb-10">
          My wishlist
        </h1>

          <>
            {/* ---------- Mobile / tablet card view ---------- */}
            <div className="md:hidden flex flex-col gap-6">
              {wishlistItems.map((item) => (
                <div key={item._id} className="relative flex flex-col items-center text-center px-2">
                  <button
                    type="button"
                    aria-label="Remove from wishlist"
                    onClick={() => handleRemove(item._id)}
                    className="tapTarget absolute left-0 top-0 text-gray-400 hover:text-black dark:hover:text-gray-100"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <Link to={`/products/${item.slug || item._id}`} className="imageTile w-full flex justify-center">
                    <img
                      src={item?.image}
                      alt={item?.name}
                      className="h-[200px] w-[200px] object-contain rounded cursor-pointer mix-blend-multiply dark:mix-blend-normal"
                    />
                  </Link>

                  <Link to={`/products/${item.slug || item._id}`} className="mt-4 text-[18px] font-pop text-gray-600 dark:text-gray-300 font-semibold cursor-pointer hover:text-black dark:hover:text-gray-100">
                    {item.name}
                  </Link>

                  <div className="w-full flex items-center justify-between border-b border-gray-200 dark:border-[#333333] dark:border-b-[#333333] py-3 mt-3">
                    <span className="text-red-500 font-semibold">Price:</span>
                    <span className="text-tcolor dark:text-gray-100 text-[16px] font-semibold">
                      ${item?.price.toFixed(2)}
                    </span>
                  </div>

                  <div className="w-full flex items-center justify-between border-b border-gray-200 dark:border-[#333333] dark:border-b-[#333333] py-3">
                    <span className="text-[#747474] dark:text-gray-400 font-semibold">Stock:</span>
                    <span
                      className={`text-[16px] font-semibold ${
                        item.stock > 0 ? 'text-green-600' : 'text-red-500'
                      }`}
                    >
                      {item.stock > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                  <button
                onClick={() => handleCart(item._id)}
                className="mt-4 ml-auto block min-h-11 text-tcolor bg-primary font-semibold cursor-pointer hover:text-black transition-colors duration-200 border px-4 py-2 rounded-full border-gray-300 dark:border-[#333333] dark:border-transparent"
              >
                  Add to cart
                </button>
                </div>
              ))}
            </div>

            {/* ---------- Desktop table view ---------- */}
            <table className="hidden md:table w-full table-fixed">
              <thead>
                <tr className="border-b border-gray-300 dark:border-[#333333] text-[#747474] dark:text-gray-400 font-semibold">
                  <th className="w-[55%] py-4 text-start pl-4">Product name</th>
                  <th className="w-[15%] py-4 text-left">Unit price</th>
                  <th className="w-[15%] py-4 text-left">Stock status</th>
                  <th className="w-[15%] py-4 text-left"></th>
                </tr>
              </thead>
              <tbody>
                {wishlistItems?.map((item) => (
                  <tr key={item._id} className="border-b border-b-gray-200 dark:border-b-[#333333]">
                    <td className="py-4 flex items-center gap-4">
                      <div className="flex items-center gap-4">
                        <button type="button" aria-label="Remove from wishlist" className="tapTarget text-gray-400 hover:text-black dark:hover:text-gray-100" onClick={() => handleRemove(item._id)}>
                          <X size={18} />
                        </button>
                        <Link to={`/products/${item.slug || item._id}`} className='imageTile border border-gray-300 dark:border-[#333333] h-22 w-24 flex items-center justify-center'>
                          <img
                            src={item?.image}
                            alt={item?.name}
                            className="w-[80px] h-[80px] object-contain rounded cursor-pointer mix-blend-multiply dark:mix-blend-normal"
                          />
                        </Link>
                        <Link to={`/products/${item.slug || item._id}`} className="text-[18px] cursor-pointer hover:text-black dark:hover:text-gray-100 font-pop text-gray-500 dark:text-gray-400 dark:text-gray-300 font-semibold">
                          {item.name}
                        </Link>
                      </div>
                    </td>
                    <td className="py-4 text-left text-tcolor dark:text-gray-100 text-[17px] font-semibold">
                      ${item?.price.toFixed(2)}
                    </td>
                    <td
                      className={`py-4 text-left text-[17px] font-semibold ${
                        item.stock > 0 ? 'text-green-600' : 'text-red-500'
                      }`}
                    >
                      {item.stock > 0 ? 'In Stock' : 'Out of Stock'}
                    </td>
                    <td className="py-4 text-left">
                      <button
                      onClick={()=> handleCart(item._id)}
                        className="min-h-11 text-tcolor dark:text-gray-100 font-semibold cursor-pointer hover:text-black dark:hover:text-gray-100 transition-colors duration-200 disabled:cursor-not-allowed disabled:text-gray-300 disabled:hover:no-underline"
                      >
                        Add to cart
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="pt-10 pb-16 flex items-center gap-4">
              <span className="font-bold text-tcolor dark:text-gray-100">Share on:</span>
              <div className="flex items-center gap-4">
                {shareLinks.map((item) => (
                  <button key={item.icon} className='tapTarget text-tcolor dark:text-gray-100 dark:text-gray-200'>
                      <item.icon />
                  </button>
                ))}
              </div>
            </div>
          </>
        )
      </Container>
    </section>
      )}
   </>
  );
};

export default Wishlist;