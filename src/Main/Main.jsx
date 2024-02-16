import { Outlet, useLocation } from "react-router-dom";
import NavigationBar from "../Shared/NavigationBar/NavigationBar";
import Footer from "../Shared/Footer/Footer";
import { useContext, useEffect } from "react";
import { Drawer } from "@material-tailwind/react";
import { AuthContext } from "../Providers/AuthProvider";


const Main = () => {
    const location = useLocation();
    const {openCart, setOpenCart} = useContext(AuthContext);
    const closeCartDrawer = () => setOpenCart(false);
    useEffect(() => {
        window.scrollTo(0, 0);
      }, [location.pathname]);
    return (
        <><div>
            <NavigationBar></NavigationBar>
            <Outlet></Outlet>
            <Footer></Footer>
            {/* Side bar for Cart */}
      
        </div>
        <Drawer open={openCart}
         placement="right" onClose={closeCartDrawer} className="p-0 overflow-y-auto">

</Drawer>
        </>
        
    );
};

export default Main;