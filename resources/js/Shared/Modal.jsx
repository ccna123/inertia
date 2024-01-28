import { usePage } from "@inertiajs/inertia-react";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Inertia } from "@inertiajs/inertia";

const Modal = ({ handleToggleModal, selectedItem }) => {
    const { flash } = usePage().props;
    const [quantity, setQuantity] = useState(1);
    const handleOnClickCancel = () => {
        handleToggleModal(false);
    };
    const handleBuy = async (e) => {
        e.preventDefault();
        Inertia.post(
            "/order",
            {
                itemId: selectedItem.id,
                itemName: selectedItem.name,
                order_amount: quantity,
            },
            {
                onSuccess: () => {
                    flash.message = null;
                },
            }
        );
    };
    useEffect(() => {
        if (flash.message !== null) {
            toast.success(`${flash.message}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
    }, [flash.message]);

    return (
        <>
            <ToastContainer />
            <div className="bg-black/20 absolute top-0 left-0 flex justify-center  z-10 w-full h-screen">
                <div className="bg-white rounded-md lg:w-[40%] h-fit mt-28 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]">
                    <div className="flex items-center py-2">
                        <h1 className="text-center text-3xl font-bold w-[95%]">
                            {selectedItem.name}
                        </h1>
                        <i
                            className="fa-solid fa-xmark text-3xl mr-2 cursor-pointer"
                            onClick={handleOnClickCancel}
                        />
                    </div>
                    <form className="mx-auto px-5 py-4">
                        <div className="flex justify-between items-center p-2 w-full">
                            <div>
                                <label
                                    htmlFor="text"
                                    className="block mb-2 text-xl font-medium text-black"
                                >
                                    Level
                                </label>
                                <label
                                    htmlFor="text"
                                    className="block mb-2 text-xl font-medium text-black"
                                >
                                    Cost
                                </label>
                                <label
                                    htmlFor="text"
                                    className="block mb-2 text-xl font-medium text-black"
                                >
                                    In Storage
                                </label>
                                <label
                                    htmlFor="text"
                                    className="block mb-2 text-xl font-medium text-black"
                                >
                                    Amount Want To Buy
                                </label>
                            </div>
                            <div className="text-right">
                                <p className="text-xl">{selectedItem.level}</p>
                                <p className="text-xl">{selectedItem.cost}$</p>
                                <p className="text-xl">
                                    {selectedItem.amount_in_storage}
                                </p>
                                <input
                                    className="border-2 rounded-md p-1 text-xl focus:outline-none w-[40%]"
                                    type="number"
                                    min={1}
                                    value={quantity}
                                    onChange={(e) =>
                                        setQuantity(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-center gap-4">
                            <button
                                onClick={(e) => handleBuy(e)}
                                type="submit"
                                className="my-4 w-full hover:scale-105 duration-100 bg-green-500 rounded-lg p-2 text-white font-bold"
                            >
                                Buy
                            </button>
                            <button
                                onClick={handleOnClickCancel}
                                type="submit"
                                className="my-4 w-full hover:scale-105 duration-100 bg-red-500 rounded-lg p-2 text-white font-bold"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Modal;
