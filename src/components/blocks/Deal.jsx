import { Link } from "react-router-dom";

const Deal = () => {

    const timeData = [
        {"id": 0, "value": 161, "unit": "Days"},
        {"id": 1, "value": 12, "unit": "Hours"},
        {"id": 2, "value": 19, "unit": "Minutes"},
        {"id": 3, "value": 49, "unit": "Second"},
    ]
    return ( 
        <>
            <div className="w-[80%] m-auto mt-28">
                <div className="flex flex-wrap justify-center items-center">
                    <div className="w-[350px] h-[350px]">
                        <img src="../../images/deal.png" className="w-full h-full" alt="" />
                    </div>
                    <div className="flex flex-col pl-5">
                        <div className="text-[#679509] uppercase text-xl font-medium">
                            Today's Hot Deals
                        </div>
                        <div className="text-[35px] font-semibold uppercase">
                            original stock <br /> honey combo package
                        </div>
                        <div className="flex flex-wrap text-center">
                            {timeData.map(td => (
                                <div className="mx-[10px]" key={td["id"]}>
                                    <div className="text-[#679509] bg-white text-[28px] font-semibold w-[90px] h-[90px] flex items-center justify-center rounded-[50px] shadow-xl">
                                        {td["value"]}
                                    </div>
                                    <div className="mt-[10px] uppercase font-medium">
                                        {td["unit"]}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-5">
                            <Link to="#" className="px-10 py-4  text-lg duration-300 ease-linear hover:bg-[#2a660a] hover:text-white shadow-xl">Shop Now</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default Deal;