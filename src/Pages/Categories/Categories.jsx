
import usePopularCategories from "../../Hooks/usePopularCategories";
import CategoryCard from "../Home/PopularCategories/CategoryCard";


const Categories = () => {
    const [categories, isCategoriesLoading] = usePopularCategories();
    if(isCategoriesLoading){
        return <h1>Loading</h1>
    }
    console.log(categories);
    return (
        <div className="mx-8 py-9">
            <div className="flex justify-between items-center mb-5">
            <h1 className="text-2xl font-semibold">All Categories</h1>
            <h1 className="text-sm text-gray-800  font-semibold">Total {categories?.length} Categories found</h1>
            </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 md:gap-5 justify-center items-center">
        {categories?.map((category) => (
          <CategoryCard key={category.category} totalProduct={true} category={category}></CategoryCard>
        ))}
      </div>
        </div>
    );
};

export default Categories;