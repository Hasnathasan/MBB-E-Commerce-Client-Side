const PrisonUpdateModal = () => {
  return (
    <form onSubmit={handlePrisonAdding} className="p-5">
      <div className="grid grid-cols-2 gap-5">
        <div>
          <label htmlFor="prison_name">Prison Name</label>
          <input
            type="text"
            name="prison_name"
            id="prison_name"
            className=" border w-full border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block p-2.5 "
            placeholder="Prison Name"
            required
          />
        </div>
        <div>
          <label htmlFor="address">Street Address</label>
          <input
            type="text"
            name="address"
            id="address"
            className=" border w-full border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block p-2.5 "
            placeholder="Street Address"
            required
          />
        </div>
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
            required
          />
        </div>
      </div>
      <Button
        type="submit"
        color="success"
        radius="full"
        className="text-white mb-2 px-12 bg-green-500"
      >
        Add Prison
      </Button>
    </form>
  );
};

export default PrisonUpdateModal;
