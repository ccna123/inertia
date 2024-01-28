import React from "react";
import { Nav } from "./Nav";
export const Layout = ({ children }) => {
    return (
        <div className=" bg-gradient-to-br from-orange-200 to bg-orange-400 h-screen">
            <Nav />
            {children}
        </div>
    );
};
