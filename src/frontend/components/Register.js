import { useState } from "react";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;
    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Email is invalid");
      isValid = false;
    } else {
      setEmailError("");
    }
    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      isValid = false;
    } else {
      setPasswordError("");
    }
    if (!isValid) {
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/createuser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            firstname,
            lastname,
          }),
        },
      );

      if (response.ok) {
        setErrorMessage("");
      } else {
        const data = await response.json();
        setErrorMessage(data.message || "Unknown error");
      }
    } catch (error) {
      console.error("Error registering:", error);
      setErrorMessage("Network error");
    }
  };

  return (
    <div className="mx-auto mt-24 max-w-md w-full text-center">
      <div className="bg-white p-6 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold capitalize mb-6">
          Create your account
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 relative">
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              className="w-full border border-gray-300 rounded-md py-3 pl-10 pr-4 focus:outline-none focus:border-green-500 text-sm"
            />
            <i className="bi bi-person-fill absolute left-2.5 top-1/2 transform -translate-y-1/2 text-green-500 text-xl"></i>
          </div>
          <div className="mb-4 relative">
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              className="w-full border border-gray-300 rounded-md py-3 pl-10 pr-4 focus:outline-none focus:border-green-500 text-sm"
            />
            <i className="bi bi-person-fill absolute left-2.5 top-1/2 transform -translate-y-1/2 text-green-500 text-xl"></i>
          </div>

          <div className="mb-4 relative">
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="w-full border border-gray-300 rounded-md py-3 pl-10 pr-4 focus:outline-none focus:border-green-500 text-sm"
            />
            <div className="error-message text-red-500">{emailError}</div>
            <i className="bi bi-envelope-fill absolute left-2.5 top-1/2 transform -translate-y-1/2 text-green-500 text-xl"></i>
          </div>
          <div className="mb-4 relative">
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full border border-gray-300 rounded-md py-3 pl-10 pr-4 focus:outline-none focus:border-green-500 text-sm"
            />
            <div className="error-message text-red-500">{passwordError}</div>
            <i className="bi bi-key-fill absolute left-2.5 top-1/2 transform -translate-y-1/2 text-green-500 text-xl"></i>
          </div>
          {/* Uncomment if you want to add confirm password functionality */}
          {/* <div className="mb-4 relative">
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full border border-gray-300 rounded-md py-3 pl-10 pr-4 focus:outline-none focus:border-green-500 text-sm"
            />
            <i className="bi bi-key-fill absolute left-2.5 top-1/2 transform -translate-y-1/2 text-green-500 text-xl"></i>
          </div> */}
          <div className="mb-4">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-full w-full transition-colors duration-300"
            >
              Create Account
            </button>
          </div>
          {errorMessage && (
            <div className="error-message text-red-500">{errorMessage}</div>
          )}
        </form>
      </div>

      <div className="bg-gray-100 py-7 px-2">
        <h4 className="text-gray-700 text-sm">
          Already have an account?{" "}
          <a href="login.html" className="text-green-500 hover:underline">
            Log In
          </a>
        </h4>
      </div>
    </div>
  );
}

export default Register;
