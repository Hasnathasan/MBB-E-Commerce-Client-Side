import { useState } from "react";
import { Link } from "react-router-dom";
import { IoEyeOffSharp, IoEyeOutline } from "react-icons/io5";
const SignIn = () => {
    const [passhide, setPasshide] = useState(true);
    return (
        <div className="flex justify-center min-h-[600px] items-center">
            <div className="w-[450px] shadow-sm p-8 bg-white rounded-2xl">
                <h2 className="text-2xl mb-6 font-bold text-gray-800 text-center">Sign In</h2>
                <form
            //   onSubmit={handleLogin}
              className="space-y-3 md:space-y-4"
              action="#"
            >
              {/* <h3 className="text-base text-red-600">{error}</h3> */}
                <input
                  type="email"
                  name="email"
                  id="email"
                  className=" border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-green-500 block w-full p-2.5 "
                  placeholder="Email"
                  required
                />
                <div className="relative">
                    <input
                  type={passhide ? "password" : "text"}
                  name="password"
                  id="password"
                  placeholder="Password"
                  className=" border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-green-500 block w-full p-2.5 "
                  required
                />
                <span className="absolute right-4 top-3">
                    {passhide ? (
                      <IoEyeOutline className="cursor-pointer" onClick={() => setPasshide(!passhide)} />
                    ) : (
                      <IoEyeOffSharp className="cursor-pointer" onClick={() => setPasshide(!passhide)} />
                    )}
                  </span>
                </div>
                
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary1 "
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-600 ">
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:underline "
                >
                  Forget password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                Sign in
              </button>
              <p className="text-sm font-light flex justify-center items-center gap-1 text-gray-600 ">
                Don&apos;t have account?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-gray-700 hover:underline "
                >
                  Register
                </Link>
              </p>
            </form>
            </div>
        </div>
    );
};

export default SignIn;