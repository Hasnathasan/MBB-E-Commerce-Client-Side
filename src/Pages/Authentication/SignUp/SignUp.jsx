import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { IoEyeOffSharp, IoEyeOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider";
import Swal from "sweetalert2";

const SignUp = () => {
  const { signUpWithEmail } = useContext(AuthContext);
  const { register, handleSubmit, reset } = useForm();
  const [passhide, setPasshide] = useState(true);
  const [passhide2, setPasshide2] = useState(true);
  const navigate = useNavigate();
  const onSubmit = (data) => {
    const { email, password, confirmPass } = data;
    if (password !== confirmPass) {
      return Swal.fire("Password didn't match", "Try again", "error");
    }
    signUpWithEmail(email, password)
      .then((result) => {
        console.log(result.user);
        reset();
        Swal.fire(
          "Sign Up Successfull Successfull",
          "User has logged in successfully",
          "success"
        );
        navigate("/");
        // navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error.message);
        // setErrorMessage(error.message);
      });
  };
  return (
    <div className="flex justify-center min-h-[500px] items-center">
      <div
        style={{ boxShadow: "0px 0px 50px -15px #cccccc" }}
        className="w-[95%] md:w-[450px] p-6 md:p-8 bg-white rounded-2xl"
      >
        <h2 className="text-2xl mb-6 font-bold text-gray-800 text-center">
          Create Account
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-3 md:space-y-4"
          action="#"
        >
          {/* <h3 className="text-base text-red-600">{error}</h3> */}
          <input
            {...register("email", { required: true })}
            type="email"
            name="email"
            id="email"
            className=" border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block w-full p-2.5 "
            placeholder="Email"
            required
          />
          <div className="relative">
            <input
              {...register("password", { required: true })}
              type={passhide ? "password" : "text"}
              name="password"
              id="password"
              placeholder="Password"
              className=" border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block w-full p-2.5 "
              required
            />
            <span className="absolute right-4 top-3">
              {passhide ? (
                <IoEyeOutline
                  className="cursor-pointer"
                  onClick={() => setPasshide(!passhide)}
                />
              ) : (
                <IoEyeOffSharp
                  className="cursor-pointer"
                  onClick={() => setPasshide(!passhide)}
                />
              )}
            </span>
          </div>
          <div className="relative">
            <input
              {...register("confirmPass", { required: true })}
              type={passhide2 ? "password" : "text"}
              name="confirmPass"
              id="confirmPass"
              placeholder="Confirm Password"
              className=" border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block w-full p-2.5 "
              required
            />
            <span className="absolute right-4 top-3">
              {passhide2 ? (
                <IoEyeOutline
                  className="cursor-pointer"
                  onClick={() => setPasshide2(!passhide2)}
                />
              ) : (
                <IoEyeOffSharp
                  className="cursor-pointer"
                  onClick={() => setPasshide2(!passhide2)}
                />
              )}
            </span>
          </div>

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
            <div className="ml-3 text-xs">
              <label htmlFor="remember" className="text-gray-600 ">
                Accept all terms & Conditions
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full text-white bg-green-500 hover:bg-green-600 focus:outline-none font-medium rounded-3xl text-sm px-5 py-2.5 text-center "
          >
            Create Account
          </button>
          <p className="text-sm font-light flex justify-center items-center gap-1 text-gray-600 ">
            Already have account?{" "}
            <Link
              to="/signin"
              className="font-medium text-gray-700 hover:underline "
            >
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
