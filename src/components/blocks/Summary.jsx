import image1 from "../../images/1.jpg";
import image2 from "../../images/2.jpg";
import image3 from "../../images/3.jpg";
import image4 from "../../images/4.jpg";
import image5 from "../../images/5.jpg";
import image6 from "../../images/6.jpg";

const Summary = () => {
    const summaryDataNested = [
        [{"id": 0, "name": "Carrot Group Scal", "image": image1, "stars": [1,2,3,4,5], "price": 200, "oldPrice": 210},
        {"id": 1, "name": "Carrot Group Scal", "image": image2, "stars": [1,2,3,4,5], "price": 200, "oldPrice": 210},
        {"id": 2, "name": "Carrot Group Scal", "image": image3, "stars": [1,2,3,4,5], "price": 200, "oldPrice": 210},
        {"id": 3, "name": "Carrot Group Scal", "image": image4, "stars": [1,2,3,4,5], "price": 200, "oldPrice": 210},]
        ,
        [{"id": 0, "name": "Carrot Group Scal", "image": image1, "stars": [1,2,3,4,5], "price": 200, "oldPrice": 210},
        {"id": 1, "name": "Carrot Group Scal", "image": image2, "stars": [1,2,3,4,5], "price": 200, "oldPrice": 210},
        {"id": 2, "name": "Carrot Group Scal", "image": image3, "stars": [1,2,3,4,5], "price": 200, "oldPrice": 210},
        {"id": 3, "name": "Carrot Group Scal", "image": image4, "stars": [1,2,3,4,5], "price": 200, "oldPrice": 210},]
        ,
        [{"id": 0, "name": "Carrot Group Scal", "image": image1, "stars": [1,2,3,4,5], "price": 200, "oldPrice": 210},
        {"id": 1, "name": "Carrot Group Scal", "image": image2, "stars": [1,2,3,4,5], "price": 200, "oldPrice": 210},
        {"id": 2, "name": "Carrot Group Scal", "image": image3, "stars": [1,2,3,4,5], "price": 200, "oldPrice": 210},
        {"id": 3, "name": "Carrot Group Scal", "image": image4, "stars": [1,2,3,4,5], "price": 200, "oldPrice": 210},]
    ]
    return ( 
        <div className="flex flex-wrap justify-center">
            {summaryDataNested.map(summaryData => (
                <div className="mx-[10px] summary-header">
                    <h4 className="text-xl font-semibold border-b-2 border-solid border-[#67950955]"><span className="border-b-2 border-solid border-[#679509]">Best</span> Selling</h4>
                    {summaryData.map(sd => (
                        <div className="bg-white flex items-center py-[10px] pr-[20px] pl-[10px] my-[10px] summary-item" key={sd["id"]}>
                            <div className="w-[100px] h-[100px] summary-item-image">
                                <img src={sd["image"]} className="w-full h-full" alt="" />
                            </div>
                            <div className="ml-[20px] text-sm summary-item-content">
                                <div className="text-sm summary-item-name">
                                    {sd["name"]}
                                </div>
                                <div className="stars">
                                    {sd["stars"].map(s => (
                                        <i className="fa-sharp fa-solid fa-star text-[#fc0]"></i>
                                    ))}

                                </div>
                                <div className="text-lg text-center mt-2">
                                    <span className="text-[#679509] font-semibold">
                                        ${sd["price"]}
                                    </span>
                                    &nbsp;
                                    <span className="line-through">
                                        ${sd["oldPrice"]}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
            <div className="mx-[10px] summary-header">
            <h4 className="text-xl font-semibold border-b-2 border-solid border-[#67950955]"><span className="border-b-2 border-solid border-[#679509]">Weekly</span> Discount</h4>
            <div className="relative h-full discount-img">
                <img src="images/week.jpg" className="w-full h-[90%] object-cover" alt="" />
                <div className="absolute top-[30%] discount-content">
                    <div className="w-[80%] m-auto  text-3xl font-bold capitalize text-white discount-text">
                        get a discount for weekly offer
                    </div>
                    <div className="w-[80%] m-auto image-links mt-5">
                        <a href="#" className="px-10 py-4 mr-2 text-white text-lg duration-300 ease-linear bg-[#679509] hover:bg-[#2a660a] shadow-xl">
                            Shop Now
                        </a>
                    </div>
                </div>
            </div>
        </div>
            
        </div>
     );
}
 
export default Summary;