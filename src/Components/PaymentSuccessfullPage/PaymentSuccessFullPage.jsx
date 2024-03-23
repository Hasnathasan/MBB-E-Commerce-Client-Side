import { useParams } from "react-router-dom";
import checked from '../../assets/checked.png';

const PaymentSuccessFullPage = () => {
    const {id} = useParams();
    return (
        <div className="flex justify-center items-center w-full h-[500px] flex-col gap-5">
            <img className="w-16 h-16 md:w-32 md:h-32" src={checked} alt="" />
            <h2 className="md:text-4xl text-xl font-bold text-green-500">Thank you For Your Purchase!</h2>
            <h2 className="md:text-xl text-nowrap text-sm font-bold">Your Order Id: {id}</h2>
        </div>
    );
};

export default PaymentSuccessFullPage;