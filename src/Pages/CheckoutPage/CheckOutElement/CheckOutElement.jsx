import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutFunctionality from "../CheckOutFunctionality/CheckOutFunctionality";

const stritePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const CheckOutElement = () => {
  return (
    <>
      <div className="mx-auto">
        <Elements stripe={stritePromise}>
          <CheckOutFunctionality></CheckOutFunctionality>
        </Elements>
      </div>
    </>
  );
};

export default CheckOutElement;
