import React, { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import Banner from "../components/Banner";
import { useNavigate } from "react-router-dom";

const Cart = ({ total }) => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const tableHeaders = [
    { id: "image", label: "Image" },
    { id: "name", label: "Product Name" },
    { id: "price", label: "Price" },
    { id: "quantity", label: "Qty" },
    { id: "subtotal", label: "Sub Total" },
    { id: "action", label: "Action" },
  ];

  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [discountApplied, setDiscountApplied] = useState(false);
  const [shouldNavigate, setShouldNavigate] = useState(false);

  const calculateSubTotal = (price, quantity) => {
    return price * quantity;
  };

  const calculateCartSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + calculateSubTotal(item.price, item.quantity),
      0,
    );
  };

  const subTotal = calculateCartSubtotal();
  const discountAmount = discountApplied ? subTotal * (discount / 100) : 0;
  const discountedSubtotal = subTotal - discountAmount;
  const taxes = Number((discountedSubtotal * 0.1275).toFixed(2));
  const grandTotal = discountedSubtotal + taxes;

  const incrementQuantity = (itemId) => {
    const item = cartItems.find((item) => item.id === itemId);
    updateQuantity(itemId, item.quantity + 1);
  };

  const decrementQuantity = (itemId) => {
    const item = cartItems.find((item) => item.id === itemId);
    if (item.quantity > 1) {
      updateQuantity(itemId, item.quantity - 1);
    }
  };

  const changeQuantity = (itemId, quantityStr) => {
    const quantity = parseInt(quantityStr) || 1;
    const validQuantity = Math.max(1, Math.min(999, quantity));
    updateQuantity(itemId, validQuantity);
  };

  const removeItem = (itemId) => {
    removeFromCart(itemId);
  };

  const applyCoupon = () => {
    if (couponCode.toLowerCase() === "messi") {
      setDiscount(15);
      setDiscountApplied(true);
    } else {
      setDiscount(0);
      setDiscountApplied(false);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (shouldNavigate) {
      navigate("/shop");
      setShouldNavigate(false);
    }
  }, [shouldNavigate, navigate]);

  const handleContinueShopping = () => {
    setShouldNavigate(true);
  };

  return (
    <>
      <Banner pageTitle={"Cart"} />
      <div className="flex flex-col w-full max-w-6xl mx-auto p-4">
        <section className="mb-8">
          <div className="overflow-x-auto border rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {tableHeaders.map((header) => (
                    <th
                      key={header.id}
                      className="border px-6 py-3 text-center text-lg font-medium text-white uppercase tracking-wider bg-[#679509]"
                    >
                      {header.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 text-center">
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap flex">
                      <div className="w-16 h-16 rounded border overflow-hidden justify-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <a
                        href="#"
                        className="text-blue-600 hover:text-blue-800 text-lg"
                      >
                        {item.name}
                      </a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      Rs {item.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center border rounded w-32">
                        <div className="flex-grow relative">
                          <input
                            type="text"
                            value={item.quantity}
                            onChange={(e) =>
                              changeQuantity(item.id, e.target.value)
                            }
                            className="w-full text-center p-2 border-0 focus:outline-none appearance-none"
                          />
                        </div>
                        <div className="flex flex-col border-l">
                          <button
                            onClick={() => incrementQuantity(item.id)}
                            className="px-2 py-1 text-gray-600 hover:bg-gray-100 border-b"
                          >
                            +
                          </button>
                          <button
                            onClick={() => decrementQuantity(item.id)}
                            className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                          >
                            -
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      Rs {calculateSubTotal(item.price, item.quantity)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between mt-4">
            <button
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              onClick={handleContinueShopping} // Call the handler
            >
              Continue Shopping
            </button>
          </div>
        </section>

        {/* Lower Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Coupon Code */}
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-gray-100 px-4 py-2">
              <h3 className="font-semibold text-lg">Use a Coupon Code</h3>
            </div>
            <div className="p-4">
              <h5 className="mb-2">Have a coupon Code?</h5>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="XXXXX"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="border p-2 rounded flex-grow"
                />
                <button
                  onClick={applyCoupon}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Apply
                </button>
              </div>
              {discountApplied && (
                <div className="mt-2 text-green-600">
                  Discount applied: 15% off
                </div>
              )}
            </div>
          </div>

          {/* Order Total */}
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-gray-100 px-4 py-2">
              <h3 className="font-semibold text-lg">Order Total</h3>
            </div>
            <div className="p-4">
              <div className="flex justify-between mb-2">
                <h4>Sub Total</h4>
                <span>Rs {subTotal}</span>
              </div>

              {discountApplied && (
                <div className="flex justify-between mb-2 text-green-600">
                  <h4>Discount (15%)</h4>
                  <span>- Rs {discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between mb-2">
                <h4>Taxes</h4>
                <span>Rs {taxes}</span>
              </div>

              <hr className="my-3" />

              <div className="flex justify-between font-bold mb-4">
                <h4>Grand Total</h4>
                <span>Rs {grandTotal.toFixed(2)}</span>
              </div>
              <button
                className="block text-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                onClick={() => {
                  navigate("/checkout", { state: { total: grandTotal } });
                }}
              >
                Proceed To Checkout
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Cart;
