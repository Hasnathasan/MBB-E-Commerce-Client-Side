import { Button } from "@nextui-org/react";
import errorImg from "../../assets/404.png";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="flex justify-center py-5 items-center flex-col gap-3 h-screen">
      <img className="w-[40%]" src={errorImg} alt="" />
      <h2 className="text-3xl font-bold">Oops! page not found</h2>
      <p className="text-sm font-medium text-gray-600">
        Ut consequat ac tortor eu vehicula. Aenean accumsan purus eros. Maecenas
        sagittis tortor at metus mollis
      </p>
      <Link to={"/"}>
        <Button className="text-white bg-green-500" radius="full">
          Back to Home
        </Button>
      </Link>
    </div>
  );
};

export default Error;
