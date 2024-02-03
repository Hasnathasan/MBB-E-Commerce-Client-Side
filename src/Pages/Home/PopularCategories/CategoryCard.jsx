

const CategoryCard = ({img, name}) => {
    return (
        <div className="w-[200px] flex flex-col border cursor-pointer border-gray-200 hover:border-[#359138] hover:text-green-600 transition-all duration-250 py-6 rounded-md justify-center items-center gap-2">
            <img className="w-[90%] mx-auto" src={img} alt="" />
            <h3 className="font-medium text-lg">{name}</h3>
        </div>
    );
};

export default CategoryCard;