
import { useFetchData } from '../hooks/Fetchdata';
import { useTimers } from '../hooks/Timers';
import ProductCard from './ui/ProductCard';

const BestSellers = () => {
     const { data: sec, loading, errs } = useFetchData('/api/home-v3')
     const {data: pro} = useFetchData('/api/home-v3')
        const section = sec?.data?.sections?.find(cat => cat.id === 'top-selling') || [];
        const sale = pro?.data?.sections?.find(cat => cat.id === 'on-sale') || []
      const date = useTimers('Sep 31, 2026 ')

        
  return (
    <div>
      <ProductCard data={section} discount={sale} timers={date}/>
    </div>
  )
}

export default BestSellers
