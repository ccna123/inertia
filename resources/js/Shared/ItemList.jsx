import React from "react";

const ItemList = ({ item }) => {
    return (
        <div className="bg-white w-[95%] mx-auto rounded-md m-4 p-4 text-xl flex items-center justify-between cursor-pointer hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)] duration-100">
            <p>{item.name}</p>
            <p>{item.level}</p>
            <p>{item.cost}$</p>
            <p>{item.order_amount}</p>
            <p>{item.subTotal.toLocaleString()}</p>
        </div>
    );
};

export default ItemList;
