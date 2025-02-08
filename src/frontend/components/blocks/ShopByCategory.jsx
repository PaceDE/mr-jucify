import CircleCard from "./CircleCard";

import image1 from "../../../images/cat-1.jpg"
import image2 from "../../../images/cat-2.jpg"
import image3 from "../../../images/cat-3.jpg"
import image4 from "../../../images/cat-4.jpg"
import image5 from "../../../images/cat-5.jpg"

const ShopByCategory = () => {

    const categoryData = [
        {"id": 0, "name": "Vegetables", "image": image1},
        {"id": 1, "name": "Fruits", "image": image2},
        {"id": 2, "name": "Salads", "image": image3},
        {"id": 3, "name": "Fish & Seafooss", "image": image4},
        {"id": 4, "name": "Fresh Meat", "image": image5},
    ]

    return ( 
        <>
            <div className="w-[60%] m-auto flex justify-center mt-[50px] text-center">
                {categoryData.map(category => (
                    <CircleCard category={category} key={category["id"]} />
                ))}
            </div>
        </>
     );
}
 
export default ShopByCategory;