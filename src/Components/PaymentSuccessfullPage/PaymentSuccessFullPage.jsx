import { useParams } from "react-router-dom";
import checked from '../../assets/checked.png';

const PaymentSuccessFullPage = () => {
    const {id} = useParams();
    return (
        <div className="flex justify-center items-center w-full h-[500px] flex-col gap-5">
            <img className=" w-32 h-32" src={checked} alt="" />
            <h2 className="text-4xl font-bold text-green-500">Thank you For Your Purchase!</h2>
            <h2 className="text-xl font-bold">Your Order Id: {id}</h2>
        </div>
    );
};

export default PaymentSuccessFullPage;