import { Button, Radio, RadioGroup } from "@nextui-org/react";
import useUser from "../../Hooks/useUser";
import product1 from "../../assets/products1.png";
import product2 from "../../assets/products2.png";

const CheckoutPage = () => {
  const [userData] = useUser();
  const handlePlaceOrder = e => {
    e.preventDefault();
    const form = e.target;
    const updatedName = form.userName.value;
    const companyName = form.companyName.value;
    const country = form.country.value;
    const states = form.states.value;
    const updatedAddress = form.address.value;
    const zipCode = form.zipCode.value;
    const updatedNum = form.phoneNumber.value;
    console.log({updatedName}, companyName, country, updatedAddress, states, zipCode, updatedNum);
  }
  return (
    <form onSubmit={handlePlaceOrder} className="grid grid-cols-12 items-start py-10 mx-8 gap-6">
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
                  required
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
            <label htmlFor="name">Order notes (optional)</label>
            <textarea
              type="text"
              name="name"
              id="name"
              className=" border w-full border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block p-2.5 "
              placeholder="Notes about your order, e.g. special notes for delivery"
              rows={4}
              required
            />
          </div>
        </div>
      </div>
      <div className="col-span-4 border border-gray-300 rounded-lg">
        <h3 className=" text-2xl font-semibold p-5">Order Summery</h3>
        <div className="px-5">
          <div className="flex items-center mb-3 justify-between gap-2">
            <div className="flex items-center gap-2">
              <img className="w-16 h-14" src={product1} alt="" />
              <h3 className="font-semibold text-sm flex justify-between items-center gap-3">
                The Starry Night <span>x5</span>
              </h3>
            </div>
            <h4 className="text-sm font-semibold">$70.00</h4>
          </div>
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <img className="w-16 h-14" src={product2} alt="" />
              <h3 className="font-semibold text-sm flex justify-between items-center gap-3">
                Girl with a Pearl Earring <span>x2</span>
              </h3>
            </div>
            <h4 className="text-sm font-semibold">$270.00</h4>
          </div>
          <div className="py-5">
            <div className="flex justify-between border-b border-gray-300 pt-2 pb-3 items-center">
              <h3 className=" text-gray-700 text-sm font-medium">Subtotal:</h3>
              <h5 className="text-sm font-semibold">$5782</h5>
            </div>
            <div className="flex justify-between border-b border-gray-300 pt-2 pb-3 items-center">
              <h3 className=" text-gray-700 text-sm font-medium">Discount:</h3>
              <h5 className="text-sm font-semibold">$57</h5>
            </div>
            <div className="flex justify-between border-b border-gray-300 pt-2 pb-3 items-center">
              <h3 className=" text-gray-700 text-sm font-medium">Shipping:</h3>
              <h5 className="text-sm font-semibold">Free</h5>
            </div>
            <div className="flex justify-between pt-2 pb-5 items-center">
              <h3 className=" font-semibold">Total</h3>
              <h5 className="text-gray-900 font-bold">$5839</h5>
            </div>
            <h3 className=" text-2xl font-semibold">Payment Method</h3>
            <RadioGroup size="sm" className="my-3">
              <Radio value="cashOnDelevery">Cash on delevery</Radio>
              <Radio value="stripe">Stripe</Radio>
            </RadioGroup>
            <Button
            type="submit"
              color="success"
              radius="full"
              size="lg"
              className="text-white mb-2 bg-green-500 w-full"
            >
              Place Order
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CheckoutPage;
