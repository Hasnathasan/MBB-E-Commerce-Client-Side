import { Button } from "@material-tailwind/react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast, { Toaster } from "react-hot-toast";

const PaymentProcess = ({ userDetails }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [axiosSecure] = useAxiosSecure();
  const [error, setError] = useState("");

  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState();
  const [userCart, setUserCart] = useState([]);
  const { setIsProductAdded, user } = useContext(AuthContext);
  console.log(userDetails, userCart);
  useEffect(() => {
    // Try retrieving the cart from localStorage, with a default of an empty array if not found
    const cart = localStorage.getItem("cart") || "[]";

    // Parse the retrieved data (either an empty string or valid JSON string)
    try {
      setUserCart(JSON.parse(cart));
    } catch (error) {
      // Handle parsing error gracefully (e.g., log the error)
      console.error("Error parsing local storage cart:", error);
      // Set userCart to an empty array in case of parsing error
      setUserCart([]);
    }
  }, []);
  const subTotal = userCart?.reduce((accumulator, product) => {
    const price = product?.price;
    return (
      accumulator +
      (price.sale_price * product?.quantity ||
        price.regular_price * product?.quantity)
    ); // Use nullish coalescing for price2
  }, 0);
  console.log(userCart);

  useEffect(() => {
    if (subTotal > 0) {
      axiosSecure.post("/create-payment-intent", { subTotal }).then((res) => {
        setClientSecret(res.data.clientSecret);
      });
    }
  }, [axiosSecure, subTotal]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }
    console.log("card", card);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log(error);
      setError(error.message);
      return;
    } else if (paymentMethod) {
      setError("");
    }

    setProcessing(true);
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "unknown ",
            name: user?.displayName || "anonymous",
          },
        },
      });
    if (confirmError) {
      console.log(confirmError.message);
      setError(confirmError.message);
    }
    setProcessing(false);
    if (paymentIntent.status === "succeeded") {
      const transactionId = paymentIntent.id;
      console.log(transactionId);
      const paymentSuccessToast = () =>
        toast.success(`Payment successfully completed`);
      paymentSuccessToast();
      setTransactionId(transactionId);
    }
  };
  return (
    <>
      <div className="mb-20">
        {error ? <p className="text-red-400">{error}</p> : ""}
      </div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <Button
          type="submit"
          className="mt-5"
          color="blue"
          disabled={!stripe || !clientSecret || processing}
        >
          Pay
        </Button>
      </form>
      <Toaster />
    </>
  );
};

export default PaymentProcess;
