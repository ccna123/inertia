import React, { useEffect } from "react";
import { Layout } from "../Shared/Layout";
import { Head, InertiaLink } from "@inertiajs/inertia-react";

const LoginSuccess = ({ username }) => {
    return (
        <div>
            <Head title="Checkout Success" />
            <div className="flex justify-center items-center mt-28 bg-green-200 rounded-md lg:w-[60%] mx-auto shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
                <div className="text-center my-4 font-bold">
                    <i className="fa-solid fa-circle-check text-green-500 text-6xl" />
                    <p className="text-xl">Login Successfully</p>
                    <p>Welcome back, {username}</p>
                    <p className="space-x-3">
                        You can go to{" "}
                        <InertiaLink
                            className="hover:underline text-blue-600"
                            href="/cart"
                        >
                            Cart
                        </InertiaLink>{" "}
                        to check order
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginSuccess;
