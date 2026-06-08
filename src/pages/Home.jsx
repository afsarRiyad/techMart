import Features from '../components/Features/Features';
import HeroSlider from '../components/HeroSlider/HeroSlider';
import ValueProps from '../components/ValueProps';
import Container from './../components/layouts/Container';
import Reset from './Reset';

const Home = () => {
  return (
    <div className='h-auto'>
        <HeroSlider/>
      <Container>
        <Features/>
        <ValueProps/>
         <h1 className=''>SCROLL DOWN</h1>
      </Container>
    </div>
  )
}

export default Home