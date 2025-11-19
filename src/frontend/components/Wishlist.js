import Banner from "./Banner";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

const Wishlist = () => {
    const {wishlist,setWishlist,isLoading} =useAuth();
    console.log(wishlist)
    const handleDelete = async (id) =>{const token = sessionStorage.getItem("token");
        try {
          const response = await fetch(`http://localhost:5000/api/product/deleteWishlist/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            }
          });
    
          const data = await response.json();
          console.log(data);
          if (data.msg) {
            setWishlist(data.wishlist);
            toast.success(data.msg)
          }
    
          else {
            toast.error("Failed to add to Wishlist");
          }
        } catch (error) {
          toast.error("Failed to add to Wishlist");
        }
      }
      if(isLoading){
        return <div>Loading...</div>
      }
    

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
                    {wishlist.map(d => (
                        <div className="table-row" key={d._id}>
                            <div className="table-cell">
                                <img src={d.imgSrc} alt="" className="w-24 h-24" />
                            </div>
                            <div className="table-cell align-middle">
                                {d.pName}
                            </div>
                            <div className="table-cell align-middle">
                                Rs.{d.price}
                            </div>
                            <div className="table-cell align-middle">
                                <button className="px-4 py-3 bg-[#679509] text-white rounded-full text-sm font-semibold hover:bg-[#2a660a] duration-200 ease-linear" >Add to Cart</button>
                            </div>
                            <div className="table-cell align-middle" onClick={()=>handleDelete(d._id)}>
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