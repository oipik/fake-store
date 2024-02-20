import { Link } from 'react-router-dom';

import React from 'react'
import home from "../../images/home.jpg";

const Home = () => {
  return (
    <section className='flex flex-col md:flex-row'>
      <div className='relative mt-12 w-full order-2 text-center md:order-1 md:text-left md:w-2/4'>
        <h1 className='text-6xl xl:text-8xl font-black md:mt-16 mt-0'>
          Price <br /> Discount
        </h1>
        <p className='text-medium mt-10'>
          Spot-on illustration for your website <br />
          landing page and mobile application
        </p>
        <Link to="/products" className='inline-block mt-10 md:mt-16 bg-default text-white p-3 rounded-full hover:bg-opacity-50 transition-all duration-100'>
          Go Shopping!
        </Link>
      </div>
      <div className='flex order-1 md:order-2'>
        <img src={home} alt="home img" />
      </div>
    </section>
  )
}

export default Home