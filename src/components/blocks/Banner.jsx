import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import image1 from "../../images/slider1.jpg";
import image2 from "../../images/slider2.jpg";
import { Link } from "react-router";

const Banner = () => {
    const images = [
        image1,
        image2,
    ];

    const settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 1000,
        // cssEase: "linear",
        slidesToShow: 1,
        slidesToScroll: 1,
      };

    return ( 
        <>        
            <div className="slider-container">
                <Slider {...settings}>
                    {images.map(img => (
                        <div className="w-screen h-[80vh] relative" key={images.indexOf(img)}>
                            <img className="w-full h-full object-cover opacity-[0.7]" src={img}/>
                            <div className="image-content absolute top-[30%] left-[15%] leading-[60px]">
                                <div className="uppercase text-xl font-medium">
                                    Organic and Fresh Food
                                </div>
                                <div className="text-[55px] font-bold capitalize">
                                    Get Freshness Delivered<br />In Your Doorstep
                                </div>
                                <div className="image-links mt-4">
                                    <Link to="#" className="px-10 py-4 mr-2 text-white text-lg duration-300 ease-linear bg-[#679509] hover:bg-[#2a660a] shadow-xl">Shop Now</Link>
                                    <Link to="#" className="px-10 py-4 text-black text-lg duration-300 ease-linear bg-white hover:bg-[#2a660a] hover:text-white shadow-xl">Category</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </>
     );
}
 
export default Banner;