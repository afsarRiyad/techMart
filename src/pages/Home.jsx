import BestSellers from '@/components/home/BestSellers';
import Featured from '@/components/home/Featured';
import Features from '@/components/home/features/Features';
import HeroSlider from '@/components/home/HeroSlider';
import LaptopsPc from '@/components/home/LaptopsPc';
import PromotionalCat from '@/components/home/PromotionalCat';
import Recommendation from '@/components/home/Recommendation';
import TopCategories from '@/components/home/TopCategories';
import TrendingPro from '@/components/home/TrendingPro';
import Banner from '@/components/ui/Banner';
import ValueProps from '@/components/home/ValueProps';
import Container from '@/components/layout/Container';
import Reset from '@/pages/Reset';

const Home = () => {
  return (
    <>
        <HeroSlider/>
        <Features/>
        <ValueProps/>
        <Featured/>
        <PromotionalCat/>
        <LaptopsPc/>
        <TrendingPro/>
        <BestSellers/>
        <Recommendation/>
        <Banner/>
        <TopCategories/>
    </>
  )
}

export default Home