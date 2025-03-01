import React from "react";
import Banner from "./Banner";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      // if (data.success) {
      //   console.log("Login successful:", data);
      navigate("/shop");
      // } else {
      // setError(data.msg);
      // }
    } catch (error) {
      setError("Error occured.");
      console.error("Login failed:", error.message);
    }
  };
  return (
    <>
      <Banner pageTitle={"Login"} />
      <div className="mx-auto mt-24 max-w-md w-full text-center">
        <div className="bg-white p-6 rounded-md shadow-md">
          <h2 className="text-2xl font-semibold capitalize mb-6">
            Log In To Your Account
          </h2>
          <div className="mb-4 relative">
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-gray-300 rounded-md py-3 pl-10 pr-4 focus:outline-none focus:border-green-500 text-sm"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <i className="bi bi-person-fill absolute left-2.5 top-1/2 transform -translate-y-1/2 text-green-500 text-xl"></i>
          </div>
          <div className="mb-4 relative">
            <input
              type="password"
              placeholder="Password"
              className="w-full border border-gray-300 rounded-md py-3 pl-10 pr-4 focus:outline-none focus:border-green-500 text-sm"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <i className="bi bi-key-fill absolute left-2.5 top-1/2 transform -translate-y-1/2 text-green-500 text-xl"></i>
          </div>
          <div className="mb-4">
            <input
              type="button"
              value="Login In"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-full w-full transition-colors duration-300"
              onClick={handleLogin}
            />

            {error && <p style={{ color: "red" }}> {error}</p>}
          </div>
        </div>

        <div className="bg-gray-100 py-7 px-2 ">
          <h5 className="text-gray-700 text-sm">
            Don't have an account?{" "}
            <a href="register.html" className="text-green-500 hover:underline">
              Sign Up
            </a>
          </h5>
        </div>
      </div>
    </>
  );
}

export default Login;
