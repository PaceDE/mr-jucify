import React, { useRef, useEffect } from "react";

const Modal = ({
  imgSrc,
  pName,
  price,
  originalPrice,
  category,
  pId,
  addToCart,
  onClose,
}) => {
  const modalRef = useRef(null);

  const handleAddToCart = () => {
    const item = {
      id: pId,
      name: pName,
      price,
      originalPrice,
      category,
      image: imgSrc,
      quantity: 1,
    };

    addToCart(item);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={(e) => {
        if (e.target.classList.contains("fixed")) {
          onClose();
        }
      }}
    >
      <div
        ref={modalRef}
        className="bg-white p-8 rounded-lg relative w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-2xl font-bold bg-transparent border-none cursor-pointer"
        >
          &times;
        </button>
        <div className="flex mx-[-4px] my-4">
          <div className="w-1/2 px-4">
            <div className="tab-content">
              <div className="tab-pane fade show active" role="tabpanel">
                <div className="modal-tab-img">
                  <img
                    src={imgSrc}
                    alt={pName}
                    className="w-full rounded-lg"
                    style={{ maxWidth: "100%" }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/2 px-4">
            <h3 className="text-3xl font-semibold my-4">{pName}</h3>
            <p className="leading-7 mb-4 text-gray-700 text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
              voluptate, alias, laudantium, ex nemo voluptates necessitatibus
              atque distinctio iure fuga perferendis praesentium, molestiae ea
              culpa libero. Explicabo ipsa suscipit minima!
            </p>
            <div className="prices mb-4">
              <span className="text-4xl font-bold text-green-600 mr-2">
                Rs. {price}
              </span>
              <del className="text-xl font-medium text-gray-600">
                Rs. {originalPrice}
              </del>
            </div>
            <div className="border-t border-b border-gray-300 py-4 mb-5">
              <span className="font-semibold mr-2">Categories:</span>
              {category &&
                category.map((cat, index) => (
                  <span key={index}>
                    {cat}
                    {index < category.length - 1 && ", "}
                  </span>
                ))}
            </div>
            <div className="flex items-center mb-5">
              <div className="cart">
                <button
                  onClick={handleAddToCart}
                  className="bg-green-600 text-white border border-green-600 py-3 px-8 text-center text-lg font-medium transition-all duration-400 ease-in-out rounded-md"
                >
                  <i className="bi bi-cart-fill"></i> Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
