import Banner from "./Banner";

import image1 from '../images/1.jpg';
import image2 from '../images/2.jpg';
import image3 from '../images/3.jpg';

const Wishlist = () => {
    const data = [
        {"id": 0, "name": "Onion", "image": image1, "price": 199, "status": "In stock"},
        {"id": 1, "name": "Mushroom", "image": image2, "price": 499, "status": "In stock"},
        {"id": 2, "name": "Peach", "image": image3, "price": 299, "status": "In stock"},
    ];

    return ( 
        <>
            <Banner pageTitle={"wishlist"} />
            <div className="w-3/5 mx-auto my-[100px] flex justify-center">
                <div className="table w-full">
                    <div className="table-header-group">
                        <div className="table-row font-semibold">
                            <div className="table-cell">Image</div>
                            <div className="table-cell">Product Name</div>
                            <div className="table-cell">Price</div>
                            <div className="table-cell">Stock Status</div>
                            <div className="table-cell">Action</div>
                        </div>
                    </div>
                    <div className="table-row-group">
                    {data.map(d => (
                        <div className="table-row" key={d["id"]}>
                            <div className="table-cell">
                                <img src={d["image"]} alt="" className="w-24 h-24" />
                            </div>
                            <div className="table-cell align-middle">
                                {d["name"]}
                            </div>
                            <div className="table-cell align-middle">
                                Rs.{d["price"]}
                            </div>
                            <div className="table-cell align-middle">
                                <button className="px-4 py-3 bg-[#679509] text-white rounded-full text-sm font-semibold hover:bg-[#2a660a] duration-200 ease-linear" >Add to Cart</button>
                            </div>
                            <div className="table-cell align-middle">
                                <i class="fa fa-times text-2xl duration-200 ease-linear hover:text-[#679509] hover:rotate-90" aria-hidden="true"></i>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default Wishlist;