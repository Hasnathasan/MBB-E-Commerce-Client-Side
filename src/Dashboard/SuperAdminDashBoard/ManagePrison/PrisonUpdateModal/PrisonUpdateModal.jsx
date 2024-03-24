import { Button } from "@nextui-org/react";
import axios from "axios";
import toast from "react-hot-toast";

const PrisonUpdateModal = ({ prison, refetch, onClose }) => {
  const handlePrisonUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const prison_name = form.prison_name.value;
    const country = form.country.value;
    const states = form.states.value;
    const address = form.address.value;
    const zipCode = form.zipCode.value;
    const number = form.phoneNumber.value;
    const prisonToUpdate = {
      prison_name,
      country,
      states,
      address,
      zipCode,
      number,
    };
    console.log(prison);
    axios
      .patch(
        `https://mbb-e-commerce-server.vercel.app/prisonUpdate/${prison?.email}`,
        prisonToUpdate
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
          refetch();
          onClose();
          return toast.success("Successfully Updated Prison");
        }
      })
      .catch((error) => {
        return toast.error(
          error?.response?.data?.message || "An Unknown Error Occurred"
        );
      });
  };
  return (
    <form onSubmit={handlePrisonUpdate} className="md:p-5">
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-5 gap-2">
        <div>
          <label htmlFor="prison_name">Prison Name</label>
          <input
            type="text"
            name="prison_name"
            id="prison_name"
            className=" border w-full border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block p-2.5 "
            placeholder="Prison Name"
            defaultValue={prison?.prison_name}
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
            defaultValue={prison?.address}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-5 gap-2">
        <div>
          <label htmlFor="country">Country / Region</label>
          <input
            type="text"
            name="country"
            id="country"
            className=" border w-full border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block p-2.5 "
            placeholder="Country"
            defaultValue={prison?.country}
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
            defaultValue={prison?.states}
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
            defaultValue={prison?.zipCode}
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-5 gap-2">
        <div>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            name="email"
            id="email"
            className=" border w-full border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block p-2.5 "
            placeholder="Email Address"
            defaultValue={prison?.email}
            disabled
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
            defaultValue={prison?.number}
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
        Update Prison
      </Button>
    </form>
  );
};

export default PrisonUpdateModal;
