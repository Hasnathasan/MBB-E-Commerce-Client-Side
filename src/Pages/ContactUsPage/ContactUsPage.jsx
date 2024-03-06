

const ContactUsPage = () => {
    return (
        <div className="grid grid-cols-1 py-9 mx-8 md:grid-cols-2 gap-10">
            <div className="flex flex-col justify-center">
                <h2 className="text-xl font-semibold">Email Us: hasnathasan389@gamil.com</h2>
            </div>
            <div>
            <form className="flex flex-col mx-auto w-[95%] md:w-[70%] border p-7">
          <label className="text-lg font-medium" htmlFor="name">
            Name
          </label>
          <input
            className="py-3 px-4 mb-3 border-2 border-slate-700 text-base bg-[#f8f8f8] text-[#222222] font-medium outline-none rounded-lg"
            type="text"
            id="name"
            name="name"
            placeholder="Name"
          />
          <label className="text-lg font-medium" htmlFor="email">
            Your email
          </label>
          <input
            className="py-3 px-4 mb-3 border-2 border-slate-700 text-base bg-[#f8f8f8] font-medium outline-none rounded-lg"
            type="email"
            id="email"
            name="email"
            placeholder="Email"
          />
          <label className="text-lg font-medium" htmlFor="message">
            Message
          </label>
          <textarea
            className="py-3 px-4 mb-3 border-2 border-slate-700 text-base bg-[#f8f8f8] font-medium outline-none rounded-lg"
            id="message"
            name="message"
            rows={4}
          ></textarea>
          <input
            className="px-8 py-3 flex w-48 cursor-pointer justify-center items-center gap-2 mt-4 border-2 border-gray-800 bg-[#1b1b1b] transition hover:bg-transparent hover:text-[#1b1b1b] text-white rounded font-bold"
            type="submit"
            value="Send Message"
          />
        </form>
            </div>
        </div>
    );
};

export default ContactUsPage;