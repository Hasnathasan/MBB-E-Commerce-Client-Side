

const CategoryCart = ({img, name}) => {
    return (
        <div className="w-[200px]">
            <img className="w-[90%] mx-auto" src={img} alt="" />
            <h3>{name}</h3>
        </div>
    );
};

export default CategoryCart;