import { useContext,useState, useEffect,createContext } from "react";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState(null);
    const [checkout, setCheckout] = useState(null);
    const [wishlist, setWishList] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const token = sessionStorage.getItem("token");
    useEffect(() => {
        const checkAuthentication = async () => {
            setIsLoading(true);
            try {
                const response = await fetch("http://localhost:5000/api/auth/auth-check", {
                    method: "GET",
                    headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }});

                const data = await response.json();
                if (response.ok) {
                    setUser(data.user);
                    setWishList(data.wishlist);
                    setCheckout(data.checkout);
                    setCart(data.cart);
                    setIsLoggedIn(true);
                }

                else {
                    setUser(null);
                    setWishList(null);
                    setCheckout(null);
                    setCart(null);
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.error("Error checking authentication:", error);
                setUser(null);
                setWishList(null);
                setCheckout(null);
                setCart(null);
                setIsLoggedIn(false);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuthentication();
    }, []);

    const login = (userData, wishlist, checkout, cart) => {
        setUser(userData);
        setWishList(wishlist);
        setCheckout(checkout);
        setCart(cart);
        setIsLoggedIn(true);
       
    }

    const logout = () => {
        setUser(null);
        setWishList(null);
        setCheckout(null);
        setCart(null);
        setIsLoggedIn(false);
        sessionStorage.clear();
    }

    const value = {
        user, wishlist, cart, checkout,
        setUser, setCart, setCheckout, setWishList,
        isLoggedIn, isLoading,
        login, logout,
    }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext);
}
export default AuthProvider;