import { Outlet, useLocation } from "react-router-dom";
import NavigationBar from "../Shared/NavigationBar/NavigationBar";
import Footer from "../Shared/Footer/Footer";
import { useEffect } from "react";


const Main = () => {
    const location = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
      }, [location.pathname]);
    return (
        <div>
            <NavigationBar></NavigationBar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;