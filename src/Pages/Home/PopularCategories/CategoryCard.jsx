

const CategoryCard = ({img, name}) => {
    return (
        <div className="w-[200px] flex flex-col border-2 cursor-pointer border-gray-200 hover:border-[#3fb643] hover:text-green-600 transition-all duration-300 py-6 rounded-md justify-center items-center gap-2">
            <img className="w-[90%] mx-auto" src={img} alt="" />
            <h3 className="font-medium text-lg">{name}</h3>
        </div>
    );
};

export default CategoryCard;