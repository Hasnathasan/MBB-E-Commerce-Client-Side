import { CiLocationOn, CiSearch } from "react-icons/ci";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import { GoHeart } from "react-icons/go";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import "./NavigationBar.css";
import { FiPhoneCall } from "react-icons/fi";
import { useEffect, useState } from "react";
import { Drawer } from "@material-tailwind/react";
const NavigationBar = () => {
    const [isFixed, setIsFixed] = useState(false);
    const [open, setOpen] = useState(false);
    const openDrawer = () => setOpen(true);
    const closeDrawer = () => setOpen(false);
    useEffect(() => {
      const handleScroll = () => {
        const scrollPosition = window.scrollY;
        setIsFixed(scrollPosition >= 150);
      };
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
  return (
    <div className="max-w-[1400px]  relative z-[1000] mx-auto">
      {/* <img
            className="w-5 h-5 md:w-6"
            onClick={openDrawer}
            src={logo}
            alt=""
          /> */}
      {/* Top Info - Company name + sign In / sign up button */}
      <div className="flex justify-between items-center bg-[#2e2e2e] px-8 mb-8 text-gray-400 text-xs py-2">
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
            <Link to={"/signin"} className="cursor-pointer">
              Sign In
            </Link>{" "}
            <span>/</span>{" "}
            <Link to={"signup"} className="cursor-pointer">
              Sign Up
            </Link>
          </div>
        </div>
      </div>

    {/* Main Navigation System - searchBar + Navigation links */}
        <div className={`w-full hidden md:block mx-auto navbar bg-[#fcfcfc] ${isFixed ? 'fixed1 transition-all duration-500' : ''}`}>


          {/* Secondary Navbar - Logo + SearchBar + Cart */}
          <div className="flex px-8 py-5 justify-between border-b border-gray-200 items-center">
            {/* <Link to={"/"}>
              <img src={logo} alt="" />
            </Link> */}
            
            <div className="">
              <form className="h-10 w-full relative flex justify-center items-center">
                <CiSearch className="absolute w-5 h-5 top-2.5 left-2.5"></CiSearch>
                <input
                  className="h-full md:w-[280px] lg:w-[350px] ps-10 border border-gray-200 text-sm rounded-l outline-none"
                  type="text"
                  placeholder="Search"
                />
                <button className="bg-green-500 border text-white border-green-500 rounded-r text-sm px-4 h-full">
                  Search
                </button>
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

          {/* Main Navigation bar - Navigation links */}
          <div className="flex justify-between items-center px-8 py-2.5">
            <div className="flex justify-center items-center gap-8 text-sm font-medium">
              <NavLink to={"/"}>Home</NavLink>
              <NavLink to={"/shop"}>Shop</NavLink>
              <NavLink to={"/pages"}>Pages</NavLink>
              <NavLink to={"/blog"}>Blog</NavLink>
              <NavLink to={"/aboutus"}>About Us</NavLink>
              <NavLink to={"/contact"}>Contact</NavLink>
            </div>
            <div className="flex justify-center items-center gap-2">
              <FiPhoneCall className="w-6 h-6"></FiPhoneCall>
              <h3 className="text-sm">(219) 555-0114</h3>
            </div>
          </div>
        </div>









            <div className="bg-white px-3 py-3">
            <div className="">
              <form className="h-8 w-full relative flex justify-center items-center">
                <CiSearch className="absolute w-4 h-4 top-2.5 left-1"></CiSearch>
                <input
                  className="h-full w-[40%] ps-2 border border-gray-200 text-sm rounded-l outline-none"
                  type="text"
                  placeholder="Search"
                />
                <button className="bg-green-500 border text-white border-green-500 rounded-r text-xs px-3 h-full">
                  Search
                </button>
              </form>
            </div>
            </div>







        {/* Side Navigation bar for Small Devices */}


        <Drawer open={open} onClose={closeDrawer} className="p-0 overflow-y-auto">
        {/* <Card className="h-screen w-full max-w-[20rem] rounded-none p-0 shadow-xl shadow-blue-gray-900/5">
          <div className="mb-2 bg-[#0397d3] text-white py-[10px] px-3 flex items-center justify-between gap-1">
            <div className="flex items-center gap-1">
              <FaHome className="w-5 h-4"></FaHome>
              <p className="text-xl">Home</p>
            </div>
            <RxCross2 onClick={closeDrawer} className="w-6 h-6"></RxCross2>
          </div>
          <List className="overflow-y-auto">
            <Accordion
              open={openAccordian === 3}
              icon={
                <FaAngleDown
                  className={`mx-auto h-4 w-4 transition-transform ${
                    openAccordian === 3 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem
                ripple={false}
                className="p-0"
                selected={openAccordian === 3}
              >
                <AccordionHeader
                  onClick={() => handleOpen(3)}
                  className="border-b-0 p-3"
                >
                  <ListItemPrefix>
                    <FaCalculator></FaCalculator>
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="mr-auto font-normal">
                    Electronics
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0">
                  <ListItem ripple={false}>
                    <Link
                      to={"/products/electronics"}
                      className=" flex items-center gap-1 w-full h-full"
                    >
                      <ListItemPrefix>
                        <img className="w-5 h-5" src={category10} alt="" />
                      </ListItemPrefix>
                      All Electronics Products
                    </Link>
                  </ListItem>
                  <ListItem ripple={false}>
                    <Link
                      to={"/products/refrigerators"}
                      className=" flex items-center gap-1 w-full h-full"
                    >
                      <ListItemPrefix>
                        <img className="w-5 h-5" src={refrigerator} alt="" />
                      </ListItemPrefix>
                      Refrigerators
                    </Link>
                  </ListItem>
                  <ListItem ripple={false}>
                    <Link
                      to={"/products/televisions"}
                      className=" flex items-center gap-1 w-full h-full"
                    >
                      <ListItemPrefix>
                        <img className="w-5 h-5" src={category9} alt="" />
                      </ListItemPrefix>
                      Televisions
                    </Link>
                  </ListItem>
                  <ListItem ripple={false}>
                    <Link
                      to={"/products/irons"}
                      className=" flex items-center gap-1 w-full h-full"
                    >
                      <ListItemPrefix>
                        <img className="w-5 h-5" src={iron} alt="" />
                      </ListItemPrefix>
                      Iron Machines
                    </Link>
                  </ListItem>
                  <ListItem ripple={false}>
                    <Link
                      to={"/products/kettles"}
                      className=" flex items-center gap-1 w-full h-full"
                    >
                      <ListItemPrefix>
                        <img className="w-5 h-5" src={kettle} alt="" />
                      </ListItemPrefix>
                      Kettles
                    </Link>
                  </ListItem>
                  <ListItem ripple={false}>
                    <Link
                      to={"/products/airCollers"}
                      className=" flex items-center gap-1 w-full h-full"
                    >
                      <ListItemPrefix>
                        <img className="w-5 h-5" src={AC} alt="" />
                      </ListItemPrefix>
                      Air Collers
                    </Link>
                  </ListItem>
                </List>
              </AccordionBody>
            </Accordion>
            <Accordion
              open={openAccordian === 4}
              icon={
                <FaCalculator
                  className={`mx-auto h-4 w-4 transition-transform ${
                    openAccordian === 4 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem
                ripple={false}
                className="p-0"
                selected={openAccordian === 4}
              >
                <AccordionHeader
                  onClick={() => handleOpen(4)}
                  className="border-b-0 p-3"
                >
                  <ListItemPrefix>
                    <FaCalculator></FaCalculator>
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="mr-auto font-normal">
                    Kids zone
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0">
                  <ListItem ripple={false}>
                    <ListItemPrefix>
                      <FaCalculator></FaCalculator>
                    </ListItemPrefix>
                    Orders
                  </ListItem>
                  <ListItem ripple={false}>
                    <ListItemPrefix>
                      <FaCalculator></FaCalculator>
                    </ListItemPrefix>
                    Products
                  </ListItem>
                </List>
              </AccordionBody>
            </Accordion>
            <Accordion
              open={openAccordian === 5}
              icon={
                <FaCalculator
                  className={`mx-auto h-4 w-4 transition-transform ${
                    openAccordian === 5 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem
                ripple={false}
                className="p-0"
                selected={openAccordian === 5}
              >
                <AccordionHeader
                  onClick={() => handleOpen(5)}
                  className="border-b-0 p-3"
                >
                  <ListItemPrefix>
                    <FaCalculator></FaCalculator>
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="mr-auto font-normal">
                    কিডস জোন
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0">
                  <ListItem ripple={false}>
                    <ListItemPrefix>
                      <FaCalculator></FaCalculator>
                    </ListItemPrefix>
                    Orders
                  </ListItem>
                  <ListItem ripple={false}>
                    <ListItemPrefix>
                      <FaCalculator></FaCalculator>
                    </ListItemPrefix>
                    Products
                  </ListItem>
                </List>
              </AccordionBody>
            </Accordion>
            <Accordion
              open={openAccordian === 6}
              icon={
                <FaCalculator
                  className={`mx-auto h-4 w-4 transition-transform ${
                    openAccordian === 6 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem
                ripple={false}
                className="p-0"
                selected={openAccordian === 6}
              >
                <AccordionHeader
                  onClick={() => handleOpen(6)}
                  className="border-b-0 p-3"
                >
                  <ListItemPrefix>
                    <FaCalculator></FaCalculator>
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="mr-auto font-normal">
                    প্রাতিষ্ঠানিক অর্ডার
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0">
                  <ListItem ripple={false}>
                    <ListItemPrefix>
                      <FaCalculator></FaCalculator>
                    </ListItemPrefix>
                    Orders
                  </ListItem>
                  <ListItem ripple={false}>
                    <ListItemPrefix>
                      <FaCalculator></FaCalculator>
                    </ListItemPrefix>
                    Products
                  </ListItem>
                </List>
              </AccordionBody>
            </Accordion>
            <Accordion
              open={openAccordian === 6}
              icon={
                <FaCalculator
                  className={`mx-auto h-4 w-4 transition-transform ${
                    openAccordian === 6 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem
                ripple={false}
                className="p-0"
                selected={openAccordian === 6}
              >
                <AccordionHeader
                  onClick={() => handleOpen(6)}
                  className="border-b-0 p-3"
                >
                  <ListItemPrefix>
                    <FaCalculator></FaCalculator>
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="mr-auto font-normal">
                    অফার সমূহ
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0">
                  <ListItem ripple={false}>
                    <ListItemPrefix>
                      <FaCalculator></FaCalculator>
                    </ListItemPrefix>
                    Orders
                  </ListItem>
                  <ListItem ripple={false}>
                    <ListItemPrefix>
                      <FaCalculator></FaCalculator>
                    </ListItemPrefix>
                    Products
                  </ListItem>
                </List>
              </AccordionBody>
            </Accordion>
            <Accordion
              open={openAccordian === 6}
              icon={
                <FaCalculator
                  className={`mx-auto h-4 w-4 transition-transform ${
                    openAccordian === 6 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem
                ripple={false}
                className="p-0"
                selected={openAccordian === 6}
              >
                <AccordionHeader
                  onClick={() => handleOpen(6)}
                  className="border-b-0 p-3"
                >
                  <ListItemPrefix>
                    <FaCalculator></FaCalculator>
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="mr-auto font-normal">
                    কুইজ
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0">
                  <ListItem ripple={false}>
                    <ListItemPrefix>
                      <FaCalculator></FaCalculator>
                    </ListItemPrefix>
                    Orders
                  </ListItem>
                  <ListItem ripple={false}>
                    <ListItemPrefix>
                      <FaCalculator></FaCalculator>
                    </ListItemPrefix>
                    Products
                  </ListItem>
                </List>
              </AccordionBody>
            </Accordion>
            <Accordion
              open={openAccordian === 6}
              icon={
                <FaCalculator
                  className={`mx-auto h-4 w-4 transition-transform ${
                    openAccordian === 6 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem
                ripple={false}
                className="p-0"
                selected={openAccordian === 6}
              >
                <AccordionHeader
                  onClick={() => handleOpen(6)}
                  className="border-b-0 p-3"
                >
                  <ListItemPrefix>
                    <FaCalculator></FaCalculator>
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="mr-auto font-normal">
                    ব্লগ
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0">
                  <ListItem ripple={false}>
                    <ListItemPrefix>
                      <FaCalculator></FaCalculator>
                    </ListItemPrefix>
                    Orders
                  </ListItem>
                  <ListItem ripple={false}>
                    <ListItemPrefix>
                      <FaCalculator></FaCalculator>
                    </ListItemPrefix>
                    Products
                  </ListItem>
                </List>
              </AccordionBody>
            </Accordion>
            <Accordion
              open={openAccordian === 6}
              icon={
                <FaCalculator
                  className={`mx-auto h-4 w-4 transition-transform ${
                    openAccordian === 6 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem
                ripple={false}
                className="p-0"
                selected={openAccordian === 6}
              >
                <AccordionHeader
                  onClick={() => handleOpen(6)}
                  className="border-b-0 p-3"
                >
                  <ListItemPrefix>
                    <FaCalculator></FaCalculator>
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="mr-auto font-normal">
                    গিফট ফাইন্ডার
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0">
                  <ListItem ripple={false}>
                    <ListItemPrefix>
                      <FaCalculator></FaCalculator>
                    </ListItemPrefix>
                    Orders
                  </ListItem>
                  <ListItem ripple={false}>
                    <ListItemPrefix>
                      <FaCalculator></FaCalculator>
                    </ListItemPrefix>
                    Products
                  </ListItem>
                </List>
              </AccordionBody>
            </Accordion>
          </List>
        </Card> */}
      </Drawer>
    </div>
  );
};

export default NavigationBar;
