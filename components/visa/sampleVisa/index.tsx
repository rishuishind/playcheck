import Image from "next/image";

const visaFormData = [
  {
    imgUrl:
      "https://storage.googleapis.com/images.staybook.in/Staybook-Holidays/Banners/sampleVisa1.webp",
    content: "(Fill the details of your email and passport verification)",
    heading: "1. First page of the eVisa",
  },
  {
    imgUrl:
      "https://storage.googleapis.com/images.staybook.in/Staybook-Holidays/Banners/sampleVisa2.webp",
    content: "(Fill all the personal and passport details of yourselves)",
    heading: "2. Second page of the eVisa",
  },
  {
    imgUrl:
      "https://storage.googleapis.com/images.staybook.in/Staybook-Holidays/Banners/sampleVisa3.webp",
    content: "(Fill all your Travel details here then proceed to next step)",
    heading: "3. Third page of the eVisa",
  },
  {
    imgUrl:
      "https://storage.googleapis.com/images.staybook.in/Staybook-Holidays/Banners/sampleVisa4.webp",
    content: "(Give the answer of the given questions by clicking “Yes or No”)",
    heading: "4. Fourth page of the eVisa",
  },
  {
    imgUrl:
      "https://storage.googleapis.com/images.staybook.in/Staybook-Holidays/Banners/sampleVisa5.webp",
    content: "(Upload your photo in given size and details)",
    heading: "5. Fifth page of the eVisa",
  },
  {
    imgUrl:
      "https://storage.googleapis.com/images.staybook.in/Staybook-Holidays/Banners/sampleVisa6.webp",
    heading: "6. Sixth page of the eVisa",
    content: "(Upload your documents in given size and details)",
  },
  {
    imgUrl:
      "https://storage.googleapis.com/images.staybook.in/Staybook-Holidays/Banners/sampleVisa7.webp",
    heading: "7. Seventh page of the eVisa",
    content:
      "(After filling the form, verify all the details then proceed ahead)",
  },
  {
    imgUrl:
      "https://storage.googleapis.com/images.staybook.in/Staybook-Holidays/Banners/sampleVisa8.webp",
    heading: "8. Payment Page",
    content: "(After verification continue to the payment as per the need)",
  },
];

const Sampleformvisa = () => {
  return (
    <div className="mt-5 rounded-xl bg-white py-4 shadow-xl">
      <h2 className="pl-5 font-bold">Here is the sample form for eVisa</h2>
      {visaFormData.map((ele: any, index: number) => (
        <div className="px-5 pt-5" key={index}>
          <div className="left-0">
             <h3 className="text-l font-bold">{ele.heading}</h3>
            <p className="mt-2 max-w-xs text-sm">{ele.content}</p>
          </div>
          <div>
            <Image
              className="h-full w-full"
              src={ele.imgUrl}
              alt="visaimage"
              width={800}
              height={900}
            ></Image>
          </div>
        </div>
      ))}
      <ul className="list-disc pl-5 ">
        <li className="ml-5 mt-10 text-lg font-bold">
          End of the form and you will receive email of your eVisa in 3 to 4
          days
        </li>
      </ul>
    </div>
  );
};

export default Sampleformvisa;
