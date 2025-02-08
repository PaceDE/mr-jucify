import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import image1 from "../../../images/1.jpg"
import Card from "./Card";

const ItemSlider = () => {

    const settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 2000,
        speed: 1000,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 4,
        responsive: [
            {
                breakpoint: 2000,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                }
            },
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
        ]
      };

    const fruitsData = [
        {"id": 0, "name": "Radish Vegetable", "image": image1, "stars": [1,2,3,4,5], "price": 200, "oldPrice": 210, "option": "sale"},
        {"id": 1, "name": "Radish Vegetable", "image": image1, "stars": [1,2,3,4,5], "price": 200, "oldPrice": 210, "option": "new"},
        {"id": 2, "name": "Radish Vegetable", "image": image1, "stars": [1,2,3,4,5], "price": 200, "oldPrice": 210, "option": "25%"},
        {"id": 3, "name": "Radish Vegetable", "image": image1, "stars": [1,2,3,4,5], "price": 200, "oldPrice": 210, "option": null},
    ]

    return ( 
        <>
            <div className="slider-container w-[60%] m-auto mt-5">
                <Slider {...settings}>
                    {fruitsData.map(fruit => (
                        <Card fruit={fruit} key={fruit["id"]}></Card>
                    ))}
                </Slider>
                
                
            </div>
        </>
     );
}
 
export default ItemSlider;