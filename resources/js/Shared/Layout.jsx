import React from "react";
import { Nav } from "./Nav";
import Welcome from "../Pages/Welcome";
import About from "../Pages/About";
import Login from "../Pages/Login";
import Cart from "../Pages/Cart";
import Market from "../Pages/Market";
import Register from "../Pages/Register";
import CheckoutFailure from "../Pages/CheckoutFailure";
import LoginSuccess from "../Pages/LoginSuccess";
import CheckOutSuccess from "../Pages/CheckoutSuccess";
export const Layout = ({ children }) => {
    return (
        <div className=" bg-gradient-to-br from-orange-200 to bg-orange-400 h-screen w-full overflow-hidden">
            <Nav />
            {children}
        </div>
    );
};
