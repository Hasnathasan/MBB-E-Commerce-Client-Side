import { CiLocationOn } from "react-icons/ci";

const NavigationBar = () => {
  return (
    <div>
      {/* Top Info - Company name + sign In / sign up button */}
      <div className="flex justify-between items-center bg-gray-900 text-gray-400 text-xs py-1">
        <div className="flex justify-center items-center gap-1">
          <CiLocationOn />
          <h3>Store Location: Lincoln- 344, Illinois, Chicago, USA</h3>
        </div>
        <div>
            <div className="flex justify-center items-center">
                <h3>Sign In</h3> <span>/</span> <h3>Sign Up</h3>
            </div>
        </div>
      </div>



    </div>
  );
};

export default NavigationBar;
