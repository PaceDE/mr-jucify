import { Link } from "react-router-dom";

const Footer = () => {

    const footerData = [
        {"header": "Product Catalog", "content": ["Vegetables", "Fish & Seafood", "Health Products", "Oil & Vinegar", "Butter & Eggs"]},
        {"header": "Useful Links", "content": ["About Us", "Featured Products", "Terms & Conditions", "Contact Us", "Promotional Offers"]},
    ]

    return ( 
        <>
            <footer className="mt-5">
                <div className="bg-[#10111e] flex justify-center items-center flex-wrap p-14 newsletter">
                    <div className="flex items-center newsletter-text">
                        <div className="mail-img">
                            <img src="images/mail.png" alt="" />
                        </div>
                        <div className="mx-[15px] mail-text">
                            <h2 className="text-white">Newsletter</h2>
                            <p className="text-[#9f9f9f]">Subscribe here to get every single email</p>
                        </div>
                    </div>
                    <div className="ml-24 mail-form">
                        <form className="flex flex-wrap">
                            <input className="px-12 h-16 border-0  bg-[#141626] text-[#aaabc3] uppercase email-input focus:outline-0" type="email" placeholder="ENTER YOUR EMAIL ADDRESS" />
                            <Link to="#" className="image-link-1">Subscribe Now</Link>
                        </form>
                    </div>
                </div>

                <div className="flex justify-center items-baseline w-3/5 m-auto footer-links">
                    <div className="flex flex-col p-5 m-[10px] w-1/4 footer-link footer-link-1">
                        <div className="logo">
                            <img src="images/logo.png" alt="" />
                        </div>
                        <div className="text-[15px] leading-7 text-[#444] logo-text">
                            Lorem ipsum dolor sit amet consectetur
                            adipisicing elit. Est veniam, quasnde!
                        </div>
                        <div className="flex mt-5 socials">
                            <Link to="#" className="flex justify-center items-center w-[35px] h-[35px] bg-[#d5d5d5] rounded-[50%] text-[#679509] duration-300 ease-in-out mx-[5px] hover:bg-[#679509]" ><i className="text-sm fab fa-facebook-f"></i></Link>
                            <Link to="#" className="flex justify-center items-center w-[35px] h-[35px] bg-[#d5d5d5] rounded-[50%] text-[#679509] duration-300 ease-in-out mx-[5px] hover:bg-[#679509]" ><i className="text-sm fab fa-twitter"></i></Link>
                            <Link to="#" className="flex justify-center items-center w-[35px] h-[35px] bg-[#d5d5d5] rounded-[50%] text-[#679509] duration-300 ease-in-out mx-[5px] hover:bg-[#679509]" ><i className="text-sm fab fa-instagram"></i></Link>
                            <Link to="#" className="flex justify-center items-center w-[35px] h-[35px] bg-[#d5d5d5] rounded-[50%] text-[#679509] duration-300 ease-in-out mx-[5px] hover:bg-[#679509]" ><i className="text-sm fab fa-pinterest-p"></i></Link>
                        </div>
                    </div>
                    {footerData.map(footer => (
                        <div className="footer-link" key={footerData.indexOf(footer)}>
                            <div className="text-xl font-semibold border-b-2 border-solid border-[#67950955] pb-[10px] footer-header">
                                <span>{footer["header"]}</span>
                            </div>
                            <div className="mt-[10px] footer-content">
                                {footer["content"].map(content => (
                                    <div className="my-[10px] footer-content-link" key={footer["content"].indexOf(content)}>
                                        <Link to="#" className="text-[#444] text-[15px] duration-200 ease-linear hover:text-[#679509]">{content}</Link>
                                    </div>
                                ))}
                                

                            </div>
                        </div>
                    ))}
                    
                    
                    <div className="footer-link">
                        <div className="text-xl font-semibold border-b-2 border-solid border-[#67950955] pb-[10px] footer-header">
                            <span>Download</span> Apps
                        </div>
                        <div className="footer-content">
                            <div className="text-[15px] leading-7 text-[#444] footer-text">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                            </div>
                        </div>
                        <div className="my-[15px] footer-img">
                            <Link to="#"><img src="images/google.png" alt="" /></Link>
                        </div>
                        <div className="footer-img">
                            <Link to="#"><img src="images/apple.png" alt="" /></Link>
                        </div>
                    </div>
                </div>
            </footer>
        </>
     );
}
 
export default Footer;