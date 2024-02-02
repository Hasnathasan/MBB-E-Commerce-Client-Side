import { CiLocationOn, CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import logo from '../../assets/logo.png';
import { GoHeart } from "react-icons/go";
import { HiOutlineShoppingBag } from "react-icons/hi2";
const NavigationBar = () => {
  return (
    <div className="max-w-[1400px] mx-auto">
      {/* Top Info - Company name + sign In / sign up button */}
      <div className="flex justify-between items-center bg-gray-900 px-8 text-gray-400 text-xs py-2">
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


        {/* Secondary Navbar - Logo + SearchBar + Cart */}
      <div className="flex px-8 py-2 justify-around border-b border-gray-200 items-center">
        <div>
            <img src={logo} alt="" />
        </div>
        <div className="">
            <form className="h-10 w-full relative flex justify-center items-center">
                <CiSearch className="absolute w-5 h-5 top-2.5 left-2.5"></CiSearch>
                <input className="h-full w-[350px] ps-10 border border-gray-200 text-sm rounded-l outline-none" type="text" placeholder="Search"/>
                <button className="bg-green-500 border text-white border-green-500 z-10 rounded-r text-sm px-3 h-full">Search</button>
            </form>
        </div>
        <div className="flex justify-center items-center gap-4">
            <GoHeart className="w-8 h-8" />
            <span>|</span>
            <div className="flex justify-center gap-2 items-center">
                <HiOutlineShoppingBag className="w-7 h-7"></HiOutlineShoppingBag>
                <div>
                    <h3 className="text-xs">Shopping Cart:</h3>
                    <h4 className="text-xs font-semibold">$ 57.00</h4>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
