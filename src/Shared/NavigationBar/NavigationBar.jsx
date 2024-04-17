import { CiLocationOn, CiSearch } from "react-icons/ci";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import hamburger from "../../assets/hamburger.png";
import { GoHeart } from "react-icons/go";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import "./NavigationBar.css";
import { FiPhoneCall } from "react-icons/fi";
import { useContext, useEffect, useState } from "react";
import { Drawer } from "@material-tailwind/react";
import { Button } from "@nextui-org/react";
import { RxCross2 } from "react-icons/rx";
import { AuthContext } from "../../Providers/AuthProvider";
import useSystemInfo from "../../Hooks/useSystemInfo";
// import useUser from "../../Hooks/useUser";
const NavigationBar = () => {
  const {
    setSearchQuery,
    setCategoryFilter,
    setPriceSlider,
    setMinRating,
    user,
    isProductAdded,
    setIsProductAdded,
    openCart,
    setOpenCart,
  } = useContext(AuthContext);
  const [isFixed, setIsFixed] = useState(false);
  const [open, setOpen] = useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  const openCartDrawer = () => setOpenCart(true);
  const closeCartDrawer = () => setOpenCart(false);
  const [userCart, setUserCart] = useState([]);
  const [systemInfo, isSystemInfo, refetch] = useSystemInfo();
  useEffect(() => {
    // Try retrieving the cart from localStorage, with a default of an empty array if not found
    const cart = localStorage.getItem("cart") || "[]";

    // Parse the retrieved data (either an empty string or valid JSON string)
    try {
      setUserCart(JSON.parse(cart));
    } catch (error) {
      // Handle parsing error gracefully (e.g., log the error)
      console.error("Error parsing local storage cart:", error);
      // Set userCart to an empty array in case of parsing error
      setUserCart([]);
    }
  }, [isProductAdded]);
  const subTotal = userCart?.reduce((accumulator, product) => {
    const price = product?.price;
    return (
      accumulator +
      (price.sale_price * product?.quantity ||
        price.regular_price * product?.quantity)
    ); // Use nullish coalescing for price2
  }, 0);
  // const [userData, isUserDataLoading] = useUser();
  const navigate = useNavigate();
  const handleDeleteFromCart = (id) => {
    setUserCart((prevCart) => {
      const updatedCart = prevCart.filter(
        (product) => product.product_id !== id
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setIsProductAdded((prevCount) => prevCount + 1);
      return updatedCart;
    });
  };
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsFixed(scrollPosition >= 150);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  // const {email, userName, userPhoneNumber, userPhoto, billingInfo} = userData;
  // const handleSiteAdminRequest = () => {
  //   // const siteAdminData = {email, userName, userPhoneNumber, userPhoto, }
  // }

  const handleSearch = (e) => {
    e.preventDefault();
    const searchQuery = e.target.searchQuery.value;
    setCategoryFilter(null);
    setMinRating(null);
    setPriceSlider([0, 1000]);
    setSearchQuery(searchQuery);

    navigate("/shop/filter");
  };
  return (
    <div className="w-full relative z-[50] mx-auto">
      {/* Top Info - Company name + sign In / sign up button */}
      <div className="flex justify-end items-center bg-[#2e2e2e] px-1 md:px-4 lg:px-8 md:mb-8 text-gray-400 text-[8px] md:text-[12px] py-2">
        {/* <div className="flex justify-center items-center gap-1">
          <CiLocationOn />
          <h3>Store Location: Lincoln- 344, Illinois, Chicago, USA</h3>
        </div> */}
        <div className="flex gap-3">
          {/* <div className="flex justify-center items-center gap-2">
            <h3>English</h3>
            <h3>USD</h3>
          </div>
          <span>|</span> */}
          {!user ? (
            <div className="flex justify-center gap-2 items-center">
              <Link to={"/signin"} className="cursor-pointer">
                Sign In
              </Link>{" "}
              <span>/</span>{" "}
              <Link to={"signup"} className="cursor-pointer">
                Sign Up
              </Link>
            </div>
          ) : (
            <Link to={"/userDashboard/profile"}>Dashboard</Link>
          )}
        </div>
      </div>
      {/* isFixed ? "fixed1 transition-all duration-500" : "" */}
      {/* Main Navigation System - searchBar + Navigation links */}
      <div
        className={`w-full hidden md:block mx-auto py-0 navbar bg-[#fcfcfc] 
        `}
      >
        {/* Secondary Navbar - Logo + SearchBar + Cart */}
        <div className="flex md:px-4 lg:px-8 py-2 justify-between border-b border-gray-200 items-center">
          <Link to={"/"}>
            <img className="w-64 h-20" src={systemInfo?.[0]?.logo} alt="" />
          </Link>

          <div className="">
            <form
              onSubmit={handleSearch}
              className="h-10 w-full relative flex justify-center items-center"
            >
              <CiSearch className="absolute w-5 h-5 top-2.5 left-2.5"></CiSearch>
              <input
                name="searchQuery"
                id="searchQuery"
                className="h-full md:w-[240px] lg:w-[350px] ps-10 border border-gray-200 text-sm rounded-l outline-none"
                type="text"
                placeholder="Search"
              />
              <button className="bg-green-500 border text-white border-green-500 rounded-r text-sm px-4 h-full">
                Search
              </button>
            </form>
          </div>
          <div className="flex justify-center items-center gap-4">
            <Link to={"/userDashboard/wishList"}>
              <GoHeart className="w-8 h-8" />
            </Link>
            <span>|</span>
            <div
              onClick={openCartDrawer}
              className="flex cursor-pointer justify-center gap-2 items-center"
            >
              <HiOutlineShoppingBag className="w-7 h-7"></HiOutlineShoppingBag>
              <div>
                <h3 className="text-xs">Shopping Cart:</h3>
                <h4 className="text-xs font-semibold">$ {subTotal}</h4>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation bar - Navigation links */}
        <div className="flex justify-between items-center px-8 py-2">
          <div className="flex justify-center items-center gap-8 text-sm font-medium">
            <NavLink to={"/"}>Home</NavLink>
            <NavLink to={"/artists"}>Artists</NavLink>
            <NavLink to={"/categories"}>Categories</NavLink>
            <NavLink to={"/shop/filter"}>Products</NavLink>
            <NavLink to={"/about-us"}>About Us</NavLink>
            <NavLink to={"/contact-us"}>Contact Us</NavLink>
          </div>
          <div>
            <a
              className="flex justify-center items-center gap-2"
              href={`tel:${systemInfo?.[0]?.phone_number}`}
            >
              <FiPhoneCall className="w-6 h-6"></FiPhoneCall>{" "}
              {systemInfo?.[0]?.phone_number}
            </a>
          </div>
        </div>
      </div>

      {/* Search Bar and other links for Small Devices */}
      <div className="bg-white md:hidden w-full justify-between flex items-center px-3 py-3">
        <img
          className="w-5 h-5 md:w-6"
          onClick={openDrawer}
          src={hamburger}
          alt=""
        />
        <form
          onSubmit={handleSearch}
          className="h-8 relative flex justify-center  items-center"
        >
          <CiSearch className="absolute w-4 h-4 top-2 left-1"></CiSearch>
          <input
            id="searchQuery"
            name="searchQuery"
            className="h-full w-[150px] sm:w-[250px] ps-7 border border-gray-200 text-sm rounded-l outline-none"
            type="text"
            placeholder="Search"
          />
          <button
            type="submit"
            className="bg-green-500 border text-white border-green-500 rounded-r text-xs px-3 h-full"
          >
            Search
          </button>
        </form>
        <div className="flex justify-center items-center gap-3">
          <Link to={"/userDashboard/wishList"}>
            <GoHeart className="w-5 h-5"></GoHeart>
          </Link>
          <span>|</span>
          <HiOutlineShoppingBag
            onClick={openCartDrawer}
            className="w-5 h-5"
          ></HiOutlineShoppingBag>
        </div>
      </div>

      {/* Side Navigation bar for Small Devices */}

      <Drawer open={open} onClose={closeDrawer} className="p-0 overflow-y-auto">
        <div className="flex justify-center flex-col text-xl items-center gap-8 mt-8  font-semibold">
          <NavLink onClick={closeDrawer} to={"/"}>
            Home
          </NavLink>
          <NavLink onClick={closeDrawer} to={"/artists"}>
            Artists
          </NavLink>
          <NavLink onClick={closeDrawer} to={"/categories"}>
            Categories
          </NavLink>
          <NavLink onClick={closeDrawer} to={"/shop/filter"}>
            Products
          </NavLink>
          <NavLink onClick={closeDrawer} to={"/about-us"}>
            About Us
          </NavLink>
          <NavLink onClick={closeDrawer} to={"/contact-us"}>
            Contact Us
          </NavLink>
        </div>
      </Drawer>

      {/* Side bar for Cart */}
      <Drawer
        open={openCart}
        overlay={false}
        size={380}
        placement="right"
        onClose={closeCartDrawer}
        className="px-8 py-10 h-full flex flex-col shadow-large overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-semibold">
            Shoping Cart ({userCart?.length})
          </h2>
          <Button
            onClick={closeCartDrawer}
            size="sm"
            className="p-0 bg-white"
            variant="flat"
            isIconOnly
          >
            <RxCross2 className="w-8 h-8"></RxCross2>
          </Button>
        </div>
        <div className="flex flex-1 flex-col overflow-y-auto my-4 gap-4">
          {userCart?.map((product) => (
            <div key={product?.product_id}>
              <div className="flex items-center gap-2">
                <img
                  className="w-20 h-20"
                  src={product?.featured_photo}
                  alt=""
                />
                <div className="flex flex-1 items-center justify-between">
                  <div>
                    <h5 className="text-sm font-medium">
                      {product?.product_name}
                    </h5>
                    <h6 className="text-sm text-gray-600">
                      (1 * {product?.quantity}) products
                    </h6>
                  </div>
                  <Button
                    onClick={() => handleDeleteFromCart(product?.product_id)}
                    size="sm"
                    className="p-0"
                    radius="full"
                    variant="bordered"
                    isIconOnly
                  >
                    <RxCross2></RxCross2>
                  </Button>{" "}
                </div>
              </div>
              <span className=" border-t-2 border-gray-500"></span>
            </div>
          ))}
        </div>
        <div className="mt-auto">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">
              {userCart?.length} Product
            </span>
            <span className="text-sm font-semibold">${subTotal}</span>
          </div>
          <div className="space-y-2">
            <Link to={"/checkout"}>
              <Button
                color="success"
                radius="full"
                className="text-white mb-2 bg-green-600 w-full"
              >
                Checkout
              </Button>
            </Link>
            <Link to={"/mycart"}>
              <Button
                color="success"
                variant="flat"
                radius="full"
                className="text-green-500 font-semibold w-full"
              >
                Go To Cart
              </Button>{" "}
            </Link>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default NavigationBar;
