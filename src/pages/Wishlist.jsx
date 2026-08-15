import Container from './../components/layouts/Container';
import { X } from 'lucide-react';
import { Link } from "react-router";
import { useWishlist } from '../features/wishlist/hooks/useWishlist.js';
import { useAddToCart } from '../features/Cart/hooks/useAddToCart.js';
import { FaFacebookF, FaWhatsapp  } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { TfiPinterest } from "react-icons/tfi";
import { IoMail } from "react-icons/io5";
import { useRemoveWishlist } from './../features/wishlist/hooks/useRemoveWishlist';

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
          <p className="text-center text-[22px] text-tcolor md:text-[26px]">
            Your wishlist is currently empty.
          </p>
        </div>
    
        <div className="mt-8 flex justify-center">
          <Link
            to="/"
            className="rounded-full bg-gray-100 px-8 py-3 text-[15px] font-medium text-gray-700 transition-colors duration-200 hover:bg-black hover:text-white"
          >
            Return to shop
          </Link>
        </div>
      </div>
    ) : (
    <section className="font-pop">
      <Container>
        <h1 className="text-[28px] sm:text-[40px] text-tcolor w-full text-center pt-6 pb-6 sm:pb-10">
          My wishlist
        </h1>

        {wishlistItems?.length > 0 ? (
          <>
            {/* ---------- Mobile / tablet card view ---------- */}
            <div className="md:hidden flex flex-col gap-6">
              {wishlistItems.map((item) => (
                <div key={item._id} className="relative flex flex-col items-center text-center px-2 ">
                  <button
                    type="button"
                    aria-label="Remove from wishlist"
                    onClick={() => handleRemove(item._id)}
                    className="absolute left-0 top-0 text-gray-400 hover:text-black"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <Link className="w-full flex justify-center">
                    <img
                      src={item?.image}
                      alt={item?.name}
                      className="w-[220px] h-[220px] object-cover rounded"
                    />
                  </Link>

                  <span className="mt-4 text-[18px] font-pop text-gray-600 font-semibold cursor-pointer hover:text-black">
                    {item.name}
                  </span>

                  <div className="w-full flex items-center justify-between border-b border-gray-200 py-3 mt-3">
                    <span className="text-red-500 font-semibold">Price:</span>
                    <span className="text-tcolor text-[16px] font-semibold">
                      ${item?.price.toFixed(2)}
                    </span>
                  </div>

                  <div className="w-full flex items-center justify-between border-b border-gray-200 py-3">
                    <span className="text-[#747474] font-semibold">Stock:</span>
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
                className="mt-4 ml-auto block text-tcolor bg-primary font-semibold cursor-pointer hover:text-black  transition-colors duration-200 border px-3 py-1 rounded-full border-gray-300"
              >
                  Add to cart
                </button>
                </div>
              ))}
            </div>

            {/* ---------- Desktop table view ---------- */}
            <table className="hidden md:table w-full table-fixed">
              <thead>
                <tr className="border-b border-gray-300 text-[#747474] font-semibold">
                  <th className="w-[55%] py-4 text-start pl-45">Product name</th>
                  <th className="w-[15%] py-4 text-left">Unit price</th>
                  <th className="w-[15%] py-4 text-left">Stock status</th>
                  <th className="w-[15%] py-4 text-left"></th>
                </tr>
              </thead>
              <tbody>
                {wishlistItems?.map((item) => (
                  <tr key={item._id} className="border-b border-b-gray-200">
                    <td className="py-4 flex items-center gap-4">
                      <div className="flex items-center gap-8">
                        <X
                          className="text-gray-400 cursor-pointer hover:text-black"
                          onClick={() => handleRemove(item._id)}
                        />
                        <Link className='border border-gray-300 h-22 w-24 flex items-center justify-center'>
                          <img
                            src={item?.image}
                            alt={item?.name}
                            className="w-[80px] h-[80px]  object-cover rounded"
                          />
                        </Link>
                        <span className="text-[18px] pl-3 cursor-pointer hover:text-black font-pop text-gray-500 font-semibold">
                          {item.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 text-left text-tcolor text-[17px] font-semibold">
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
                        className="text-tcolor font-semibold cursor-pointer hover:text-black  transition-colors duration-200 disabled:cursor-not-allowed disabled:text-gray-300 disabled:hover:no-underline"
                      >
                        Add to cart
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="pt-10 pb-16 flex items-center gap-4">
              <span className="font-bold text-tcolor">Share on:</span>
              <div className="flex items-center gap-4">
                {shareLinks.map((item) => (
                  <button >
                      <item.icon />
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <h1>Wishlist is empty</h1>
        )}
      </Container>
    </section>
      )}
   </>
  );
};

export default Wishlist;