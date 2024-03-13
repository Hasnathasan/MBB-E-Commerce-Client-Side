import { BounceLoader } from "react-spinners";


const Loader = () => {
    return (
        <div className="w-full flex justify-center items-center h-screen">
            <BounceLoader
  color="#00ad26"
  size={100}
  speedMultiplier={1.6}
/>
        </div>
    );
};

export default Loader;