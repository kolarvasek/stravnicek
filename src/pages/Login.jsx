import { useEffect, useRef, useState } from "react";




export default function Login() {

    const passwordRef = useRef()
    const [passwordSave, setPasswordSave] = useState("")
    const emailRef = useRef()
    const [emailSave, setEmailSave] = useState("")

    const updateInput = () => {
        setPasswordSave(passwordRef.current.value);
        console.log(passwordSave);
        setEmailSave(emailRef.current.value);
        console.log(emailSave);

    }

    return (
        <>
            <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 background-color bg-black">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
                        Log in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form action="#" method="POST" className="space-y-6">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm/6 font-medium text-white"
                            >
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    ref={emailRef}
                                    onChange={() => updateInput()}
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="block text-sm/6 font-medium text-white"
                                >
                                    Password
                                </label>
                                <div className="text-sm">
                                    <a href="/register" className="font-semibold text-white hover:text-white">
                                        Not Registered?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    ref={passwordRef}
                                    onChange={() => updateInput()}
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    autoComplete="current-password"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-white px-3 py-1.5 text-sm/6 font-semibold text-black shadow-sm border border-transparent hover:border-white hover:text-white hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Log in
                            </button>

                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
