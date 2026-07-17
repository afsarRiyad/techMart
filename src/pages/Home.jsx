import BestSellers from '../components/BestSellers';
import Featured from '../components/Featured';
import Features from '../components/Features/Features';
import HeroSlider from '../components/HeroSlider/HeroSlider';
import LaptopsPc from '../components/LaptopsPc';
import PromotionalCat from '../components/PromotionalCat';
import Recommendation from '../components/Recommendation';
import TrendingPro from '../components/TrendingPro';
import ValueProps from '../components/ValueProps';
import Container from './../components/layouts/Container';
import Reset from './Reset';

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
         <h1 className=''>SCROLL DOWN</h1>
    </>
  )
}

export default Home