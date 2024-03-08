import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentProcess from "./PaymentProcess";

const stritePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const PaymentCard = ({userDetails}) => {
  return (
    <>
        <div className="w-[95%] mx-auto">
          <Elements stripe={stritePromise}>
            <PaymentProcess userDetails={userDetails}></PaymentProcess>
          </Elements>
        </div>
    </>
  );
};

export default PaymentCard;
