import { fetchHotelInfoAllPageHandler } from "@/lib/firebase/hotelHandler";
import { hotelPaths } from "@/data";

export default async function handler(req: any, res: any) {
  const { hotelSlug } = req.body;

  if (req.method === "POST") {
    const hotelData = await fetchHotelInfoAllPageHandler(hotelSlug);

    // function to generat hotel stars
    function generateStarsMarkup() {
      return [...Array(hotelData.hotel_Star_Rating)]
        .map(
          (_, idx) =>
            `
          <span>⭐</span>
        `,
        )
        .join("");
    }

    // function to add the hotel Rooom markup
    function generateRoomsMarkup() {
      if (hotelData.hotel_Rooms_List) {
        return hotelData.hotel_Rooms_List
          .map(
            (room) =>
              `
          <div>
            <div>
              <h2>${room.hotelRoom_Type}</h2>
              <div>
                <p>${room.hotelRoom_Info}</p>
                <p>${room.hotelRoom_Guest_Count} guests / room</p>
              </div>
              <div>
                <div>
                  <p>Room Details</p>
                  <div>
                    <p>• Max Guest - <span>${room.hotelRoom_Max_Guest_Occupancy}</span></p>
                    <p>• Max Child - <span>${room.hotelRoom_Max_Children_Occupancy}</span></p>
                  </div>
                </div>
                <div>
                  <p>Charges (If Added)</p>
                  <div>
                    <p>
                      • Extra Adult -
                      <span>&#8377;${room.hotelRoom_Guest_Price}</span>
                    </p>
                    <p>
                      • Per Child -
                      <span>&#8377;${room.hotelRoom_Children_Price}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <a href="/hotels/${hotelData.hotel_Slug_Name}#selection-card">
                Show Price
              </a>
              <button>Show Price</button>
            </div>
          </div>
          `,
          )
          .join("");
      }
    }

    // function to generate the reviews markup
    function generateReviewsMarkup() {
      if (hotelData.hotel_Review_List) {
        return hotelData.hotel_Google_Reviews_List
          .map(
            (review) =>
              `
            <div>
              <div>
                <p>${review.user_name}</p>
                <p>${review.user_rating}</p>
                <p>${review.review_type_name}</p>
              </div>
              <div>
                <p>${review.user_comment}</p>
                <p>${review.review_posting_time}</p>
              </div>
            </div>
            `,
          )
          .join("");
      }
    }

    // function to generate amenities markup
    function generataAmenitiesMarkup() {
      if (hotelData.hotel_Available_Amenities_List) {
        return hotelData.hotel_Available_Amenities_List
          .map(
            (amenity) =>
              `
            <div>
              <div></div>
              <h3>${amenity.amenity_Name}</h3>
            </div>
            `,
          )
          .join("");
      }
    }

    // funtion to generate nearby places markup
    function generateNearbyPlacesMarkup() {
      if (hotelData.hotel_Nearby_Places_List) {
        return hotelData.hotel_Nearby_Places_List
          .map(
            (place) =>
              `
            <a
              target="_blank"
              title="place url"
              href="${place.place_Map_Url}"
            >
              <div>
                <span>•</span>
                <h3>
                  <p>${place.place_Name}</p>
                </h3>
              </div>
            </a>
            `,
          )
          .join("");
      }
    }

    // function to generate FAQ markup
    function generateFaqMarkup() {
      if (hotelData.hotel_FAQ_Schema_List) {
        return hotelData.hotel_FAQ_Schema_List
          .map(
            (faq) =>
              `
            <div>
              <h3>Q. ${faq.name}</h3>
              <h4>Ans. ${faq.acceptedAnswer.text}</h4>
            </div>
            `,
          )
          .join("");
      }
    }

    let textContent = `
      <!doctype html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
      </head>
      <body>
        <header id="NavBar">
          <div>
            <div>
                <p>Staybook</p>
            </div>
            <nav>
              <div></div>
              <button>
                <span>Menu</span>
              </button>
              <a title="home page link" href="/">
                <strong>Home</strong>
              </a>
              <a title="/hotels page link" href="/hotels">
                <strong>Hotels</strong>
              </a>
              <a title="/indian-e-visa page link" href="/indian-e-visa">
                <strong>eVisa</strong>
              </a>
            </nav>
          </div>
        </header>

        <section>
          <div>
            <div>
              <h1>${hotelData.hotel_Name}</h1>
            <div>
              <p>${hotelData.hotel_Landmark}</p>
              <div>${generateStarsMarkup()}</div>
            </div>
            <a href="/hotels/${hotelData.hotel_Slug_Name}#location">
              <p>4.1 / 5</p>
              <p>566 Ratings</p>
            </a>
            </div>
            <div>
              <button>Show More</button>
            </div>
          </div>

          <div id="selection-card">
            <div>
              <div>
                <div>
                  <label for="checkin"> Select chekin date </label>
                  <input
                    type="text"
                    readonly=""
                    placeholder="Select Checkin"
                    value=""
                  />
                </div>
                <div>
                  <label for="checkout"> Select checkout date </label>
                  <input
                    type="text"
                    readonly=""
                    placeholder="Select Checkout"
                    value=""
                  />
                </div>
                <div>
                  <label for="guests"> Select guests </label>
                  <input
                    name="guests"
                    type="text"
                    readonly=""
                    placeholder="Select Guests"
                    value="2 Adults, 0 child, 1 room"
                  />
                </div>
                <button>Show Prices</button>
              </div>
              <div>
                <div></div>
                <p>Lowest Price Guarantee</p>
              </div>
              <div>
                <div></div>
                <p>Your details are secured with us</p>
              </div>
            </div>
          </div>

          <div>
            <p>Choose dates to see prices</p>
            <div>
              <div>
                <div>
                  <div>
                    <p>Check-in</p>
                  </div>
                  <p>Select date</p>
                </div>
                <div>
                  <div>
                    <p>Check-out</p>
                  </div>
                  <p>Select date</p>
                </div>
              </div>
              <div>
                <div>
                  <div>
                    <p>Adults</p>
                  </div>
                  <p>2 Adults</p>
                </div>
                <div>
                  <div>
                    <p>Child</p>
                  </div>
                  <p>0 Child</p>
                </div>
                <div>
                  <div>
                    <p>Rooms</p>
                  </div>
                  <p>1 Room</p>
                </div>
              </div>
              <button>Check Availability</button>
            </div>
          </div>

          <div>
            <div>
              <a href="/hotels/${hotelData.hotel_Slug_Name}#hotel-info">
                Hotel Info
              </a>
              <a href="/hotels/${hotelData.hotel_Slug_Name}#room-plans">
                Room Plans
              </a>
              <a href="/hotels/${hotelData.hotel_Slug_Name}#reviews">
                Reviews
              </a>
              <a href="/hotels/${hotelData.hotel_Slug_Name}#amenities">
                Amenities
              </a>
              <a
                href="/hotels/${hotelData.hotel_Slug_Name}#nearby-places">
                Nearby Places
              </a>
              <a href="/hotels/${hotelData.hotel_Slug_Name}#faqs">
                FAQs
              </a>
              <a href="/hotels/${hotelData.hotel_Slug_Name}#hotel-policies">
                Hotel Policies
              </a>
            </div>

            <div>
              <div id="hotel-info">
                <h2>About Hotel</h2>
                <div>
                  ${hotelData.hotel_Description}
                </div>
              </div>
            
              <div id="room-plans">
                <h2>Room Details</h2>
                <div>
                  ${generateRoomsMarkup()}
                </div>
              </div>

              <div id="reviews" class="navLink">
                <h2>Reviews / Ratings</h2>
                <div>
                  <div>
                    <div>
                      <div>
                        <p>4.1/5</p>
                        <p>566 Ratings</p>
                      </div>
                      <div>
                        <div>
                          <p>5</p>
                          <div>
                            <div></div>
                          </div>
                          <p>293</p>
                        </div>
                        <div>
                          <p>4</p>
                          <div>
                            <div></div>
                          </div>
                          <p>145</p>
                        </div>
                        <div>
                          <p>3</p>
                          <div>
                            <div></div>
                          </div>
                          <p>56</p>
                        </div>
                        <div>
                          <p>2</p>
                          <div>
                            <div></div>
                          </div>
                          <p>23</p>
                        </div>
                        <div>
                          <p>1</p>
                          <div>
                            <div></div>
                          </div>
                          <p>49</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div>
                        <div>
                          <p>Room</p>
                        </div>
                        <div>
                          <p>Service</p>
                        </div>
                        <div>
                          <p>Location</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    ${generateReviewsMarkup()}
                  </div>
                </div>
                <button>Show all reviews</button>
              </div>

              <div id="amenities">
                <h2>Hotel Amenities</h2>
                <div>
                  ${generataAmenitiesMarkup()}
                </div>
              </div>

              <div id="nearby-places">
                <h2>Best Places to Visit Nearby</h2>
                <div>
                  ${generateNearbyPlacesMarkup()}
                </div>
              </div>

              <div id="faqs">
                <h2>FAQs</h2>
                <div>
                  ${generateFaqMarkup()}
                </div>
              </div>

              <div id="hotel-policies">
                <h2>Privacy Policies</h2>
                <div>
                  ${hotelData.hotel_General_Policy.description}
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer>
          <div>
            <div>
              <a title="home page link" href="/"><span>Staybook</span></a>
              <div>
                <p>Company</p>
                <div>
                  <a title="faq link" href="/faq">FAQ</a>
                </div>
                <div>
                  <a title="aboutus link" href="/aboutus">About Us</a>
                </div>
                <div>
                  <a title="contactus link" href="/contactUs">Contact Us</a>
                </div>
              </div>
              <div class="p-4">
                <p>Support</p>
                <div>
                  <a title="privacy policy link" href="/privacypolicy">
                    Privacy Policy
                  </a>
                </div>
                <div>
                  <a title="refund policy link" href="/refundpolicy">
                    Refund Policy
                  </a>
                </div>
                <div>
                  <a title="pancellation policy link" href="/cancellationpolicy">
                    Cancellation Policy
                  </a>
                </div>
                <div>
                  <a title="terms and conditions link" href="/termscondition">
                    Terms and Conditions
                  </a>
                </div>
              </div>
              <div>
                <p>Social</p>
                <div>
                  <div>
                    <a
                      target="_blank"
                      title="facebook link"
                      href="https://www.facebook.com/budgetfriendlyhotel?paipv=0&amp;eav=AfZ-waWz6OajACPaAqHeTptaNS9Rt4i4iwbdVK0jE5KwoQfbZ6GsLkTVHLjTpMMeyxk"
                    >
                      Facebook
                    </a>
                  </div>
                  <div>
                    <a
                      target="_blank"
                      title="instagram link"
                      href="https://www.instagram.com/staybook_1/"
                    >
                      Instagram
                    </a>
                  </div>
                  <div>
                    <a
                      target="_blank"
                      title="twitter link"
                      href="https://twitter.com/Staybook_exp"
                    >
                      Twitter
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <button>Available Cities</button>
              <p class="text-md my-4 hidden font-semibold lg:block">
                Available Cities
              </p>
              <div>
                <a title="Thrissur" href="/hotels-in-thrissur">
                  Hotels in Thrissur
                </a>
              </div>
            </div>

            <div>
              <button>Popular Hotels in City</button>
              <p>Popular Hotels in City</p>
              <div>
                <a
                  title="Staybook Dng The Grand Hotel Kanpur Nagar"
                  href="/hotels/staybook-dng-the-grand-hotel-kanpur-nagar"
                >
                  Staybook Dng The Grand Hotel Kanpur Nagar
                </a>
              </div>
            </div>

            <div class="lg:my-12 lg:py-5">
              <button
                class="text-md my-4 w-full text-left font-semibold lg:hidden"
              >
                Trending Hotels Near You
              </button>
              <p class="text-md my-4 hidden font-semibold lg:block">
                Trending Hotels Near You
              </p>
              <div>
                <a
                  title="Staybook Hotel Mandakini Lush Kanpur Nagar"
                  href="/hotels/staybook-hotel-mandakini-lush-kanpur-nagar"
                >
                  Staybook Hotel Mandakini Lush Kanpur Nagar
                </a>
              </div>
            </div>
          </div>

          <div class="p-4">
            <p class="text-center text-xs tracking-wide text-white/60">
              Copyright © 2023 Staybook<sup>™</sup>, All right reserved.
            </p>
          </div>
        </footer>
      </body>
      </html>
    `;

    return res.send(textContent);
  }
}
