import { useFetchData } from '@/hooks/useFetchData';
import { useTimers } from '@/hooks/useTimers';
import ProductCard from '@/components/ui/TopSelling';

const BestSellers = () => {

     const { data: sec, loading, errs } = useFetchData('/api/home-v3')
        const section = sec?.data?.sections?.find(cat => cat.id === 'top-selling') || [];
        const sale = sec?.data?.sections?.find(cat => cat.id === 'on-sale') || [];
      const date = useTimers('Sep 31, 2026 ')

        
  return (
    <div>
      <ProductCard data={section} loading={loading} errs={errs} discount={sale} timers={date}/>
    </div>
  )
}

export default BestSellers
