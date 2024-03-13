import { Button } from "@nextui-org/react";

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

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
    const order = {userDetails, products: userCart, status: "pending", createdAt: new Date(), total_price: subTotal};
    const orderProductsId = userCart?.map(product => {
      return {"product_id": product?.product_id, quantity: product?.quantity}
    });
    console.log(orderProductsId);
    axios.post("https://mbb-e-commerce-server.vercel.app/orders", order)
    .then(async(result) => {
      console.log(result);
      if(result.data.insertedId){
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
      axios.post(`https://mbb-e-commerce-server.vercel.app/ordersUpdate/${result?.data?.insertedId}?transactionId=${transactionId}`, orderProductsId)
      .then(result => {
        console.log(result);
        const paymentSuccessToast = () =>
        toast.success(`Payment successfully completed`);
      paymentSuccessToast();
      setTransactionId(transactionId);
      localStorage.removeItem("cart")
      setIsProductAdded(prevCount => prevCount + 1);
      })
      .catch(error => {
        return toast.error(error.message)
      })
      console.log(order);
      
    }
    else{
      axios.delete(`https://mbb-e-commerce-server.vercel.app/orders/${result?.data?.insertedId}`)
      .then(result => console.log(result))
      .catch(error => console.log(error))
    }
      }
    })
    .catch(error => {
      return toast.error(error.message)
    })
    
  };
  return (
    <>
      <div className="mb-20">
        {error ? <p className="text-red-400">{error}</p> : ""}
        {userCart.length == 0 ? <p className="text-red-400">No Product available in your cart</p> : ""}
      </div>
      <div>
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
        onClick={handleSubmit}
              type="submit"
              color="success"
              radius="full"
              size="lg"
              className="text-white mb-2 bg-green-500 w-full"
          disabled={!stripe || !clientSecret || processing}
            >
              Place Order
            </Button>
      </div>
      <Toaster />
    </>
  );
};

export default PaymentProcess;
