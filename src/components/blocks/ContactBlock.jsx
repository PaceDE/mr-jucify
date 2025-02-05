import { Link } from "react-router-dom";

const ContactBlock = () => {
    return ( 
        <div className="call mt-5">
            <div className="flex flex-col contact-info text-center">
                <h4 className="text-[#679509] uppercase text-base font-semibold">any question you have</h4>
                <p className="text-[50px] text-white font-bold pb-5">977-977-977-977-9</p>
                <div className="image-links mt-4">
                    <Link to="#" className="px-10 py-4 mr-2 text-white text-lg duration-300 ease-linear bg-[#679509] hover:bg-[#2a660a] shadow-xl">MAKE A CALL</Link>
                    <Link to="#" className="px-10 py-4 text-black text-lg duration-300 ease-linear bg-white hover:bg-[#2a660a] hover:text-white shadow-xl">Contact Us</Link>
                </div>
            </div>
        </div>
     );
}
 
export default ContactBlock;