import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentProcess from "./PaymentProcess";

const stritePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const PaymentCard = () => {
  return (
    <>
        <div className="w-[95%] md:w-[60%]">
          <h2 className="text-2xl mb-4">Teka teka tmi uira uira aso</h2>
          <Elements stripe={stritePromise}>
            <PaymentProcess></PaymentProcess>
          </Elements>
        </div>
    </>
  );
};

export default PaymentCard;
