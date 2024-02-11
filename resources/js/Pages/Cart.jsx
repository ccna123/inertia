import React, { useState, useEffect } from "react";
import { Layout } from "../Shared/Layout";
import { Head } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import "react-toastify/dist/ReactToastify.css";

import ItemList from "../Shared/ItemList";

const Cart = ({ items }) => {
    const [orderedItem, setorderedItem] = useState(items);
    const [total, setTotal] = useState(0);

    const handleRemoveOrderedItem = (itemId) => {
        Inertia.post("/deleteOrderItem", {
            itemId,
        });
        setorderedItem((prev) => {
            return prev.filter((item) => item.id !== itemId);
        });
    };
    useEffect(() => {
        const newTotal = orderedItem.reduce(
            (acc, current) => acc + parseFloat(current.subTotal),
            0
        );
        setTotal(newTotal);
    }, [orderedItem.length]);

    return (
        <div>
            <Head title="Cart" />

            <div className="mt-4 lg:w-[90%] lg:mx-auto">
                <div className="relative shadow-md">
                    <div className="flex items-center w-fit ms-auto space-x-5">
                        <a
                            href="/receipt"
                            className="bg-red-600 flex items-center space-x-3 text-white hover:scale-105 duration-100 font-bold w-fit rounded-md px-4 py-1 mb-4 ms-auto cursor-pointer"
                        >
                            <i className="fa-solid fa-receipt" />
                            <p>Print Reciept</p>
                        </a>
                        <div className="bg-white font-bold w-fit rounded-md px-4 py-1 mb-4 ms-auto">
                            Total: <span className="text-red-500">{total}</span>
                            $
                        </div>
                        <div className="bg-purple-600 text-white hover:scale-105 duration-100 font-bold w-fit space-x-3 rounded-md px-4 py-1 mb-4 ms-auto">
                            <button
                                onClick={() => Inertia.get("checkout")}
                                type="button"
                            >
                                Go To Checkout
                            </button>
                            <i className="fa-regular fa-credit-card" />
                        </div>
                    </div>
                    <div className="border-2 pb-3 bg-slate-200 rounded-tl-md rounded-tr-md overflow-y-auto h-[450px]">
                        <div className="bg-white  p-3 font-bold flex items-center justify-between">
                            <p>Name</p>
                            <p>Level</p>
                            <p>Cost</p>
                            <p>Quantity</p>
                            <p>Total</p>
                        </div>
                        <div className="pr-4">
                            {orderedItem.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center"
                                >
                                    <ItemList item={item} />
                                    <i
                                        onClick={() =>
                                            handleRemoveOrderedItem(item.id)
                                        }
                                        className="fa-solid fa-trash cursor-pointer text-xl text-red-500"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
