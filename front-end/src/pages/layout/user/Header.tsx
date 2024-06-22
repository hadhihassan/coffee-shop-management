import { Cart } from "@/components/user/Cart";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom"

export default function Header() {
    const navigate = useNavigate()
    const [isLogged, setLogges] = useState(false);
    const token = localStorage.getItem("UserAccessToken")
    useEffect(() => {
        if (token) {
            setLogges(true)
        }
    }, [])
    return (<>
        <div className="w-full   rounded-2xl  h-auto">
            <div className='flex w-[79%] mt-10 m-auto'>
                <ul className='font-sans font-semibold  flex gap-10'>
                    <li onClick={() => navigate("/")}>
                        <p className="group  transition duration-300 hover:cursor-pointer">
                            Home
                            <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-amber-700"></span>
                        </p>
                    </li>
                    <li onClick={() => navigate("/shop")}>
                        <p className="group  transition duration-300 hover:cursor-pointer">
                            Shop
                            <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-amber-700"></span>
                        </p>
                    </li>
                    <li onClick={() => navigate("/cart")}>
                        <p className="group  transition duration-300 hover:cursor-pointer">
                            Cart
                            <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-amber-700"></span>
                        </p>
                    </li>
                    <li onClick={() => navigate("/orders")}>
                        <p className="group  transition duration-300 hover:cursor-pointer">
                            Orders
                            <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-amber-700"></span>
                        </p>
                    </li>
                    {
                        isLogged ? <>
                            <li onClick={() => navigate("/login")}>
                                <p className="group  transition duration-300 hover:cursor-pointer">
                                    Logout
                                    <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-amber-700"></span>
                                </p>
                            </li>
                        </> : <>
                            <li onClick={() => navigate("/login")}>
                                <p className="group  transition duration-300 hover:cursor-pointer">
                                    Login
                                    <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-amber-700"></span>
                                </p>
                            </li>
                            <li onClick={() => navigate("/signup")}>
                                <p className="group  transition duration-300 hover:cursor-pointer">
                                    Signup
                                    <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-amber-700"></span>
                                </p>
                            </li>
                        </>
                    }
                </ul>
            </div>
        </div>
        {/* <Cart /> */}
        <Outlet />
    </>
    )
}
