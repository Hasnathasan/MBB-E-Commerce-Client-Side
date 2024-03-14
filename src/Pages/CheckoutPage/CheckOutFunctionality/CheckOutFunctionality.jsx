import { Button, Radio, RadioGroup } from "@nextui-org/react";
import useUser from "../../../Hooks/useUser";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const CheckOutFunctionality = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [axiosSecure] = useAxiosSecure();
  const [error, setError] = useState("");

  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState();
  const { setIsProductAdded, user } = useContext(AuthContext);
  const [userData] = useUser();
  const [userCart, setUserCart] = useState([]);
  const { isProductAdded } = useContext(AuthContext);
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
  }, [isProductAdded]);
  const subTotal = userCart?.reduce((accumulator, product) => {
    const price = product?.price;
    return (
      accumulator +
      (price.sale_price * product?.quantity ||
        price.regular_price * product?.quantity)
    ); // Use nullish coalescing for price2
  }, 0);
  console.log(subTotal, userCart.length);
  useEffect(() => {
    if (subTotal > 0) {
      axiosSecure.post("/create-payment-intent", { subTotal }).then((res) => {
        setClientSecret(res.data.clientSecret);
      });
    }
  }, [axiosSecure, subTotal]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const userName = form.userName.value;
    const companyName = form.companyName.value;
    const country = form.country.value;
    const states = form.states.value;
    const address = form.address.value;
    const zipCode = form.zipCode.value;
    const userPhoneNumber = form.phoneNumber.value;
    const additional_info = form.additional_info.value;
    const data = {
      email,
      additional_info,
      userName,
      companyName,
      country,
      address,
      states,
      zipCode,
      userPhoneNumber,
    };

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
    const order = {
      userDetails: data,
      products: userCart,
      status: "pending",
      createdAt: new Date(),
      total_price: subTotal,
    };
    const orderProductsId = userCart?.map((product) => {
      return { product_id: product?.product_id, quantity: product?.quantity };
    });
    console.log(orderProductsId);
    axios
      .post("https://mbb-e-commerce-server.vercel.app/orders", order)
      .then(async (result) => {
        console.log(result);
        if (result.data.insertedId) {
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
            axios
              .delete(
                `https://mbb-e-commerce-server.vercel.app/orders/${result?.data?.insertedId}`
              )
              .then((result) => console.log(result))
              .catch((error) => console.log(error));
            console.log(confirmError.message);
            setError(confirmError.message);
          }
          setProcessing(false);
          if (paymentIntent.status === "succeeded") {
            const transactionId = paymentIntent.id;
            axios
              .post(
                `https://mbb-e-commerce-server.vercel.app/ordersUpdate/${result?.data?.insertedId}?transactionId=${transactionId}`,
                orderProductsId
              )
              .then((result) => {
                console.log(result);
                const paymentSuccessToast = () =>
                  toast.success(`Payment successfully completed`);
                paymentSuccessToast();
                setTransactionId(transactionId);
                localStorage.removeItem("cart");
                setIsProductAdded((prevCount) => prevCount + 1);
              })
              .catch((error) => {
                return toast.error(error.message);
              });
            console.log(order);
          }
        }
      })
      .catch((error) => {
        return toast.error(error.message);
      });
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-12 items-start py-10 mx-8 gap-6"
      >
        <div className="col-span-8">
          <div className={`border-b border-gray-300 pb-5`}>
            <h4 className="mb-5 text-2xl font-semibold">Billing Information</h4>
            <div className="">
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label htmlFor="userName">Your Name</label>
                  <input
                    type="text"
                    name="userName"
                    id="userName"
                    className=" border w-full border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block p-2.5 "
                    placeholder="Name"
                    defaultValue={userData?.userName}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="companyName">
                    Company Name{" "}
                    <span className=" text-gray-700">(optional)</span>
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    id="companyName"
                    className=" border w-full border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block p-2.5 "
                    placeholder="companyName"
                    defaultValue={userData?.billingInfo?.companyName}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="address">Street Address</label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  className=" border w-full border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block p-2.5 "
                  placeholder="Street Address"
                  defaultValue={userData?.billingInfo?.address}
                  required
                />
              </div>
              <div className="grid grid-cols-3 gap-5">
                <div>
                  <label htmlFor="country">Country / Region</label>
                  <input
                    type="text"
                    name="country"
                    id="country"
                    className=" border w-full border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block p-2.5 "
                    placeholder="Country"
                    defaultValue={userData?.billingInfo?.country}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="states">States</label>
                  <input
                    type="text"
                    name="states"
                    id="states"
                    className=" border w-full border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block p-2.5 "
                    placeholder="States Name"
                    defaultValue={userData?.billingInfo?.states}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="zipCode">Zip Code</label>
                  <input
                    type="number"
                    name="zipCode"
                    id="zipCode"
                    className=" border w-full border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block p-2.5 "
                    placeholder="Zip Code"
                    defaultValue={userData?.billingInfo?.zipCode}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className=" border w-full border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block p-2.5 "
                    placeholder="Email Address"
                    defaultValue={userData?.email}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    id="phoneNumber"
                    className=" border w-full border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block p-2.5 "
                    placeholder="Phone Number"
                    defaultValue={userData?.userPhoneNumber}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <h4 className="mb-4 text-2xl font-semibold">Additional Info</h4>
            <div>
              <label htmlFor="additional_info">Order notes (optional)</label>
              <textarea
                type="text"
                name="additional_info"
                id="additional_info"
                className=" border w-full border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block p-2.5 "
                placeholder="Notes about your order, e.g. special notes for delivery"
                rows={4}
              />
            </div>
          </div>
        </div>
        <div className="col-span-4 border border-gray-300 rounded-lg">
          <h3 className=" text-2xl font-semibold p-5">Order Summery</h3>
          <div className="px-5">
            <div className="max-h-60 overflow-y-auto">
              {userCart?.map((product) => (
                <div
                  key={product?.product_id}
                  className="flex items-center mb-3 justify-between gap-2"
                >
                  <div className="flex items-center gap-2">
                    <img
                      className="w-16 h-14"
                      src={product?.featured_photo}
                      alt=""
                    />
                    <h3 className="font-semibold text-sm flex justify-between items-center gap-3">
                      {product?.product_name.slice(0, 20)}...{" "}
                      <span>x{product?.quantity}</span>
                    </h3>
                  </div>
                  <h4 className="text-sm font-semibold">
                    $
                    {product?.price?.sale_price
                      ? product?.price?.sale_price * product?.quantity
                      : product?.price?.regular_price * product?.quantity}
                  </h4>
                </div>
              ))}
            </div>
            <div className="py-5">
              <div className="flex justify-between border-b border-gray-300 pt-2 pb-3 items-center">
                <h3 className=" text-gray-700 text-sm font-medium">
                  Subtotal:
                </h3>
                <h5 className="text-sm font-semibold">${subTotal}</h5>
              </div>
              <div className="flex justify-between border-b border-gray-300 pt-2 pb-3 items-center">
                <h3 className=" text-gray-700 text-sm font-medium">
                  Discount:
                </h3>
                <h5 className="text-sm font-semibold">$0</h5>
              </div>
              <div className="flex justify-between border-b border-gray-300 pt-2 pb-3 items-center">
                <h3 className=" text-gray-700 text-sm font-medium">
                  Shipping:
                </h3>
                <h5 className="text-sm font-semibold">Free</h5>
              </div>
              <div className="flex justify-between pt-2 pb-5 items-center">
                <h3 className=" font-semibold">Total</h3>
                <h5 className="text-gray-900 font-bold">${subTotal}</h5>
              </div>
              <h3 className=" text-2xl font-semibold">Payment Method</h3>
              <RadioGroup
                defaultValue="stripe"
                color="success"
                size="sm"
                className="my-4"
              >
                <Radio value="stripe">Stripe</Radio>
              </RadioGroup>
              <div>
                <div className="mb-8">
                  {error ? <p className="text-red-400">{error}</p> : ""}
                  {userCart.length == 0 ? (
                    <p className="text-red-400">
                      No Product available in your cart
                    </p>
                  ) : (
                    ""
                  )}
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
                    type="submit"
                    color="success"
                    radius="full"
                    size="lg"
                    className="text-white my-5 bg-green-500 w-full"
                    isDisabled={
                      !stripe ||
                      !clientSecret ||
                      processing ||
                      userCart.length === 0 ||
                      !user
                    }
                  >
                    Place Order
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <Toaster />
    </div>
  );
};

export default CheckOutFunctionality;
