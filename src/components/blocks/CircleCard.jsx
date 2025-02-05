const CircleCard = ({category}) => {
    return ( 
        <>
            <div className="mx-[30px] food-cat food-cat-1">
                <div className="w-[150px] h-[150px] flex justify-center items-center border-2 border-dashed border-[#679509] rounded-[50%] mb-[10px] relative cat-img">
                    <img src={category["image"]} className="w-[90%] h-[90%] object-cover rounded-[50%]" alt="" />
                    <div className="absolute w-0 h-0 duration-200 ease-linear text-transparent plus">
                        +
                    </div>
                </div>
                <div className="text-center font-semibold duration-200 ease-linear cat-name">
                    {category["name"]}
                </div>
            </div>
        </>
     );
}
 
export default CircleCard;