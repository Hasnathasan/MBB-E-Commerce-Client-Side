import { useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";

const PopularProducts = () => {
    const [hovered, setHovered] = useState(false);
    return (
        <div className="my-20">
            <div className="flex justify-between mb-4 items-center">
                <h2 className="text-3xl font-semibold">Popular Categories</h2>
                <Link onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} className="w-32 text-left text-green-500 flex justify-center items-center gap-2 relative font-medium" to={"/products"}>View All <BsArrowRight className={`absolute transition-all duration-75 ${hovered ? "left-[105px]" : "left-[100px]"}`}></BsArrowRight></Link>
            </div>
        </div>
    );
};

export default PopularProducts;