import { Outlet, useLocation } from "react-router-dom";
import NavigationBar from "../Shared/NavigationBar/NavigationBar";
import Footer from "../Shared/Footer/Footer";
import { useContext, useEffect } from "react";
import { AuthContext } from "../Providers/AuthProvider";


const Main = () => {
    const location = useLocation();
    const { setCategoryFilter, setPriceSlider, setMinRating, setSort, setSearchQuery, setSelectedTag} = useContext(AuthContext);
    useEffect(() => {
        window.scrollTo(0, 0);
        if(!location.pathname?.includes("/shop/filter")){
            setCategoryFilter(null);
            setPriceSlider([0,1000])
            setMinRating(null)
            setSort(null)
            setSearchQuery(null)
            setSelectedTag(null)
        }
      }, [location.pathname, setCategoryFilter, setMinRating, setPriceSlider, setSearchQuery, setSelectedTag, setSort]);
    return (
        <div>
            <NavigationBar></NavigationBar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;