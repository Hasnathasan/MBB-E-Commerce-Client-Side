import { CiLocationOn } from "react-icons/ci";
import { Link } from "react-router-dom";

const NavigationBar = () => {
  return (
    <div>
      {/* Top Info - Company name + sign In / sign up button */}
      <div className="flex justify-between items-center bg-gray-900 px-8 text-gray-400 text-xs py-1">
        <div className="flex justify-center items-center gap-1">
          <CiLocationOn />
          <h3>Store Location: Lincoln- 344, Illinois, Chicago, USA</h3>
        </div>
        <div className="flex gap-3">
          <div className="flex justify-center items-center gap-2">
            <h3>English</h3>
            <h3>USD</h3>
          </div>
          <span>|</span>
          <div className="flex justify-center gap-2 items-center">
            <Link to={"/signin"} className="cursor-pointer">Sign In</Link> <span>/</span> <Link to={"signup"} className="cursor-pointer">Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
