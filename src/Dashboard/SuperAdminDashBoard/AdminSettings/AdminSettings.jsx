import { Button } from "@nextui-org/react";


const AdminSettings = () => {
    return (
        <div className="w-[95%] mx-auto">
            <h3 className="text-2xl font-semibold">SYSTEM SETTINGS</h3>
            <div className="grid grid-cols-2 gap-10 mt-8">
                <div className=" border border-gray-300 p-5">
                <div>
                <label htmlFor="product_name">System Name</label>
                <input
                  type="text"
                  name="system_name"
                  id="system_name"
                  className=" border w-full border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block p-2.5 "
                  placeholder="System Name"
                  required
                />
              </div>
                <div>
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className=" border w-full border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block p-2.5 "
                  placeholder="Email"
                  required
                />
              </div>
                <div>
                <label htmlFor="product_name">Phone Number</label>
                <input
                  type="tel"
                  name="phone_number"
                  id="phone_number"
                  className=" border w-full border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block p-2.5 "
                  placeholder="Phone Number"
                  required
                />
              </div>
                <div>
                <label htmlFor="product_name">Website Logo</label>
                <input
                  type="file"
                  name="logo"
                  id="logo"
                  className=" border w-full border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block p-2.5 "
                  
                  required
                />
              </div>
              <Button color="success" radius="full" className="px-5 text-white bg-green-500">Save Changes</Button>
                </div>
                <div className=" border border-gray-300 p-5">
                  <form>
                  <div>
                <label htmlFor="tax">Tax percentige</label>
                <input
                  type="number"
                  name="tax"
                  id="tax"
                  className=" border w-full border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block p-2.5 "
                  placeholder="Tax Percentige per order"
                  required
                />
              </div>
                  </form>
                </div>
            </div>
        </div>
    );
};

export default AdminSettings;