import React from "react";
import { Layout } from "../Shared/Layout";
import { Head, useForm } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
const Login = () => {
    const { data, setData, errors, processing, post } = useForm({
        password: "",
        email: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/login");
    };

    return (
        <div>
            <Layout>
                <Head title="Login" />
                <div className="bg-white mt-5 w-[80%] mx-auto p-4 rounded-lg shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]">
                    <h1 className="text-center font-bold text-5xl mb-4">
                        Login
                    </h1>
                    <form className="max-w-sm mx-auto">
                        <div className="mb-5">
                            <label
                                htmlFor="email"
                                className="block mb-2 text-lg font-medium text-gray-900"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                className={`${
                                    errors.email
                                        ? "border-red-500 bg-red-300"
                                        : ""
                                }text-sm rounded-lg block w-full p-2.5 bg-white border-2 border-gray-400 text-gray-900`}
                                id="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />
                            {errors.email ? (
                                <p className="text-red-500 text-sm">
                                    {errors.email}
                                </p>
                            ) : null}
                        </div>
                        <div className="mb-5">
                            <label
                                htmlFor="password"
                                className="block mb-2 text-lg
                        font-medium text-gray-900"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                className={`${
                                    errors.password
                                        ? "border-red-500 bg-red-300"
                                        : ""
                                }text-sm rounded-lg block w-full p-2.5 bg-white border-2 border-gray-400 text-gray-900`}
                                id="password"
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                            />
                            {errors.password ? (
                                <p className="text-red-500 text-sm">
                                    {errors.password}
                                </p>
                            ) : null}
                        </div>

                        <button
                            onClick={(e) => handleSubmit(e)}
                            type="submit"
                            disabled={processing}
                            className={`text-white ${
                                processing
                                    ? "bg-green-700/35 cursor-not-allowed"
                                    : "bg-green-700"
                            }  font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center flex space-x-3 items-center justify-center`}
                        >
                            {!processing ? (
                                <p className="text-lg">Submit</p>
                            ) : (
                                <div role="status">
                                    <svg
                                        aria-hidden="true"
                                        className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                                        viewBox="0 0 100 101"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                            fill="currentColor"
                                        />
                                        <path
                                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                            fill="currentFill"
                                        />
                                    </svg>
                                    <span className="sr-only">.</span>
                                </div>
                            )}
                        </button>
                        <a
                            href="/auth/github/redirect"
                            type="button"
                            className="mt-4 w-full text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-2"
                        >
                            <div className="flex items-center justify-center">
                                {" "}
                                <svg
                                    className="w-4 h-4 me-2"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <p>Sign in with Github</p>
                            </div>
                        </a>
                        {errors.message ? (
                            <div className="bg-red-300 rounded-md p-3 mt-4">
                                <p className="text-red-500 font-bold">
                                    {errors.message}
                                </p>
                            </div>
                        ) : null}
                    </form>
                </div>
            </Layout>
        </div>
    );
};
export default Login;
