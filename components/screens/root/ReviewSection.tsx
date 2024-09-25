import ContactModel from "@/components/models/ContactModel";
import { useState } from "react";

export default function ReviewSection() {
  const [contactModel, setContactModel] = useState<boolean>(false);

  return (
    <>
      {contactModel && (
        <div className="fixed inset-0 grid place-items-center p-4">
          <div
            onClick={() => setContactModel(false)}
            className="absolute inset-0 bg-dark/50"
          />
          <ContactModel
            contactModel={contactModel}
            setContactModel={setContactModel}
          />
        </div>
      )}
      <div
        onClick={() => setContactModel(true)}
        className="mt-10 h-[34vh] w-full cursor-pointer bg-gradient-to-br from-secondary to-dark xl:h-[40vh]"
      >
        <div className="wrapper flex h-full flex-col justify-center gap-4 py-5">
          <div className="text-center text-white">
            <h2 className="text-2xl font-dream font-semibold tracking-wider md:text-3xl lg:text-4xl">
              Contact Us
            </h2>
            <p className="text-sm md:text-base">
              Say hi or Have a query ? feel free to ask anything
            </p>
          </div>
          <div className="mx-auto flex w-full max-w-2xl items-center justify-between gap-2.5 rounded bg-white p-4">
            <input
              type="text"
              placeholder="Say hi or ask anything"
              className="h-12 w-full outline-none border-2 rounded-md"
              readOnly
            />
            <button className="rounded-md bg-primary p-3 px-5 font-medium text-white">
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
