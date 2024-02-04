import { useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import product1 from '../../../assets/products1.png';
import product2 from '../../../assets/products2.png';
import product3 from '../../../assets/products3.png';
import product4 from '../../../assets/products4.png';
import product5 from '../../../assets/products5.png';
import product6 from '../../../assets/products6.png';
import product7 from '../../../assets/products7.png';
import product8 from '../../../assets/products8.png';
import product9 from '../../../assets/products9.png';
import product10 from '../../../assets/products10.png';
import PopularProductsCard from "./PopularProductsCard";


const PopularProducts = () => {
    const [hovered, setHovered] = useState(false);
    const products = [
        {
            name: "Green Apple",
            price: 50.00,
            rating: 4.2,
            img: product1
        },
        {
            name: "Green Apple",
            price: 42.00,
            rating: 4.9,
            img: product2
        },
        {
            name: "Green Apple",
            price: 120.00,
            rating: 2.5,
            img: product3
        },
        {
            name: "Green Apple",
            price: 70.00,
            rating: 3.5,
            img: product4
        },
        {
            name: "Green Apple",
            price: 20.00,
            rating: 4.2,
            img: product5
        },
        {
            name: "Green Apple",
            price: 20.00,
            rating: 4.2,
            img: product5
        },
        {
            name: "Green Apple",
            price: 70.00,
            rating: 3.5,
            img: product4
        },
        {
            name: "Green Apple",
            price: 120.00,
            rating: 2.5,
            img: product10
        },
        {
            name: "Green Apple",
            price: 42.00,
            rating: 4.9,
            img: product2
        },
        {
            name: "Green Apple",
            price: 50.00,
            rating: 4.2,
            img: product1
        },{
            name: "Green Apple",
            price: 50.00,
            rating: 4.2,
            img: product6
        },
        {
            name: "Green Apple",
            price: 42.00,
            rating: 4.9,
            img: product7
        },
        {
            name: "Green Apple",
            price: 120.00,
            rating: 2.5,
            img: product8
        },
        {
            name: "Green Apple",
            price: 70.00,
            rating: 3.5,
            img: product9
        },
        {
            name: "Green Apple",
            price: 20.00,
            rating: 4.2,
            img: product10
        }
    ]
    return (
        <div className="my-20">
            <div className="flex justify-between mb-4 items-center">
                <h2 className="text-xl md:text-3xl font-semibold">Popular Categories</h2>
                <Link onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} className="w-32 text-left text-green-500 flex justify-center items-center gap-2 relative font-medium" to={"/products"}>View All <BsArrowRight className={`absolute transition-all duration-75 ${hovered ? "left-[105px]" : "left-[100px]"}`}></BsArrowRight></Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {
                products?.map(product => <PopularProductsCard key={product?.name} product={product}></PopularProductsCard>)
            }
            </div>
        </div>
    );
};

export default PopularProducts;