import FaqCard from "./cards/FaqCard";

type Faq = {
  question: string;
  answer: string;
};

export default function FaqSection() {
  const FAQs: Faq[] = [
    {
      question: "Whats the difference between a Double room and a Twin room?",
      answer:
        "A double room has one double bed. A twin room has two single beds.",
    },
    {
      question:
        "We have two small children; can we get extra beds in the room?",
      answer: "Yes, you can get an extra bed applicable to additional charges.",
    },
    {
      question: "Is breakfast included in the price?",
      answer:
        "It mentioned your room plan. Also, you can choose from the Rate Plan and the 'CP' plan for complimentary breakfast.",
    },
    {
      question: "What is the check-in and checkout time?",
      answer:
        "Check-in time is 12 PM and check.out time is 11 AM the next day.",
    },
    {
      question: "Is there an elevator?",
      answer:
        "The elevator is available in all hotels except “Hotel Jai Balaji.”",
    },
    {
      question: "Is it a private room and washroom?",
      answer: "Yes, your room is a private room with a personal washroom.",
    },
    {
      question: "Is the hotel safe for couples?",
      answer: "Yes, it's safe for couples.",
    },
    {
      question: "Is Air conditioning available in the Hotel Room?",
      answer:
        "Yes, all our rooms are equipped with air conditioning, which is also mentioned in the Hotel Room details.",
    },
    {
      question: "Where can I find the Contact Details of the Hotel?",
      answer:
        "The Mobile Number and location of the hotels are listed on the contact us page of staybook.in or in the hotels description. They will also be shared after you have made the reservation in the confirmation email.",
    },
    {
      question: "Where can I find the directions and address of the hotel?",
      answer:
        "Below the Hotels picture is a logo of the map icon, where you can get the address with the details of all significant surrounding areas nearby.",
    },
    {
      question: "What are the documents required at check-in time?",
      answer:
        " All Indian nationals are needed to validate their govt. Approved photo ID proofs like Aadhar cards, Passports, Driving Licenses, Voter ID Cards, Pan cards, etc., and Foreign nationals must present their Passport &; valid Visas.",
    },

    {
      question: "Does the hotel need a deposit or a payment in advance?",
      answer:
        "Yes, The hotel requires a deposit, which will be mentioned on the overview page of the hotel that would be deducted from the total pending amount at the time of checkout.",
    },
    {
      question: "How do I know that my reservation is confirmed?",
      answer:
        "When you have completed the steps of the reservation process after showing the confirmation page, you will get the mail and Whatsapp message from the hotel with all the necessary information, such as the hotel contact number required during check-in.",
    },
    {
      question:
        "I booked a hotel but am still waiting to receive a confirmation by email or message. What do I have to do?",
      answer:
        "After completing the booking process, you'll receive a confirmation e-mail only if you have entered the correct email ID. Also, you can contact the hotel reception and ask the managers for details.",
    },
    {
      question: "Can I Book a Hotel for Day Use?",
      answer:
        "Yes, you can, its for only 5 hrs. It means that you have to stay in the room for 5 hrs. After that, you have to check out the room. We have many slots, but you need to confirm first.",
    },
    {
      question: "How can I request an Early Check In or Late Check-Out Time?",
      answer:
        "We advise you first to contact the Hotel. Then you can confirm with the hotel for early check-in and checkout, which would incur some extra charge.",
    },
    {
      question:
        "I will be arriving late in the evening at the hotel. Can I still Check-in?",
      answer:
        "You will find the check-in time on the hotel policies. The hotel is open 24 hours. You can check in anytime after 12 PM on your booking date.",
    },
    {
      question: "The hotel offers a shuttle service, and how can I book it?",
      answer:
        "Yes, the hotel provides a shuttle service, but on a chargeable basis; Please contact the hotel directly to arrange it only after your reservation is confirmed.",
    },
    {
      question: "Are Visitors allowed in the room?",
      answer:
        "No, visitors are not allowed, but visitors can meet the guest at familiar places included the reception.",
    },
    {
      question: "Are taxes included in the room rates?",
      answer:
        "12% extra taxes are applicable on all hotel room rent. Room Rates exclude all taxes.",
    },
    {
      question: "Do you accept unmarried couples with a local id?",
      answer:
        "Yes, unmarried couples are allowed with local IDs for specific hotels, please contact the hotel before making your reservation.",
    },
    {
      question: "Is hot water provided to the customer in their room?",
      answer:
        "Yes, a boiler or geyser is available in each room, providing continuous hot water for customers during their stay in the hotel.",
    },

    {
      question: "Will you provide the contact number of the hotel?",
      answer:
        "The Mobile Number and location of hotels are listed on the contact-us page of staybook.in, or in the hotel's description. They will also be shared after you have made the reservation in the confirmation email.",
    },

    {
      question: "Does the hotel have parking facilities?",
      answer:
        "Yes, we have, but please inform the hotel about your car before your arrival so they can arrange a proper space for your vehicle before your arrival.",
    },
    {
      question:
        "I will be arriving late in the evening at the hotels in delhi. Can I still check-in?",
      answer:
        "Yes, you can check in anytime after 12 PM. All major hotels have a check-in time of 12 PM and a check-out time of 11 AM the next day.",
    },
    {
      question: "How can I cancel or change my booking?",
      answer:
        "You can cancel your reservation or send us a request for a modification by clicking on the link at the bottom of your confirmation email.",
    },
    {
      question: "How far is Hotel from the New Delhi railway station?",
      answer:
        "It's 10 minutes away only. The hotel is near the New Delhi railway station.",
    },
    {
      question: "How can I get to the airport?",
      answer:
        "You can take the Metro or Cabs from the airport or ask for an airport transfer from the hotel itself, but you need to update the hotel for your arrival time and flight details.",
    },
    {
      question: "Do you provide airport pickup and drop service?",
      answer: "Yes, we provide airport pickup facilities.",
    },
    {
      question: "Does the staybook have a restaurant?",
      answer:
        "Yes, we have our restaurant, where you can enjoy all the major meals from different cuisines that we offer.",
    },
    {
      question: "Do I pay a cancellation fee?",
      answer:
        "We will never charge you a cancellation fee if you cancel before your free booking period, which you can find in the cancellation policies.",
    },
  ];

  return (
    <div className="container mx-auto h-full py-7 p-4 md:px-10 xl:px-0">
      <h2 className="text-secondary text-2xl md:text-3xl lg:text-4xl font-bold tracking-wide font-dream">
        Hotel Booking FAQs
      </h2>
      <div className="relative py-1 w-full gap-4">
        {FAQs.map((faq: any, index: number) => (
          <FaqCard key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
}
