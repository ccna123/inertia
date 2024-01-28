import React from "react";
import { Layout } from "../Shared/Layout";
import { Head } from "@inertiajs/inertia-react";

const Welcome = () => {
    return (
        <Layout>
            <Head title={"Welcome"} />
            <div className="flex justify-center items-center mt-28 cursor-pointer">
                <div className="">
                    <h1 className="text-5xl font-bold mb-4 text-center">
                        <span className="text-[#0FA038]">T</span>he{" "}
                        <span className="text-white">C</span>oolest{" "}
                        <span className="text-[#0B56A4]">T</span>oy <br />{" "}
                        <span className="text-[#F38D29]">I</span>n{" "}
                        <span className="text-[#F9DD1D]">T</span>he{" "}
                        <span className="text-[#E5152C]">W</span>orld
                    </h1>
                    <img
                        src="/images/rubik.jpeg"
                        alt=""
                        className="mx-auto w-[400px] h-[400px] rounded-md shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)]"
                    />
                </div>
            </div>
        </Layout>
    );
};

export default Welcome;
