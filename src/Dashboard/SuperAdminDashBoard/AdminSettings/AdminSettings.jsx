import {
  Pagination,
  Button,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@nextui-org/react";
import Select from "react-select";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import useSystemInfo from "../../../Hooks/useSystemInfo";
import Loader from "../../../Components/Loader/Loader";

import toast from "react-hot-toast";
import useTaxAndShippingData from "../../../Hooks/useTaxAndShippingData";
const AdminSettings = () => {
  const [dataToUpdate, setDataToUpdate] = useState(null);
  const [isStandardShippingSelected, setIsStandardShippingSelected] =
    useState(false);
  const [isExpressDeliverySelected, setIsExpressDeliverySelected] =
    useState(false);
  const [isFreeShippingSelected, setIsFreeShippingSelected] = useState(false);
  const [systemInfo, isSystemInfo, refetch] = useSystemInfo();
  const [data, isDataLoading, refetchTaxAndShipping] = useTaxAndShippingData();

  const [selectedState, SetSelectedState] = useState(null);
  const [selectedUpdateState, SetSelectedUpdateState] = useState(null);

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
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isUpdateOpen,
    onOpen: onUpdateOpen,
    onOpenChange: onUpdateOpenChange,
  } = useDisclosure();
  const [page, setPage] = useState(1);
  const rowsPerPage = 20;
  const pages = Math.ceil(data?.length / rowsPerPage);
  console.log(data);
  const taxAndShippingData = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return data?.slice(start, end);
  }, [page, data]);
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
        return axios
          .post(
            "https://mbb-e-commerce-server.vercel.app/uploadSingle",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          )
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
        return axios.patch(
          `https://mbb-e-commerce-server.vercel.app/system-setting-update/${systemInfo[0]?._id}`,
          data
        );
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
          return res.data; // Return data to handle success message
        } else {
          throw new Error("Everything is up to date");
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
      loading: "Updating system settings...",
      success: "System Info Updated",
      error: (err) =>
        err?.message || "An error occurred while updating system settings",
    });
  };

  const handleTaxShippingMethodAdding = (e, onClose) => {
    e.preventDefault();
    const form = e.target;
    const states = selectedState?.value;
    const zipCode = form.zipCode.value;
    const tax_rate = form.tax_rate.value;
    let shipping_methods = {};
    if (isStandardShippingSelected) {
      const standard_shipping = form?.standard_shipping?.value;
      shipping_methods.standard_shipping = parseFloat(standard_shipping);
    }
    if (isExpressDeliverySelected) {
      const express_shipping = form?.express_shipping?.value;
      shipping_methods.express_shipping = parseFloat(express_shipping);
    }
    if (isFreeShippingSelected) {
      shipping_methods.free_shipping = 0;
    }
    const data = { states, zipCode, tax_rate, shipping_methods };
    axios
      .post(
        "https://mbb-e-commerce-server.vercel.app/taxAndShippingMethod",
        data
      )
      .then((res) => {
        if (res.data.insertedId) {
          toast.success("Data Added");
          refetchTaxAndShipping();
          setIsExpressDeliverySelected(false);
          setIsFreeShippingSelected(false);
          setIsStandardShippingSelected(false);
          onClose();
        }
      })
      .catch((err) =>
        toast.error(err?.response?.data || "An Unexpected Error Occoured")
      );
  };
  if (isSystemInfo) {
    return <Loader></Loader>;
  }
  console.log(systemInfo);
  const deleteFunc = (id) => {
    axios
      .delete(
        `https://mbb-e-commerce-server.vercel.app/taxAndShippingDelete/${id}`
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.deletedCount > 0) {
          refetchTaxAndShipping();
          toast.success("Data Deleted");
        }
      })
      .catch((err) => console.log(err));
  };
  const handleDelete = (id) => {
    toast((t) => (
      <span>
        Do You Want To Delete This Data?
        <ButtonGroup variant="solid" radius="none" size="sm">
          <Button
            className="px-9 mt-3 float-right  text-white"
            color="danger"
            onClick={() => {
              deleteFunc(id);
              toast.dismiss(t.id);
            }}
          >
            Yes
          </Button>
          <Button
            className="px-9 mt-3 float-right  text-white"
            color="success"
            onClick={() => toast.dismiss(t.id)}
          >
            No
          </Button>
        </ButtonGroup>
      </span>
    ));
  };

  const handleUpdateModal = (data) => {
    console.log(data);
    setDataToUpdate(data);
    SetSelectedUpdateState({
      value: data?.states,
      label: statesOfUsa?.[data?.states],
    });
    if (data.shipping_methods?.standard_shipping) {
      setIsStandardShippingSelected(true);
    }
    if (data?.shipping_methods?.express_shipping) {
      setIsExpressDeliverySelected(true);
    }
    if (data.shipping_methods?.free_shipping == 0) {
      setIsFreeShippingSelected(true);
    }

    onUpdateOpen();
  };

  const handleTaxShippingMethodUpdating = (e, onClose) => {
    e.preventDefault();
    const form = e.target;
    const states = selectedUpdateState?.value;
    const zipCode = form.zipCode.value;
    const tax_rate = form.tax_rate.value;
    let shipping_methods = {};
    if (isStandardShippingSelected) {
      const standard_shipping = form?.standard_shipping?.value;
      shipping_methods.standard_shipping = parseFloat(standard_shipping);
    }
    if (isExpressDeliverySelected) {
      const express_shipping = form?.express_shipping?.value;
      shipping_methods.express_shipping = parseFloat(express_shipping);
    }
    if (isFreeShippingSelected) {
      shipping_methods.free_shipping = 0;
    }
    const data = { states, zipCode, tax_rate, shipping_methods };
    axios
      .patch(
        `https://mbb-e-commerce-server.vercel.app/taxAndShippingMethodUpdate/${dataToUpdate?._id}`,
        data
      )
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetchTaxAndShipping();
          toast.success("Data Updated");
          onClose();
        }
      })
      .catch((err) =>
        toast.error(err?.response?.data || "An Unexpected Error Occured")
      );
  };
  return (
    <div className="w-[95%] mx-auto">
      <h3 className="text-2xl font-semibold">SYSTEM SETTINGS</h3>
      <div className="grid  gap-10 mt-8">
        <form
          onSubmit={handleSystemSettingClick}
          className="border border-gray-300 p-5"
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
      </div>
      <div className="col-span-3 border border-gray-300 mt-8 p-5">
        <div className="flex justify-between mb-4">
          <h3 className="text-lg font-semibold">Shipping and tax settings</h3>
          <Button
            onPress={onOpen}
            className=" text-white px-5"
            size="sm"
            color="primary"
          >
            Add shipping and tax
          </Button>
        </div>
        <Table
          aria-label="Example table with custom cells"
          bottomContent={
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="secondary"
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
              />
            </div>
          }
        >
          <TableHeader>
            <TableColumn>State Name</TableColumn>
            <TableColumn>Zip Code</TableColumn>
            <TableColumn>Tax Rate</TableColumn>
            <TableColumn>Shipping Methods</TableColumn>
            <TableColumn>
              <h5 className="text-center">Action</h5>
            </TableColumn>
          </TableHeader>
          <TableBody emptyContent={"No Artist Available"}>
            {taxAndShippingData?.length > 0
              ? taxAndShippingData?.map((eachData) => (
                  <TableRow key={eachData._id}>
                    <TableCell className="py-6">{eachData?.states}</TableCell>
                    <TableCell>{eachData?.zipCode}</TableCell>
                    <TableCell>{eachData?.tax_rate}%</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <div>
                          {eachData?.shipping_methods?.free_shipping == 0
                            ? `Free Shipping`
                            : ""}
                        </div>
                        <div>
                          {eachData?.shipping_methods?.express_shipping
                            ? `Express Shipping: ${eachData?.shipping_methods?.express_shipping}`
                            : ""}
                        </div>
                        <div>
                          {eachData?.shipping_methods?.standard_shipping
                            ? `Standard Shipping: ${eachData?.shipping_methods?.standard_shipping}`
                            : ""}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <ButtonGroup size="sm">
                        <Button
                          onClick={() => handleUpdateModal(eachData)}
                          color="success"
                          className="text-white"
                        >
                          Update
                        </Button>
                        <Button
                          onClick={() => handleDelete(eachData?._id)}
                          color="danger"
                          className="text-white"
                        >
                          Delete
                        </Button>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                ))
              : []}
          </TableBody>
        </Table>
      </div>
      <Modal
        size="2xl"
        scrollBehavior="outside"
        backdrop="opaque"
        className="!z-50"
        isOpen={isOpen}
        onOpenChange={() => {
          SetSelectedState(null);
          setIsExpressDeliverySelected(false);
          setIsStandardShippingSelected(false);
          setIsFreeShippingSelected(false);
          onOpenChange();
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add Data
              </ModalHeader>
              <ModalBody>
                <form
                  onSubmit={(e) => handleTaxShippingMethodAdding(e, onClose)}
                  className="p-5"
                >
                  <div className="mb-3">
                    <label htmlFor="states">State</label>
                    <Select
                      value={selectedState}
                      onChange={(value) => SetSelectedState(value)}
                      options={options}
                      placeholder="Select a state"
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
                  <div>
                    <label htmlFor="tax_rate">Tax Rate</label>
                    <input
                      type="number"
                      name="tax_rate"
                      id="tax_rate"
                      className=" border w-full border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block p-2.5 "
                      placeholder="Type Tax Rate"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-lg mb-1 font-semibold">
                      Select Shipping Methods:
                    </label>
                    <div>
                      <Checkbox
                        isSelected={isStandardShippingSelected}
                        onValueChange={setIsStandardShippingSelected}
                        color="success"
                      >
                        Standard Shipping
                      </Checkbox>
                      <input
                        type="number"
                        name="standard_shipping"
                        id="standard_shipping"
                        className={` border w-full border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 ${
                          isStandardShippingSelected ? "block" : "hidden"
                        } p-2.5 `}
                        placeholder="Enter Amount"
                      />
                    </div>
                    {/* <div>
                      <Checkbox
                        isSelected={isExpressDeliverySelected}
                        onValueChange={setIsExpressDeliverySelected}
                        color="success"
                      >
                        Express Delivery
                      </Checkbox>
                      <input
                        type="number"
                        name="express_shipping"
                        id="express_shipping"
                        className={` border w-full border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 ${
                          isExpressDeliverySelected ? "block" : "hidden"
                        } p-2.5 `}
                        placeholder="Enter Amount"
                      />
                    </div> */}
                    <div>
                      <Checkbox
                        isSelected={isFreeShippingSelected}
                        onValueChange={setIsFreeShippingSelected}
                        color="success"
                      >
                        Free Shipping
                      </Checkbox>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    color="success"
                    radius="full"
                    className="text-white mt-3 px-12 bg-green-500"
                  >
                    Add
                  </Button>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal
        scrollBehavior="outside"
        size="2xl"
        backdrop="opaque"
        className="!z-50"
        isOpen={isUpdateOpen}
        onOpenChange={() => {
          setIsExpressDeliverySelected(false);
          setIsStandardShippingSelected(false);
          setIsFreeShippingSelected(false);
          onUpdateOpenChange();
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Update Data
              </ModalHeader>
              <ModalBody>
                <form
                  onSubmit={(e) => handleTaxShippingMethodUpdating(e, onClose)}
                  className="p-5"
                >
                  <div className="mb-3">
                    <label htmlFor="states">State</label>
                    <Select
                      value={selectedUpdateState}
                      onChange={(value) => SetSelectedUpdateState(value)}
                      options={options}
                      placeholder="Select a state"
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
                      defaultValue={dataToUpdate?.zipCode}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="tax_rate">Tax Rate</label>
                    <input
                      type="number"
                      name="tax_rate"
                      id="tax_rate"
                      className=" border w-full border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 block p-2.5 "
                      placeholder="Type Tax Rate"
                      defaultValue={dataToUpdate?.tax_rate}
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-lg mb-1 font-semibold">
                      Select Shipping Methods:
                    </label>
                    <div>
                      <Checkbox
                        isSelected={isStandardShippingSelected}
                        onValueChange={setIsStandardShippingSelected}
                        color="success"
                      >
                        Standard Shipping
                      </Checkbox>
                      <input
                        type="number"
                        name="standard_shipping"
                        id="standard_shipping"
                        className={` border w-full border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 ${
                          isStandardShippingSelected ? "block" : "hidden"
                        } p-2.5 `}
                        placeholder="Enter Amount"
                        defaultValue={
                          dataToUpdate?.shipping_methods?.standard_shipping
                        }
                      />
                    </div>
                    {/* <div>
                      <Checkbox
                        isSelected={isExpressDeliverySelected}
                        onValueChange={setIsExpressDeliverySelected}
                        color="success"
                      >
                        Express Delivery
                      </Checkbox>
                      <input
                        type="number"
                        name="express_shipping"
                        id="express_shipping"
                        className={` border w-full border-gray-300 mb-6 mt-1 text-gray-900 sm:text-sm rounded-md focus:outline-green-500 ${
                          isExpressDeliverySelected ? "block" : "hidden"
                        } p-2.5 `}
                        placeholder="Enter Amount"
                        defaultValue={
                          dataToUpdate?.shipping_methods?.express_shipping
                        }
                      />
                    </div> */}
                    <div>
                      <Checkbox
                        isSelected={isFreeShippingSelected}
                        onValueChange={setIsFreeShippingSelected}
                        color="success"
                      >
                        Free Shipping
                      </Checkbox>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    color="success"
                    radius="full"
                    className="text-white mt-3 px-12 bg-green-500"
                  >
                    Add
                  </Button>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AdminSettings;
