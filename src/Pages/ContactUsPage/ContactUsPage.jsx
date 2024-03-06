import { Button } from "@nextui-org/react";


const ContactUsPage = () => {
    return (
        <div className="grid grid-cols-1 py-9 mx-8 md:grid-cols-2 gap-10">
            <div>
            <h2 className="text-3xl font-semibold mb-8">Contact Us</h2>
            <div className="flex flex-col gap-5 justify-center">
                <h2 className="text-lg font-semibold">Email Us: <span className="text-gray-900 underline">hasnathasan389@gamil.com</span></h2>
                <h2 className="text-lg font-semibold">Call Us: <span>(219) 555-0114</span></h2>
                <h2 className="text-lg font-semibold">Address: <span>Lincoln- 344, Illinois, Chicago, USA</span></h2>
            </div>
            </div>
            <div className="mx-5 md:mx-10">
            <form className="flex flex-col mx-auto  border p-7">
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
        </div>
    );
};

export default ContactUsPage;