import React from 'react'
import home from "../../images/home.jpg";

const Home = () => {
  return (
    <section className='flex mt-6'>
      <div className='relative w-2/4 text-left mt-12'>
        <h1 className='text-6xl font-black mt-16'>
          Price <br /> Discount
        </h1>
        <p className='text-medium mt-10'>
          Spot-on illustration for your website <br />
          landing page and mobile application
        </p>
        <a href='#' className='inline-block mt-16 bg-default text-white p-3 rounded-full hover:bg-opacity-50 transition-all duration-100'>
          Go Shopping!
        </a>
      </div>
      <div className='flex'>
        <img src={home} alt="home img" />
      </div>
    </section>
  )
}

export default Home