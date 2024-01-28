import React from "react";

const ToolTip = ({ totalOrderInCart }) => {
    return (
        <div className="bg-red-500 text-sm p-4 text-white border-3 border-green-600 flex justify-center items-center font-bold h-[0.5rem] w-[0.5rem] rounded-full absolute -top-1 left-10">
            <p>{totalOrderInCart}</p>
        </div>
    );
};

export default ToolTip;
