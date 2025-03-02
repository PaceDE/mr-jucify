import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Banner from "./Banner";
import CryptoJS from "crypto-js";
import { v4 as uuidv4 } from "uuid";

const Checkout = () => {
  const location = useLocation();
  const totalcost = location.state?.total || 100;
  let shipping = 0;
  if (totalcost) {
    shipping = Math.floor(Math.random() * 100);
  }

  const [user, setUser] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [formData, setFormData] = useState({
    amount: "10",
    tax_amount: "0",
    total_amount: "10",
    transaction_uuid: uuidv4(),
    product_code: "EPAYTEST",
    product_service_charge: "0",
    product_delivery_charge: "0",
    success_url: "https://developer.esewa.com.np/success",
    failure_url: "https://developer.esewa.com.np/failure",
    signed_field_names: "total_amount,transaction_uuid,product_code",
  });

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      amount: totalcost.toString(),
    }));
  }, [totalcost]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/getuser", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    fetchUserData();
  }, []);

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const generateSignature = (data) => {
    const secretKey = "8gBm/:&EnhH.1/q";
    const hashedString = `total_amount=${data.total_amount},transaction_uuid=${data.transaction_uuid},product_code=${data.product_code}`;
    const hash = CryptoJS.HmacSHA256(hashedString, secretKey);
    const signature = CryptoJS.enc.Base64.stringify(hash);

    return signature;
  };

  const handlePlaceOrder = () => {
    if (paymentMethod === "E-Sewa") {
      const signature = generateSignature(formData);
      const form = document.createElement("form");
      form.method = "POST";
      form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

      Object.keys(formData).forEach((key) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = formData[key];
        form.appendChild(input);
      });

      const signatureInput = document.createElement("input");
      signatureInput.type = "hidden";
      signatureInput.name = "signature";
      signatureInput.value = signature;
      form.appendChild(signatureInput);

      document.body.appendChild(form);
      form.submit();
    } else if (paymentMethod === "Cash on Delivery") {
      alert("Cash on Delivery selected. Proceeding with the order.");
    } else {
      alert("Please select a payment method.");
    }
  };

  return (
    <>
      <Banner pageTitle={"Register"} />
      <div className="mt-24 mb-24 mr-8 font-sans text-sm flex">
        {/* Main Section */}
        <div className="w-3/4">
          <div className="ml-12 bg-white p-5">
            <h2 className="mb-8 pb-4 border-b border-gray-200 font-bold text-2xl">
              Billing Details
            </h2>
            <form action="#">
              <div className="flex flex-wrap">
                <div className="w-1/2 pr-4 mb-4">
                  <label className="font-normal">First Name*</label>
                  <input
                    type="text"
                    required="required"
                    className="w-full border border-gray-300 rounded-none py-2 px-3 focus:outline-none focus:border-green-500"
                    defaultValue={user?.firstname || ""} // Use user data if available
                  />
                </div>

                <div className="w-1/2 pr-4 mb-4">
                  <label className="font-normal">Last Name*</label>
                  <input
                    type="text"
                    required="required"
                    className="w-full border border-gray-300 rounded-none py-2 px-3 focus:outline-none focus:border-green-500"
                    defaultValue={user?.lastname || ""} // Use user data if available
                  />
                </div>
              </div>

              <div className="mb-4 pr-4">
                <label className="font-normal">Company Name*</label>
                <input
                  type="text"
                  required="required"
                  className="w-full border border-gray-300 rounded-none py-2 px-3 focus:outline-none focus:border-green-500"
                  defaultValue={user?.company || ""} // Use user data if available
                />
              </div>

              <div className="mb-4 pr-4">
                <label className="font-normal">Email*</label>
                <input
                  type="text"
                  required="required"
                  className="w-full border border-gray-300 rounded-none py-2 px-3 focus:outline-none focus:border-green-500"
                  defaultValue={user?.email || ""}
                />
              </div>

              <div className="mb-4 pr-4">
                <label className="font-normal">Phone*</label>
                <input
                  type="text"
                  required="required"
                  className="w-full border border-gray-300 rounded-none py-2 px-3 focus:outline-none focus:border-green-500"
                  defaultValue={user?.phone || ""}
                />
              </div>

              <div className="mb-4 pr-4">
                <label className="font-normal">Country*</label>
                <input
                  type="text"
                  required="required"
                  className="w-full border border-gray-300 rounded-none py-2 px-3 focus:outline-none focus:border-green-500"
                  defaultValue={user?.country || ""}
                />
              </div>

              <div className="mb-4 pr-4">
                <label className="font-normal">Zip*</label>
                <input
                  type="text"
                  required="required"
                  className="w-full border border-gray-300 rounded-none py-2 px-3 focus:outline-none focus:border-green-500"
                  defaultValue={user?.zip || ""}
                />
              </div>

              <div className="mb-4 pr-4 flex items-center">
                <input type="checkbox" className="w-4 h-4" />
                <label className="ml-2 font-normal">
                  Ship to a different address?
                </label>
              </div>

              <div className="mb-4 pr-4">
                <p className="font-normal">Order Notes (Optional)</p>
                <textarea
                  className="w-full border border-gray-300 rounded-none py-2 px-3"
                  rows="5"
                ></textarea>
              </div>
            </form>
          </div>
        </div>

        {/* Sidebar Section */}
        <div className="w-1/4">
          <div className="ml-5 bg-white p-5">
            <h2 className="mb-8 pb-4 border-b border-gray-200 font-bold text-2xl">
              Checkout Summary
            </h2>
            <ul>
              <li className="py-2 border-b border-gray-200 text-gray-600 leading-8">
                Subtotal
                <span className="float-right ml-20">Rs. {totalcost}</span>
              </li>
              <li className="py-2 border-b border-gray-200 text-gray-600 leading-8">
                Shipping
                <span className="float-right ml-20">Rs. {shipping}</span>
              </li>
              <li className="py-2 text-gray-600 leading-8">
                <b className="font-bold">Payable Total</b>
                <span className="float-right ml-20">
                  <b className="font-bold">Rs. {totalcost + shipping}</b>
                </span>
              </li>
            </ul>
          </div>

          <div className="ml-5 mt-8 bg-white p-5">
            <h2 className="mb-8 pb-4 border-b border-gray-200 font-bold text-2xl">
              Payment Method
            </h2>
            <div className="mb-2 cursor-default">
              <input
                type="radio"
                name="paymentMethod"
                value="Cash on Delivery"
                className="mr-2"
                onChange={handlePaymentMethodChange}
              />
              <span>Cash on Delivery</span>
            </div>

            <div className="mb-2 cursor-default">
              <input
                type="radio"
                name="paymentMethod"
                value="E-Sewa"
                className="mr-2"
                onChange={handlePaymentMethodChange}
              />
              <span>E-Sewa</span>
            </div>
            <div className="mt-4">
              <input
                type="button"
                value="Place Order"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 transition-colors duration-300 cursor-pointer"
                onClick={handlePlaceOrder}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
