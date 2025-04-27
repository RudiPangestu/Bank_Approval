import React from 'react';
import Hero from '../components/home/Hero';
import Services from '../components/home/Services';
import About from '../components/home/About';
import Testimonials from '../components/home/Testimonials';
import CallToAction from '../components/home/CallToAction';

const Home: React.FC = () => {
  return (
    <div>
      <Hero />
      <Services />
      <About />
      <Testimonials />
      <CallToAction />
    </div>
  );
};

export default Home;