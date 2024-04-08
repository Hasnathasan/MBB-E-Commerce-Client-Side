import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import useSystemInfo from "../../Hooks/useSystemInfo";
 
const CUSTOM_ANIMATION = {
  mount: { scale: 1 },
  unmount: { scale: 0.9 },
};
 
const AboutUs = () => {
  const [systemInfo] = useSystemInfo();
  const [open, setOpen] = React.useState(0);
 
  const handleOpen = (value) => setOpen(open === value ? 0 : value);
 
  return (
    <div className="mx-8  py-9">
            <Accordion open={open === 1} className="mb-2 rounded-lg border border-blue-gray-100 px-4">
        <AccordionHeader
          onClick={() => handleOpen(1)}
          className={`border-b-0 transition-colors ${
            open === 1 ? "text-green-500 hover:!text-green-700" : ""
          }`}
        >
          How do we place an order?
        </AccordionHeader>
        <AccordionBody className="pt-0 text-base font-medium text-gray-800">
        Placing an order with {systemInfo?.[0]?.system_name} is a straightforward process. Begin by browsing our extensive selection of products across various categories, from electronics to fashion and beyond. Once you've found the items you wish to purchase, simply click on the product to view detailed information. Next, select the desired quantity and add the item to your virtual shopping cart by clicking the "Add to Cart" button. You can continue shopping or proceed to checkout. At checkout, you'll be prompted to provide your shipping address and preferred payment method. Follow the instructions to complete your purchase securely. Once your order is confirmed, you'll receive an email notification with all relevant details. Sit back, relax, and await the arrival of your {systemInfo?.[0]?.system_name} order!
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 2} className="mb-2 rounded-lg border border-blue-gray-100 px-4">
        <AccordionHeader
          onClick={() => handleOpen(2)}
          className={`border-b-0 transition-colors ${
            open === 2 ? "text-green-500 hover:!text-green-700" : ""
          }`}
        >
          What payment methods does {systemInfo?.[0]?.system_name} accept?
        </AccordionHeader>
        <AccordionBody className="pt-0 text-base font-medium text-gray-800">
        At {systemInfo?.[0]?.system_name}, we understand the importance of offering flexible payment options to our valued customers. That's why we accept a wide range of payment methods to suit your preferences. You can securely complete your purchase using major credit and debit cards, including Visa, MasterCard, and American Express. Additionally, we offer the convenience of PayPal for those who prefer this payment platform. For added flexibility, we also accept bank transfers. Rest assured, whichever payment method you choose, you can shop with confidence knowing that your transaction is safe and secure.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 3} className="rounded-lg mb-2 border border-blue-gray-100 px-4">
        <AccordionHeader
          onClick={() => handleOpen(3)}
          className={`border-b-0 transition-colors ${
            open === 3 ? "text-green-500 hover:!text-green-700" : ""
          }`}
        >
           Can I modify or cancel my order after it's been placed?
        </AccordionHeader>
        <AccordionBody className="pt-0 text-base font-medium text-gray-800">
        We understand that circumstances may change, and you may need to modify or cancel your order after it has been placed. While we strive to process orders efficiently, we may be able to accommodate certain modifications or cancellations if contacted promptly. We recommend reaching out to our dedicated customer support team as soon as possible with your request. Please note that once your order has been processed and dispatched from our warehouse, modifications or cancellations may no longer be possible. However, we're committed to providing the best possible service, and we'll do our utmost to assist you with your request.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 4} className="rounded-lg mb-2 border border-blue-gray-100 px-4">
        <AccordionHeader
          onClick={() => handleOpen(4)}
          className={`border-b-0 transition-colors ${
            open === 4 ? "text-green-500 hover:!text-green-700" : ""
          }`}
        >
            How can I track my order?
        </AccordionHeader>
        <AccordionBody className="pt-0 text-base font-medium text-gray-800">
        Once your order has been successfully processed and dispatched from our warehouse, you'll receive an email notification containing a tracking number and detailed instructions on how to track your package. You can use this tracking number to monitor the status of your delivery in real-time. Alternatively, you can log in to your {systemInfo?.[0]?.system_name} account and navigate to the "Order History" section to view the status of your order. We understand the importance of knowing exactly when your order will arrive, and we're here to provide you with the information you need to track your shipment every step of the way.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 5} className="rounded-lg mb-2 border border-blue-gray-100 px-4">
        <AccordionHeader
          onClick={() => handleOpen(5)}
          className={`border-b-0 transition-colors ${
            open === 5 ? "text-green-500 hover:!text-green-700" : ""
          }`}
        >
            What is {systemInfo?.[0]?.system_name}'s return policy?
        </AccordionHeader>
        <AccordionBody className="pt-0 text-base font-medium text-gray-800">
        At {systemInfo?.[0]?.system_name}, customer satisfaction is our top priority. We want you to be completely satisfied with your purchase. If, for any reason, you're not entirely happy with your order, we offer a hassle-free returns and exchanges policy. You may return eligible items within 30 days of receipt for a refund or exchange, provided they are in their original condition and packaging. To initiate a return or exchange, simply contact our dedicated customer support team, and we'll guide you through the process. For more detailed information on our return policy, including eligibility criteria and procedures, please refer to our Returns & Exchanges page.
        </AccordionBody>
      </Accordion>
    </div>
  );
}

export default AboutUs;