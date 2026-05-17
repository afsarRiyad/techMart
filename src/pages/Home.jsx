import Features from '../components/Features';
import HeroSlider from '../components/HeroSlider/HeroSlider';
import Container from './../components/layouts/Container';
import Reset from './Reset';

const Home = () => {
  return (
    <div className='h-auto'>
        <HeroSlider/>
      <Container>
        <Features/>
         <h1 className=''>SCROLL DOWN</h1>
      </Container>
    </div>
  )
}

export default Home