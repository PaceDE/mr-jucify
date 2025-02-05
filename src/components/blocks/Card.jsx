const Card = ({fruit}) => {
    return ( 
        <>
            <div className="relative w-60 mx-[10px] bg-white shadow-xl p-5 overflow-hidden card">
                <img src={fruit["image"]} alt="" className="m-auto w-full h-full object-cover duration-200 ease-linear" />
                <div className="stars text-center mt-5">
                    {fruit["stars"]?.map(id => (
                        <i className="fa-sharp fa-solid fa-star text-[#fc0] text-sm" key={id}></i>
                    ))}
                </div>
                <div className="text-lg font-semibold text-center mt-2">
                    {fruit["name"]}
                </div>
                <div className="text-lg text-center mt-2">
                    <span className="text-[#679509] font-semibold">
                        Rs. {fruit["price"]}
                    </span>
                    <span className="line-through">
                        {fruit["oldPrice"]}
                    </span>
                </div>
                { fruit["option"] && 
                <div className="absolute top-0 left-0 py-[5px] px-4 tracking-[1px] bg-[#679509] text-white text-xs font-semibold uppercase">
                    {fruit["option"]}
                </div> }
                <div className="hidden absolute top-0 right-0 p-[10px] mt-[10px] mr-[10px] rounded-[50%] duration-200 ease-linear hover:bg-[#679509] heart-wishlist">
                    <i className="fa-regular fa-heart text-black items-center justify-center text-[15px] duration-200 ease-linear"></i>
                </div>
            </div>
        </>
     );
}
 
export default Card;