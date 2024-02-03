import banner from '../../../assets/Bannar.png'
import PopularCategories from '../PopularCategories/PopularCategories';
import PopularProducts from '../PopularProducts/PopularProducts';

const Home = () => {
    return (
        <div className=" mx-8 min-h-[1600px]">
            <div className='w-full mx-auto mt-4 h-[500px] mb-10'>
                <img className='w-full h-full' src={banner} alt="" />
            </div>
            <PopularCategories></PopularCategories>
            <PopularProducts></PopularProducts>
        </div>
    );
};

export default Home;