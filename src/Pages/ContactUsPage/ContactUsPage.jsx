import { Button } from "@nextui-org/react";
import useSystemInfo from "../../Hooks/useSystemInfo";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import emailjs from '@emailjs/browser';
const ContactUsPage = () => {
  const [systemInfo, isSystemInfo, refetch] = useSystemInfo();
  const handleContact = async(e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const name = form.name.value;
    const message = form.message.value;
    // axios.post(`http://localhost:8000/contactWithUser`, {email, name, message})
    // .then(res => {
    //   console.log(res);
    //   if(res?.status === 200){
    //     toast.success("Your message has been sent")
    //   }
    // })
    // .catch(err => toast.error(err?.message))
    try {
      const response = await emailjs.send(
          'service_o25dc6c',
          'template_b2kt3rt',
          {
              from_name: name,
              from_email: email,
              subject: "Email js test",
              message_html: message
          },
          'T03y9DpJrXKna_8ff'
      );

      console.log('Email sent:', response);
      toast.success('Your message has been sent successfully!');
      // Clear form fields
     
  } catch (error) {
      console.error('Error sending email:', error);
      toast.error('Failed to send your message. Please try again later.');
  }
  }
  return (
    <div className="grid grid-cols-1 py-9 mx-8 md:grid-cols-2 gap-10">
      <div>
        <h2 className="text-3xl font-semibold mb-8">Contact Us</h2>
        <div className="flex flex-col gap-5 justify-center">
          <h2 className="text-lg font-semibold">
            Email Us:{" "}
            <span className="text-gray-900 underline">
              {systemInfo?.[0]?.email}
            </span>
          </h2>
          <h2 className="text-lg font-semibold">
            Call Us: <span>{systemInfo?.[0]?.phone_number}</span>
          </h2>
        </div>
      </div>
      <div className="mx-5 md:mx-10">
        <form onSubmit={handleContact} className="flex flex-col mx-auto  border p-7">
          <label className="text-lg font-medium" htmlFor="name">
            Name
          </label>
          <input
            className="py-3 px-4 mb-3 border-2 border-slate-700 text-base bg-[#f8f8f8] text-[#222222] font-medium outline-2 outline-green-500 rounded-lg"
            type="text"
            id="name"
            name="name"
            placeholder="Name"
          />
          <label className="text-lg font-medium" htmlFor="email">
            Your email
          </label>
          <input
            className="py-3 px-4 mb-3 border-2 border-slate-700 text-base bg-[#f8f8f8] font-medium outline-2 outline-green-500 rounded-lg"
            type="email"
            id="email"
            name="email"
            placeholder="Email"
          />
          <label className="text-lg font-medium" htmlFor="message">
            Message
          </label>
          <textarea
            className="py-3 px-4 mb-3 border-2 border-slate-700 text-base bg-[#f8f8f8] font-medium outline-2 outline-green-500 rounded-lg"
            id="message"
            name="message"
            rows={4}
          ></textarea>
          <Button
            type="submit"
            size="lg"
            color="success"
            radius="full"
            className="text-white mb-2 px-12 bg-green-500"
          >
            Send Message
          </Button>
        </form>
      </div>
      <Toaster></Toaster>
    </div>
  );
};

export default ContactUsPage;
