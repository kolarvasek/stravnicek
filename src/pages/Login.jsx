import React, { useRef, useState } from "react";

const Login = () => {
  const passwordRef = useRef();
  const [passwordSave, setPasswordSave] = useState("");
  const emailRef = useRef();
  const [emailSave, setEmailSave] = useState("");

  const updateInput = () => {
    setPasswordSave(passwordRef.current.value);
    setEmailSave(emailRef.current.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { email: emailSave, password: passwordSave };
    console.log(data);

    try {
      const response = await fetch(
        "http://localhost/stravnicek/php/logincheck.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data), // Convert value to JSON
        }
      );

      const text = await response.text();
      console.log("Raw response:", text);

      // Parse response only if it's valid JSON
      let parsedResponse;
      try {
        parsedResponse = JSON.parse(text);
        console.log(parsedResponse);
      } catch (error) {
        console.error("Error parsing JSON response:", text);
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <>
      <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 background-color bg-black">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
            Log in to your account
          </h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  ref={emailRef}
                  onChange={updateInput}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  ref={passwordRef}
                  onChange={updateInput}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
