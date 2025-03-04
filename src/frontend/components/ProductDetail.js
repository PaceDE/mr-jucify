import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const ProductDetail = () => {
  const location = useLocation();
  const { item } = location.state || {};
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState(1);
  const [activeInfoTab, setActiveInfoTab] = useState("description");
  const [quantity, setQuantity] = useState(1);

  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    if (!item) return;

    const itemToAdd = {
      id: item._id,
      name: item.pName,
      price: item.price,
      image: item.imgSrc,
      quantity: quantity,
    };

    addToCart(itemToAdd, quantity);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-wrap">
        <div className="w-full lg:w-1/2 pr-4">
          <div className="tab-content">
            {Array.from({ length: 4 }, (_, index) => (
              <div
                key={index}
                className={`tab-pane fade ${
                  activeTab === index + 1 ? "active show" : ""
                }`}
                id={`tab${index + 1}`}
                role="tabpanel"
              >
                <div className="modal_tab_img">
                  <a href="#">
                    <img
                      src={`./images/${index + 1}.jpg`}
                      alt="txt"
                      className="w-full"
                    />
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="imgselector mt-4">
            <ul className="flex flex-row gap-2 overflow-x-auto">
              {Array.from({ length: 4 }, (_, index) => (
                <li
                  className="nav-item inline-flex"
                  role="presentation"
                  key={index}
                >
                  <button
                    className={`nav-link ${
                      activeTab === index + 1 ? "active" : ""
                    }`}
                    id={`tab${index + 1}-link`}
                    onClick={() => handleTabChange(index + 1)}
                  >
                    <img
                      src={`./images/${index + 1}.png`}
                      alt=""
                      className="max-w-[300px] max-h-[300px]"
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <h3 className="text-2xl font-semibold my-4">
            {item ? item.pName : "Product Name"}
          </h3>
          <p className="leading-8 mb-2 text-gray-600 text-lg">
            {item
              ? item.description ||
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia voluptate, alias, laudantium, ex nemo voluptates necessitatibus atque distinctio iure fuga perferendis praesentium, molestiae ea culpa libero. Explicabo ipsa suscipit minima!"
              : "Product Description"}
          </p>
          <div className="prices">
            <span className="text-5xl font-bold text-green-600">
              Rs. {item ? item.price : "Price"}
            </span>{" "}
            <del className="text-2xl font-medium text-gray-800">Rs. 210</del>
          </div>
          <div className="border-t border-b border-gray-300 py-4 mb-5">
            <span className="font-semibold mr-2">Categories:</span>
            {item.category &&
              item.category.map((cat, index) => (
                <span key={index}>
                  {cat}
                  {index < item.category.length - 1 && ", "}
                </span>
              ))}
          </div>

          <div className="flex items-center mb-5 space-x-10">
            <span className="flex items-center border border-green-600 w-36 appearance-none">
              <input
                type="number"
                min="1"
                max="999"
                step="1"
                value={quantity}
                readOnly
                className="w-full text-center outline-none appearance-none"
              />
              <div className="flex flex-col">
                <div
                  className="bg-green-600 text-white flex items-center justify-center cursor-pointer transition-all duration-400 ease-in-out w-8 h-full"
                  onClick={increaseQuantity}
                >
                  +
                </div>
                <div
                  className="bg-green-600 text-white flex items-center justify-center cursor-pointer transition-all duration-400 ease-in-out w-8 h-full"
                  onClick={decreaseQuantity}
                >
                  -
                </div>
              </div>
            </span>
            <button
              onClick={handleAddToCart}
              className="bg-green-600 text-white border border-green-600 py-3 px-8 text-center text-lg font-medium transition-all duration-400 ease-in-out"
            >
              <i className="bi bi-cart-fill"></i>
              Add to Cart
            </button>
          </div>
          <div className="border-t border-b border-gray-300 py-4 mb-5">
            <div className="flex items-center ml-4">
              <span className="font-semibold">Share:</span>
              {["facebook", "twitter", "pinterest", "instagram"].map(
                (platform) => (
                  <span className="ml-2" key={platform}>
                    <a
                      href="#"
                      className="flex items-center justify-center w-8 h-8 border-2 border-green-600 text-green-600 transition-all duration-400 ease-in-out"
                    >
                      <i className={`bi bi-${platform}`}></i>
                    </a>
                  </span>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto p-4">
        {/* Tab Navigation */}
        <div className="flex justify-start items-center border border-green-600 rounded-full overflow-hidden w-fit mx-auto">
          <button
            className={`px-6 py-3 ${
              activeInfoTab === "description"
                ? "bg-green-600 text-white"
                : "bg-white text-gray-700"
            } rounded-l-full transition-all duration-300`}
            onClick={() => setActiveInfoTab("description")}
          >
            DESCRIPTION
          </button>
          <button
            className={`px-6 py-3 border-l border-green-600 ${
              activeInfoTab === "additionalinformation"
                ? "bg-green-600 text-white"
                : "bg-white text-gray-700"
            } transition-all duration-300`}
            onClick={() => setActiveInfoTab("additionalinformation")}
          >
            ADDITIONAL INFORMATION
          </button>
          <button
            className={`px-6 py-3 border-l border-green-600 ${
              activeInfoTab === "review"
                ? "bg-green-600 text-white"
                : "bg-white text-gray-700"
            } rounded-r-full transition-all duration-300`}
            onClick={() => setActiveInfoTab("review")}
          >
            REVIEW
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content mt-4 p-4">
          {activeInfoTab === "description" && (
            <div className="text-gray-700 leading-7">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque,
                ea saepe officia ipsam, eveniet aliquid officiis placeat dolore
                aperiam inventore.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                suscipit dolores sequi officia? Reprehenderit reiciendis
                explicabo pariatur temporibus cupiditate perspiciatis ut.
              </p>
            </div>
          )}

          {activeInfoTab === "additionalinformation" && (
            <div className="overflow-x-auto text-center">
              <table className="table-auto border border-gray-300 mx-auto">
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-2">Capacity</td>
                    <td className="border border-gray-300 p-2">5 kg</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">Color</td>
                    <td className="border border-gray-300 p-2">
                      Black, Brown, Red
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">Material</td>
                    <td className="border border-gray-300 p-2">
                      Artificial Leather
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeInfoTab === "review" && (
            <div>
              <h3 className="text-xl font-semibold mb-4">1 review</h3>
              <ul>
                <li className="flex mb-4">
                  <img
                    src="./images/tes2.jpg"
                    alt=""
                    className="w-16 h-16 mr-4 rounded-full"
                  />
                  <div className="content">
                    <div className="flex justify-between">
                      <h5 className="text-lg font-semibold">Anon</h5>
                      <small className="text-gray-500">Jun 01, 2023</small>
                    </div>
                    <p className="mt-2 text-gray-700">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Repellendus, corrupti. Quaerat laborum earum voluptatem
                      dolore.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>{" "}
    </div>
  );
};

export default ProductDetail;
