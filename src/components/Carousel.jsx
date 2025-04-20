import React from 'react'
import slide from '../assets/slider.jpg'
import slider1 from '../assets/slider1.jpg'
import slider2 from '../assets/slider2.jpg'
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import '../css/carousel.css'
function Carousel() {
    const slides=[
        {
        img:slider1
    },
        {
        img:slider2
    },

]
  return (
    <>
   {/* carousel card */}
   <div className='max-lg:w-full -z-10 w-full' >
   <OwlCarousel
       loop={true}
    //    margin={0}
       autoplay={true}
       autoplayTimeout={2500}
       autoplaySpeed={2000}
       items={1}
       dots={true}
       nav={false}
       dotsEach={true}
       dotData={true}
       responsive={
           {
               0: {
                   items: 1
               },
               600: {
                   items: 1
               },
               1000: {
                   items: 1
               }
           }
       }
   >
{
    slides.map((item,index)=>(
        <div className=''>
            <img key={index} src={item.img} alt="" className='' />
        </div>

    ))
}

   </OwlCarousel>
</div>
{/* end carousel card */}
    </>
  )
}

export default Carousel