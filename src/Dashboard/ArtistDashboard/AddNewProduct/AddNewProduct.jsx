import useUser from "../../../Hooks/useUser";

const AddNewProduct = () => {
  const [userData] = useUser();
  return <div className="w-full  border border-gray-300 rounded-lg h-screen">
    <h4 className="p-4 text-xl border-b border-gray-300 font-semibold">Add a New Product</h4>
    <div className={`border-b border-gray-300 p-5`}>
          <div className="">
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label htmlFor="productName">Product Name</label>
                <input
                  type="text"
                  name="productName"
                  id="productName"
                  className=" border w-full border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block p-2.5 "
                  placeholder="Product Name"
                  required
                />
              </div>
              <div>
                <label htmlFor="productsPhoto">
                  Products photos
                </label>
                <input
                  type="file"
                  multiple
                  name="productsPhoto"
                  id="productsPhoto"
                  className=" border w-full border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block p-2 "
                  placeholder="Products Photo"
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
  </div>;
};

export default AddNewProduct;
