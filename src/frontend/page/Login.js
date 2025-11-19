import React, { useState } from 'react'
import { useNavigate} from 'react-router-dom';
//import { useAuth } from "../component/AuthContext";
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye,faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../context/AuthContext';


function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [loginError,setLoginError] =useState();
  const [isSubmitting, setIsSubmitting] = useState(false)
  const {login,isLoggedIn} =useAuth();

  const validateForm = () => {
    const newErrors = {}

    if (!email.trim()) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid"
    if (!password) newErrors.password = "Password is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm())
      return

    setIsSubmitting(true)
     try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Login Succesfull")
        setIsSubmitting(false);
        sessionStorage.setItem("token",data.token);  
        login(data.user,data.wishlist,data.cart,data.checkout);
        console.log("b:"+isLoggedIn);
        toast.success("Login Successfull");   
        navigate("/shop");
      } else {
        toast.error(data.msg);
        setIsSubmitting(false);
        setLoginError(data.msg);
      }
    } catch (error) {
      setIsSubmitting(false);
      setLoginError("Error occured.");
      console.error("Login failed:", error.message);
      toast.error("Login Failed. Please try again later");

    }
  }

  return (
    <section className='container bg-gray-50 min-w-full h-full p-5 '>
      
        <div className="max-w-2xl text-center">
          <p className="text-base text-gray-600">
            Sign in to your account to continue saving lives.
          </p>
        </div>

      <div className=' w-[90%] md:w-[70%] lg:w-[50%] px-10 mx-auto'>
        <div className='rounded-lg mt-6 border border-gray-200 shadow-md'>
          <div className=" text-white w-full p-5 px-7 rounded-t-lg bg-gradient-to-r from-green-600 to-green-600">
              <h3 className="text-[25px] font-medium">Sign In</h3>
            <p>Enter your credentials to access your account</p>
          </div>
          <div className="w-full p-10 bg-white">

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1">
                <div className="form-element">
                  
                 
                    <input
                      id="email"
                      type="email"
                      placeholder="Enter your Email address"
                      className="pl-10 w-full h-12 rounded-md border-b-2 border-b-green-200 focus:outline-none focus:border-b-green-600 transition-colors duration-300 ease-linear"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}

                    />
                  
                  {errors.email && <p className="text-green-600 text-sm">{errors.email}</p>}
                </div>

                {/* Password */}
                <div className="form-element my-8 relative">
                 
                    <input
                      id="password"
                      type={showPassword? "text":"password"}
                      placeholder="Enter your password"
                      className="pl-10 w-full h-12 rounded-md border-b-2 border-b-green-200 focus:outline-none focus:border-b-green-600 transition-colors duration-300 ease-linear"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}

                    />
                    <button
                      type="button"
                      className="absolute right-3 top-3 text-gray-400"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {!showPassword ? (<FontAwesomeIcon icon={faEye} className='h-4 w-4 text-gray-400'/>) 
                      : (<FontAwesomeIcon icon={faEyeSlash}className='h-4 w-4 text-gray-400'/>)}
                     
                    </button>
                 
                  {errors.password && <p className="text-green-600 text-sm">{errors.password}</p>}
                </div>



              </div>



              <div>
                <button type="submit" disabled={isSubmitting} onClick={handleSubmit} className='text-center text-white bg-green-600 w-full p-3 rounded-2xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'>
                  {isSubmitting ? "Logging in..." : "Login"}
                </button>
                {loginError && <p className="text-green-600 text-sm">{loginError}</p>}
              </div>

            </form>

          </div>
        </div>
      </div>
     
    </section>
  );
}

export default Login;
