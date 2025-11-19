import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const Register = () => {
    const navigate = useNavigate();
    const [submitError, setSubmitError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phone:'',
        password: '',
        confirmPassword:''
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.username.trim()) newErrors.username = "Enter Username";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        if (!formData.password) newErrors.password = "Password is required";
        if (!formData.phone) newErrors.phone = "Phone no is requried";
        else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        setSubmitError('');
        setIsSubmitting(true);
        const {confirmPassword,...userData} ={...formData}

        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                toast.success("Registration Succesfull");
                navigate('/login');
            } else {
                const errorData = await response.json();
                setSubmitError(errorData.message || 'Registration failed');
            }
        } catch (error) {
            toast.error("Failed to register. Please try again.");

            setSubmitError(error.message || 'Network error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="container bg-green-50 min-w-full h-full p-5">
            <div className="px-10">
                <div className="rounded-lg mt-6 border border-gray-200 shadow-md">

                    <div className="bg-white p-8 rounded-lg shadow-md">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            <div>
                                <label htmlFor="username" className="block mb-1 font-medium">Username</label>
                                <input
                                    id="username"
                                    type="text"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="pl-10 rounded-md w-full h-12 border-b-2 border-b-green-200 focus:outline-none focus:border-b-green-500 transition-colors duration-300 ease-linear"
                                />
                                {errors.username && <p className="text-green-500 text-sm">{errors.username}</p>}
                            </div>

                            <div className="form-element">
                                <label htmlFor="email" className="text-gray-700 font-medium mb-2 block">
                                    Email Address *
                                </label>

                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your Email address"
                                    className="pl-10 rounded-md w-full h-12 border-b-2 border-b-green-200 focus:outline-none focus:border-b-green-500 transition-colors duration-300 ease-linear"
                                    value={formData.email}
                                    onChange={handleChange}
                                />

                                {errors.email && <p className="text-green-500 text-sm">{errors.email}</p>}
                            </div>


                            <div className="form-element">
                                <label htmlFor="phone" className="text-gray-700 font-medium mb-2 block">
                                    Phone Number *
                                </label>

                                <input
                                    id="phone"
                                    type="tel"
                                    maxLength={10}
                                    minLength={10}
                                    placeholder="Enter your phone number"
                                    className="pl-10 rounded-md w-full h-12 border-b-2 border-b-green-200 focus:outline-none focus:border-b-green-500 transition-colors duration-300 ease-linear"
                                    value={formData.phone}
                                    onChange={handleChange}

                                />

                                {errors.phone && <p className="text-green-500 text-sm">{errors.phone}</p>}
                            </div>

                            {/* Password */}
                            <div className="form-element">
                                <label htmlFor="password" className="text-gray-700 font-medium mb-2 block">
                                    Password *
                                </label>

                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    className="pl-10 rounded-md w-full h-12 border-b-2 border-b-green-200 focus:outline-none focus:border-b-green-500 transition-colors duration-300 ease-linear"
                                    value={formData.password}
                                    onChange={handleChange}

                                />

                                {errors.password && <p className="text-green-500 text-sm">{errors.password}</p>}
                            </div>

                            {/* Confirm Password */}
                            <div className="form-element">
                                <label htmlFor="confirmPassword" className="text-gray-700 font-medium mb-2 block">
                                    Confirm Password *
                                </label>

                                <input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="Re-enter your password"
                                    className="pl-10 rounded-md w-full h-12 border-b-2 border-b-green-200 focus:outline-none focus:border-b-green-500 transition-colors duration-300 ease-linear"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}


                                />

                                {errors.confirmPassword && <p className="text-green-500 text-sm">{errors.confirmPassword}</p>}
                            </div>
                        </div>
                        <div className="mt-8">
                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className={`w-full p-3 text-white rounded-xl ${isSubmitting
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800'
                                    }`}
                            >
                                {isSubmitting ? 'Registering...' : 'Register'}
                            </button>
                            {submitError && <p className="text-green-600 mt-3">{submitError}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Register