import React from "react";
import Banner from "./Banner";


const Contact = () => {
  return (
    <>
      <Banner pageTitle="Contact Us" />

      <div className="flex justify-center items-baseline w-[70%] mx-auto py-28">
        <div className="flex flex-col w-[500px] mr-10 text-wrap">
          <h2 className="h1 uppercase font-semibold mb-2">Contact Us Here</h2>
          <p className="text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae nulla quaerat similique magnam sequi fugit maiores odio veniam eos tenetur.</p>
          <div className="mt-2 text-lg font-medium">
            <div className="flex justify-between my-2">
              <div className="">
                <i class="fas fa-map-marker-alt"></i> Location: 
              </div>
              <div className="">
                Nepal
              </div>
            </div>

            <div className="flex justify-between my-2">
              <div className="">
              <i class="fas fa-envelope"></i> Email: 
              </div>
              <div className="">
                mrjuicify@gmail.com
              </div>
            </div>

            <div className="flex justify-between my-2">
              <div className="">
              <i class="fas fa-globe-africa"></i> Languages: 
              </div>
              <div className="">
                Newari, Nepali, English
              </div>
            </div>
          </div>

        </div>

        <div className="">
          <form>
            <div className="flex flex-col">
              <div className="flex mb-3">
                <input type="text" name="" id="" placeholder="Your Name"   className="px-4 py-3 bg-gray-100 rounded-xl w-[300px] mr-3 focus:outline-none" />
                <input type="email" name="" id="" placeholder="Your E-mail" className="px-4 py-3 bg-gray-100 rounded-xl w-[300px] focus:outline-none" />
              </div>

              <input type="text" name="" id="" placeholder="Subject" className="px-4 py-3 bg-gray-100 rounded-xl mb-3 focus:outline-none" />
              <textarea name="" id="" rows={5} placeholder="Your Message" className="px-4 py-3 bg-gray-100 rounded-xl resize-none focus:outline-none" ></textarea>

              <div className="mt-3 text-right">
                <input type="submit" value="Send" className="py-2 px-4 border-1 border-[#679509] rounded-xl font-medium duration-200 ease-linear hover:bg-[#679509] hover:text-white focus:outline-none" />
              </div>
            </div>
          </form>
        </div>
      </div>
      
    </>
  );
};

export default Contact;
