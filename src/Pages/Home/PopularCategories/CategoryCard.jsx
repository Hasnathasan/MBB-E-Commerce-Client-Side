const CategoryCard = ({ category }) => {
  return (
    <div className="w-[100%]   flex flex-col border-2 cursor-pointer border-gray-200 hover:border-[#3fb643] hover:text-green-600 transition-all duration-300 py-6 rounded-md justify-center items-center gap-2">
      <img className="w-[90%] h-[130px] mx-auto" src={category?.img} alt="" />
      <h3 className="font-medium md:text-lg">{category?.name}</h3>
    </div>
  );
};

export default CategoryCard;
