import React from "react";
import { Layout } from "../Shared/Layout";
import { Head } from "@inertiajs/inertia-react";

const CheckOutSuccess = ({ customer_name }) => {
    return (
        <div>
            <Layout>
                <Head title="Checkout Success" />
                <div className="flex justify-center items-center mt-28 bg-red-200 rounded-md lg:w-[60%] mx-auto shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
                    <div className="text-center my-4 font-bold">
                        <i className="fa-solid fa-circle-exclamation text-red-500 text-6xl"></i>
                        <p className="text-xl">Payment failure</p>
                    </div>
                </div>
            </Layout>
        </div>
    );
};

export default CheckOutSuccess;
