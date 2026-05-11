
import HeroSlider from '../components/HeroSlider';
import Container from './../components/layouts/Container';

const Home = () => {
  return (
    <div className='h-auto'>
        <HeroSlider/>
      <Container>
         <h1 className=''>SCROLL DOWN</h1>
      </Container>
    </div>
  )
}

export default Home