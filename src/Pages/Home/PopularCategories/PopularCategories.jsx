import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";

const PopularCategories = () => {
    return (
        <div>
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-semibold">Popular Categories</h2>
                <Link className="underline text-green-500 flex justify-center items-center gap-2 font-medium" to={"/categories"}>See All <BsArrowRight></BsArrowRight></Link>
            </div>
        </div>
    );
};

export default PopularCategories;