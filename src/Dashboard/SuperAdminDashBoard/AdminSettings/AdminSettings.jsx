import { Button, Radio, RadioGroup } from "@nextui-org/react";
import axios from "axios";
import { useState } from "react";
import useSystemInfo from "../../../Hooks/useSystemInfo";
import Loader from "../../../Components/Loader/Loader";

import toast from "react-hot-toast";
const AdminSettings = () => {
  const [shippingMethod, setShippingMethod] = useState();
  const [logo, setLogo] = useState();
  const [systemInfo, isSystemInfo, refetch] = useSystemInfo();
  console.log(shippingMethod);
  const handleSystemSetting = (e) => {
    e.preventDefault();
    const form = e.target;
    const system_name = form.system_name.value;
    const email = form.email.value;
    const phone_number = form.phone_number.value;
    const website_logo = form.website_logo.files[0];
    console.log(system_name, email, phone_number, website_logo);

    // Function to upload logo
    const uploadLogo = () => {
        if (website_logo) {
            const formData = new FormData();
            formData.append("file", website_logo);
            return axios.post("https://mbb-e-commerce-server.vercel.app/uploadSingle", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((response) => {
                    console.log(response.data);
                    if (response.data.url) {
                        return response.data.url;
                    }
                })
                .catch((err) => {
                    throw err;
                });
        } else {
            return Promise.resolve(null); // No logo to upload, resolve with null
        }
    };

    // Call uploadLogo function
    return uploadLogo()
        .then((logoUrl) => {
            // Construct data object for system setting update
            const data = {
                system_name,
                email,
                phone_number,
            };
            // If logoUrl is available, add it to data object
            if (logoUrl) {
                data.logo = logoUrl;
            }

            // Patch system setting
            return axios.patch(`https://mbb-e-commerce-server.vercel.app/system-setting-update/${systemInfo[0]?._id}`, data);
        })
        .then((res) => {
            console.log(res.data);
            if (res.data.modifiedCount > 0) {
                return res.data; // Return data to handle success message
            } else {
                throw new Error("System Info not updated");
            }
        })
        .catch((err) => {
            console.log(err);
            throw err; // Throw error to handle error message
        });
};

// Call the function when desired, for example:
const handleSystemSettingClick = () => {
    const promise = handleSystemSetting(event);
    toast.promise(promise, {
        loading: 'Updating system settings...',
        success: 'System Info Updated',
        error: 'An error occurred while updating system settings'
    });
};
  if (isSystemInfo) {
    return <Loader></Loader>;
  }
  console.log(systemInfo);
  return (
    <div className="w-[95%] mx-auto">
      <h3 className="text-2xl font-semibold">SYSTEM SETTINGS</h3>
      <div className="grid grid-cols-2 gap-10 mt-8">
        <form
          onSubmit={handleSystemSettingClick}
          className=" border border-gray-300 p-5"
        >
          <div>
            <label htmlFor="product_name">System Name</label>
            <input
              type="text"
              name="system_name"
              id="system_name"
              className=" border w-full border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block p-2.5 "
              placeholder="System Name"
              defaultValue={systemInfo[0]?.system_name || "Unknown"}
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
              defaultValue={systemInfo[0]?.email || "Unknown"}
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
              defaultValue={systemInfo[0]?.phone_number || "Unknown"}
            />
          </div>
          <div>
            <label htmlFor="website_logo">Website Logo</label>
            <input
              type="file"
              name="website_logo"
              id="website_logo"
              className=" border w-full border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block p-2.5 "
            />
          </div>
          <Button
            type="submit"
            color="success"
            radius="full"
            className="px-5 text-white bg-green-500"
          >
            Save Changes
          </Button>
        </form>
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
            <div>
              <h3 className=" text-2xl font-semibold">Shipping Amount</h3>
              <RadioGroup
                defaultValue="stripe"
                color="success"
                size="sm"
                className="my-4"
                onChange={(e) => setShippingMethod(e.target.value)}
              >
                <Radio value="free">Free</Radio>
                <Radio value="with_a_amount">With a amount</Radio>
              </RadioGroup>
            </div>
            {shippingMethod == "with_a_amount" ? (
              <div>
                <label htmlFor="shipping_amount">Shipping Amount</label>
                <input
                  type="number"
                  name="shipping_amount"
                  id="shipping_amount"
                  className=" border w-full border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block p-2.5 "
                  placeholder="Set a Shipping Amount"
                  required
                />
              </div>
            ) : (
              ""
            )}
            <Button
              color="success"
              radius="full"
              className="px-5 text-white bg-green-500"
            >
              Save Changes
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
