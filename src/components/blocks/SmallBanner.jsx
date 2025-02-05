import image1 from "../../images/banner1.jpg";
import image2 from "../../images/banner2.jpg";
import "../../css/home.css";


const SmallBanner = () => {

    const images = [
        image1,
        image2,
    ]

    return ( 
        <>
            <div className="flex justify-center flex-wrap">    
                {images.map(img => (
                    <div className="relative m-[10px] shadow-xl small-banner" key={images.indexOf(img)}>
                        <img src={img} alt="" />
                    </div>
                ))}
            </div>
        </>
     );
}
 
export default SmallBanner;

