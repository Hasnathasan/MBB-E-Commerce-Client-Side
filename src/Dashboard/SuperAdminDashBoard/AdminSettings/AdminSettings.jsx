

const AdminSettings = () => {
    return (
        <div className="w-[95%] mx-auto">
            <h3 className="text-2xl font-semibold">SYSTEM SETTINGS</h3>
            <div className="grid grid-cols-2 mt-8">
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
                </div>
                <div>

                </div>
            </div>
        </div>
    );
};

export default AdminSettings;