import { Button, Checkbox, Radio, RadioGroup } from "@nextui-org/react";
import useUser from "../../../Hooks/useUser";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

const CheckOutFunctionality = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [axiosSecure] = useAxiosSecure();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState("");
  const [selectedShippingMethod, setSelectedShippingMethod] = useState(null);
  const [selectedState, SetSelectedState] = useState(null);
  const [selectedShippingState, setSelectedShippingState] = useState(null);
  const [shippingMethods, setShippingMethods] = useState();
  const [taxRate, setTaxRate] = useState();
  const [processing, setProcessing] = useState(false);
  const [total, setTotal] = useState(0);
  const [isSelected, setIsSelected] = useState(false);
  const [transactionId, setTransactionId] = useState();
  const { setIsProductAdded, user } = useContext(AuthContext);
  const [userData] = useUser();
  const [userCart, setUserCart] = useState([]);
  const { isProductAdded } = useContext(AuthContext);
  const [state, setState] = useState();
  const [zipCode, setZipCode] = useState();

  useEffect(() => {
    const statesOfUsa = {
      AL: "Alabama",
      AK: "Alaska",
      AZ: "Arizona",
      AR: "Arkansas",
      CA: "California",
      CO: "Colorado",
      CT: "Connecticut",
      DE: "Delaware",
      FL: "Florida",
      GA: "Georgia",
      HI: "Hawaii",
      ID: "Idaho",
      IL: "Illinois",
      IN: "Indiana",
      IA: "Iowa",
      KS: "Kansas",
      KY: "Kentucky",
      LA: "Louisiana",
      ME: "Maine",
      MD: "Maryland",
      MA: "Massachusetts",
      MI: "Michigan",
      MN: "Minnesota",
      MS: "Mississippi",
      MO: "Missouri",
      MT: "Montana",
      NE: "Nebraska",
      NV: "Nevada",
      NH: "New Hampshire",
      NJ: "New Jersey",
      NM: "New Mexico",
      NY: "New York",
      NC: "North Carolina",
      ND: "North Dakota",
      OH: "Ohio",
      OK: "Oklahoma",
      OR: "Oregon",
      PA: "Pennsylvania",
      RI: "Rhode Island",
      SC: "South Carolina",
      SD: "South Dakota",
      TN: "Tennessee",
      TX: "Texas",
      UT: "Utah",
      VT: "Vermont",
      VA: "Virginia",
      WA: "Washington",
      WV: "West Virginia",
      WI: "Wisconsin",
      WY: "Wyoming",
    };
    SetSelectedState({
      value: userData?.billingInfo?.states,
      label: statesOfUsa?.[userData?.billingInfo?.states],
    });
  }, [userData?.billingInfo?.states]);

  // const options = statesFullNameArray?.map(state => {
  //   const option = {value: state, label: state};
  //   return option
  // })

  const options = [
    { value: "AL", label: "Alabama" },
    { value: "AK", label: "Alaska" },
    { value: "AZ", label: "Arizona" },
    { value: "AR", label: "Arkansas" },
    { value: "CA", label: "California" },
    { value: "CO", label: "Colorado" },
    { value: "CT", label: "Connecticut" },
    { value: "DE", label: "Delaware" },
    { value: "FL", label: "Florida" },
    { value: "GA", label: "Georgia" },
    { value: "HI", label: "Hawaii" },
    { value: "ID", label: "Idaho" },
    { value: "IL", label: "Illinois" },
    { value: "IN", label: "Indiana" },
    { value: "IA", label: "Iowa" },
    { value: "KS", label: "Kansas" },
    { value: "KY", label: "Kentucky" },
    { value: "LA", label: "Louisiana" },
    { value: "ME", label: "Maine" },
    { value: "MD", label: "Maryland" },
    { value: "MA", label: "Massachusetts" },
    { value: "MI", label: "Michigan" },
    { value: "MN", label: "Minnesota" },
    { value: "MS", label: "Mississippi" },
    { value: "MO", label: "Missouri" },
    { value: "MT", label: "Montana" },
    { value: "NE", label: "Nebraska" },
    { value: "NV", label: "Nevada" },
    { value: "NH", label: "New Hampshire" },
    { value: "NJ", label: "New Jersey" },
    { value: "NM", label: "New Mexico" },
    { value: "NY", label: "New York" },
    { value: "NC", label: "North Carolina" },
    { value: "ND", label: "North Dakota" },
    { value: "OH", label: "Ohio" },
    { value: "OK", label: "Oklahoma" },
    { value: "OR", label: "Oregon" },
    { value: "PA", label: "Pennsylvania" },
    { value: "RI", label: "Rhode Island" },
    { value: "SC", label: "South Carolina" },
    { value: "SD", label: "South Dakota" },
    { value: "TN", label: "Tennessee" },
    { value: "TX", label: "Texas" },
    { value: "UT", label: "Utah" },
    { value: "VT", label: "Vermont" },
    { value: "VA", label: "Virginia" },
    { value: "WA", label: "Washington" },
    { value: "WV", label: "West Virginia" },
    { value: "WI", label: "Wisconsin" },
    { value: "WY", label: "Wyoming" },
  ];
  console.log("selectedShippingState", selectedShippingState);

  console.log(state, zipCode);
  useEffect(() => {
    axios
      .get(
        `https://mbb-e-commerce-server.vercel.app/taxAndShippingDataByStateAndZip?state=${
          isSelected ? selectedShippingState?.value : selectedState?.value
        }&zipCode=${zipCode}`
      )
      .then((res) => {
        console.log(res.data);
        setShippingMethods(res?.data?.shipping_methods);
        setTaxRate(res?.data?.tax_rate);
      })
      .catch((err) => {
        console.log(err);
        setShippingMethods(null);
      });
  }, [isSelected, selectedShippingState, selectedState?.value, state, zipCode]);

  useEffect(() => {
    setState(userData?.billingInfo?.states);
    setZipCode(userData?.billingInfo?.zipCode);
  }, [
    userData?.billingInfo?.states,
    userData?.billingInfo?.zipCode,
    isSelected,
  ]);
  const handleChange = (selectedState) => {
    SetSelectedState(selectedState);
    console.log(`Option selected:`, selectedState);
  };
  const handleShippingStateChange = (selectedState) => {
    setSelectedShippingState(selectedState);
    console.log(`Option selected:`, selectedState);
  };
  console.log(shippingMethods);
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
    const shippingAmount =
      selectedShippingMethod && shippingMethods
        ? shippingMethods[selectedShippingMethod]
        : 0 || 0;

    console.log(shippingAmount);
    const tax = subTotal * (taxRate / 100) || 0;
    const totalAmount = subTotal + shippingAmount + tax;
    console.log(totalAmount);
    setTotal(totalAmount);
  }, [selectedShippingMethod, shippingMethods, subTotal, taxRate]);
  useEffect(() => {
    if (subTotal > 0) {
      axiosSecure.post("/create-payment-intent", { subTotal }).then((res) => {
        setClientSecret(res.data.clientSecret);
      });
    }
  }, [axiosSecure, subTotal]);
  console.log(isSelected);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedShippingMethod) {
      return toast.error("Please select a shipping method");
    }
    setProcessing(true);
    const form = event.target;
    const email = form.email.value;
    const userName = form.userName.value;
    const companyName = form.companyName.value;
    const country = form.country.value;
    const states = selectedState?.value;
    const address = form.address.value;
    const zipCode = form.zipCode.value;
    const userPhoneNumber = form.phoneNumber.value;
    const emailForShipping = form.emailForShipping.value;
    const userNameForShipping = form.userNameForShipping.value;
    const companyNameForShipping = form.companyNameForShipping.value;
    const countryForShipping = form.countryForShipping.value;
    const statesForShipping = selectedShippingState?.value;
    const addressForShipping = form.addressForShipping.value;
    const zipCodeForShipping = form.zipCodeForShipping.value;
    const userPhoneNumberForShipping = form.phoneNumberForShipping.value;
    const additional_info = form.additional_info.value;
    const user_details = {
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
    const shipping_data = {
      email: emailForShipping,
      userName: userNameForShipping,
      companyName: companyNameForShipping,
      country: countryForShipping,
      address: addressForShipping,
      states: statesForShipping,
      zipCode: zipCodeForShipping,
      userPhoneNumber: userPhoneNumberForShipping,
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

    let order = {
      userDetails: user_details,
      products: userCart,
      status: "pending",
      createdAt: new Date(),
      subTotal: subTotal,
      tax: (subTotal * (taxRate / 100)).toFixed(2),
      shippingMethod: {},
      total_price: total,
    };
    if (selectedShippingMethod && shippingMethods) {
      order.shippingMethod[selectedShippingMethod] =
        shippingMethods[selectedShippingMethod];
    }
    if (isSelected) {
      order.shipping_address = shipping_data;
    }
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
                  email: email || "unknown ",
                  name: userName || "anonymous",
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

          if (paymentIntent.status === "succeeded") {
            const transactionId = paymentIntent.id;
            axios
              .post(
                `https://mbb-e-commerce-server.vercel.app/ordersUpdate/${result?.data?.insertedId}?transactionId=${transactionId}`,
                orderProductsId
              )
              .then((result) => {
                console.log(result);
                setTransactionId(transactionId);
                localStorage.removeItem("cart");
                setProcessing(false);
                setIsProductAdded((prevCount) => prevCount + 1);
                navigate(`/thanks-for-purchasing/${transactionId}`);
              })
              .catch((error) => {
                return toast.error(error.message);
              });
            console.log(order);
          }
        }
      })
      .catch((error) => {
        setProcessing(false);
        return toast.error(error?.response?.data?.message);
      });
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-12 items-start py-10 mx-2 lg:mx-8 gap-6"
      >
        <div className="col-span-12 p-5 lg:col-span-8">
          <div className={`border-b border-gray-300  pb-5`}>
            <div className="flex justify-between items-center">
              <h4 className="mb-5 text-2xl font-semibold">
                Billing Information
              </h4>
            </div>
            <div className="">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label htmlFor="country">City</label>
                  <input
                    type="text"
                    name="country"
                    id="country"
                    className=" border w-full border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block p-2.5 "
                    placeholder="City"
                    defaultValue={userData?.billingInfo?.country}
                    required
                  />
                </div>
                {/* <div>
                  <label htmlFor="states">States</label>
                  <input
                    onChange={(e) => {
                      if (!isSelected) {
                        setState(e.target.value);
                      }
                    }}
                    type="text"
                    name="states"
                    id="states"
                    className=" border w-full border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block p-2.5 "
                    placeholder="States Name"
                    defaultValue={userData?.billingInfo?.states}
                    required
                  />
                </div> */}
                <div>
                  <label htmlFor="states">State</label>
                  <Select
                    value={selectedState}
                    onChange={handleChange}
                    options={options}
                    placeholder="Select your state"
                  />
                </div>
                <div>
                  <label htmlFor="zipCode">Zip Code</label>
                  <input
                    onChange={(e) => {
                      if (!isSelected) {
                        setZipCode(e.target.value);
                      }
                    }}
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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

          <div className="flex mt-5 justify-end">
            <Checkbox isSelected={isSelected} onValueChange={setIsSelected}>
              Add a Different Shipping Address
            </Checkbox>
          </div>
          <div
            className={`border-b border-gray-300 ${
              isSelected ? "block" : "hidden"
            } pb-5`}
          >
            <div className={``}>
              <div className="flex justify-between items-center">
                <h4 className="mb-5 text-2xl font-semibold">
                  Shipping Information
                </h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="userNameForShipping">Your Name</label>
                  <input
                    type="text"
                    name="userNameForShipping"
                    id="userNameForShipping"
                    className=" border w-full border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block p-2.5 "
                    placeholder="Name"
                    required={isSelected}
                  />
                </div>
                <div>
                  <label htmlFor="companyNameForShipping">
                    Company Name{" "}
                    <span className=" text-gray-700">(optional)</span>
                  </label>
                  <input
                    type="text"
                    name="companyNameForShipping"
                    id="companyNameForShipping"
                    className=" border w-full border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block p-2.5 "
                    placeholder="companyName"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="addressForShipping">Street Address</label>
                <input
                  type="text"
                  name="addressForShipping"
                  id="addressForShipping"
                  className=" border w-full border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block p-2.5 "
                  placeholder="Street Address"
                  required={isSelected}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label htmlFor="countryForShipping">City</label>
                  <input
                    type="text"
                    name="countryForShipping"
                    id="countryForShipping"
                    className=" border w-full border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block p-2.5 "
                    placeholder="City"
                    required={isSelected}
                  />
                </div>
                <div>
                  <label htmlFor="states">State</label>
                  <Select
                    value={selectedShippingState}
                    onChange={handleShippingStateChange}
                    options={options}
                    placeholder="Select your state"
                  />
                </div>
                <div>
                  <label htmlFor="zipCodeForShipping">Zip Code</label>
                  <input
                    onChange={(e) => setZipCode(e.target.value)}
                    type="number"
                    name="zipCodeForShipping"
                    id="zipCodeForShipping"
                    className=" border w-full border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block p-2.5 "
                    placeholder="Zip Code"
                    required={isSelected}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="emailForShipping">Email Address</label>
                  <input
                    type="email"
                    name="emailForShipping"
                    id="emailForShipping"
                    className=" border w-full border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block p-2.5 "
                    placeholder="Email Address"
                    required={isSelected}
                  />
                </div>

                <div>
                  <label htmlFor="phoneNumberForShipping">Phone Number</label>
                  <input
                    type="tel"
                    name="phoneNumberForShipping"
                    id="phoneNumberForShipping"
                    className=" border w-full border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block p-2.5 "
                    placeholder="Phone Number"
                    required={isSelected}
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
        <div className="col-span-12 lg:col-span-4 border border-gray-300 rounded-lg">
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
                <h3 className=" text-gray-700 text-sm font-medium">Tax:</h3>
                <h5 className="text-sm font-semibold">
                  ${taxRate ? (subTotal * (taxRate / 100)).toFixed(2) : 0}
                </h5>
              </div>
              <RadioGroup
                label="Select a Shipping Method"
                value={selectedShippingMethod}
                onValueChange={setSelectedShippingMethod}
                isRequired={true}
              >
                {shippingMethods?.standard_shipping ? (
                  <Radio value="standard_shipping">
                    Standard Shipping: ${shippingMethods?.standard_shipping}
                  </Radio>
                ) : (
                  ""
                )}
                {shippingMethods?.express_shipping ? (
                  <Radio value="express_shipping">
                    Express Shipping: ${shippingMethods?.express_shipping}
                  </Radio>
                ) : (
                  ""
                )}
                {shippingMethods?.free_shipping == 0 ? (
                  <Radio value="free_shipping">Free Shipping</Radio>
                ) : (
                  ""
                )}
              </RadioGroup>
              <div className="flex justify-between pt-2 pb-5 items-center">
                <h3 className=" font-semibold">Total</h3>
                <h5 className="text-gray-900 font-bold">${total}</h5>
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
                      userCart.length === 0
                    }
                  >
                    {processing ? "Processing" : "Place Order"}
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
