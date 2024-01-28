import React, { useState, useEffect } from "react";
import { Layout } from "../Shared/Layout";
import { Head, InertiaLink, usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Modal from "../Shared/Modal";

const Market = ({ items }) => {
    const [searchInput, setSearchInput] = useState("");
    const { url, flash } = usePage().props;
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    let debounceTimeout;

    useEffect(() => {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
            Inertia.get(
                url,
                { search: searchInput },
                {
                    preserveState: true,
                }
            );
        }, 500);
    }, [searchInput]);

    const handleToggleModal = (item) => {
        setSelectedItem(item);
        setShowModal(!showModal);
    };

    return (
        <Layout>
            <ToastContainer />
            {showModal ? (
                <Modal
                    selectedItem={selectedItem}
                    handleToggleModal={handleToggleModal}
                />
            ) : null}
            <Head title="Market" />
            {/* Search */}
            <div className="p-3 text-center mt-4">
                <input
                    type="text"
                    placeholder="Search..."
                    className="p-2 rounded-lg w-[80%] focus:border-blue-400"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />
            </div>
            {/* End search */}
            <div className="mt-4 lg:w-[80%] lg:mx-auto">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Image
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Product name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Level
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Cost
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Amount In Storage
                                </th>
                                <th
                                    scope="col"
                                    colSpan={2}
                                    className="px-6 py-3 text-center"
                                >
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.data.map((item) => {
                                return (
                                    <tr
                                        key={item.id}
                                        className="bg-white border-b dark:border-gray-700 hover:bg-gray-200/85 duration-100"
                                    >
                                        <th
                                            scope="row"
                                            className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap"
                                        >
                                            <img
                                                src={item.image_url}
                                                alt=""
                                                className="w-[64px] h-[64px]"
                                            />
                                        </th>
                                        <th
                                            scope="row"
                                            className="px-6 py-1 text-lg font-medium text-gray-900 whitespace-nowrap "
                                        >
                                            {item.name}
                                        </th>
                                        <td className="px-6 py-1 font-bold text-lg">
                                            {item.level}
                                        </td>
                                        <td className="px-6 py-1 font-bold text-lg">
                                            {item.cost}$
                                        </td>
                                        <td className="px-6 py-1 font-bold text-lg">
                                            {item.amount_in_storage}
                                        </td>
                                        <td className="py-1 text-center">
                                            <button
                                                onClick={() =>
                                                    handleToggleModal(item)
                                                }
                                                className="font-bold text-lg hover:scale-105 duration-100 text-white bg-green-500 px-6 p-1 rounded-md"
                                            >
                                                Buy
                                            </button>
                                        </td>
                                        <td className="py-1 text-center">
                                            <button className="font-bold text-lg hover:scale-105 duration-100 text-white bg-pink-300 px-6 p-1 rounded-md">
                                                Like
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Paginator */}
            <div className="text-center mt-2 flex gap-4 justify-center">
                {items.links.map((link) => {
                    return (
                        <div
                            key={link.label}
                            className={`${
                                link.active
                                    ? "bg-green-500 text-white"
                                    : "text-white font-bold"
                            } px-3 py-2 rounded`}
                        >
                            {link.label === "&laquo; Previous" ? (
                                <InertiaLink
                                    preserveState={true}
                                    href={link.url}
                                >
                                    &laquo; Previous
                                </InertiaLink>
                            ) : link.label === "Next &raquo;" ? (
                                <InertiaLink
                                    preserveState={true}
                                    href={link.url}
                                >
                                    Next &raquo;
                                </InertiaLink>
                            ) : (
                                <InertiaLink
                                    preserveState={true}
                                    href={link.url}
                                >
                                    {link.label}
                                </InertiaLink>
                            )}
                        </div>
                    );
                })}
            </div>
        </Layout>
    );
};

export default Market;
