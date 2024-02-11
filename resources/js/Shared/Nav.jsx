import React from "react";
import { InertiaLink, usePage } from "@inertiajs/inertia-react";
import ToolTip from "./ToolTip";

export const Nav = () => {
    const { auth, totalOrderInCart } = usePage().props;
    return (
        <div className="bg-gray-200 p-2 flex justify-between items-center px-12 shadow-[rgba(6,_24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px_-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset]">
            <div className="flex items-center">
                <img
                    src="/images/bg.png"
                    alt=""
                    className="w-[128px] h-[64px] cursor-pointer"
                />
                <p className="text-xl font-bold cursor-pointer">
                    Welcome back {auth ? auth.username : ""}
                </p>
            </div>
            <ul className="flex gap-4 items-center text-slate-500 font-bold text-xl cursor-pointer">
                <li className="hover:bg-black hover:text-white p-2 hover:rounded-md duration-100">
                    <InertiaLink href="/">Home</InertiaLink>
                </li>
                <li className="hover:bg-black hover:text-white p-2 hover:rounded-md duration-100">
                    <InertiaLink href="/market">Market</InertiaLink>
                </li>
                <li className="hover:bg-black hover:text-white p-2 hover:rounded-md duration-100 relative">
                    <InertiaLink href="/cart">Cart</InertiaLink>
                    {totalOrderInCart ? (
                        <ToolTip totalOrderInCart={totalOrderInCart} />
                    ) : null}
                </li>

                {auth ? (
                    <>
                        <li className="hover:bg-black hover:text-white p-2 hover:rounded-md duration-100">
                            <InertiaLink href="/chatroom">Chatroom</InertiaLink>
                        </li>
                        <li className="hover:bg-black hover:text-white p-2 hover:rounded-md duration-100">
                            <InertiaLink
                                as="button"
                                method="post"
                                href="/logout"
                            >
                                Logout
                            </InertiaLink>
                        </li>
                    </>
                ) : (
                    <>
                        <li className="hover:bg-black hover:text-white p-2 hover:rounded-md duration-100">
                            <InertiaLink href="/register">Sign In</InertiaLink>
                        </li>
                        <li className="hover:bg-black hover:text-white p-2 hover:rounded-md duration-100">
                            <InertiaLink href="/login">Login</InertiaLink>
                        </li>
                    </>
                )}
            </ul>
        </div>
    );
};
