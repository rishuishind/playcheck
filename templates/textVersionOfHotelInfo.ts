export function DataToText(data) {
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
            <h1>The Deep Hotel</h1>
          <div>
            <p>Govind Nagar, Kanpur</p>
            <div><span>⭐</span><span>⭐</span><span>⭐</span></div>
          </div>
          <a href="/hotels/staybook-the-deep-hotel-kanpur-nagar#location">
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
            <a href="/hotels/staybook-the-deep-hotel-kanpur-nagar#hotel-info">
              Hotel Info
            </a>
            <a href="/hotels/staybook-the-deep-hotel-kanpur-nagar#room-plans">
              Room Plans
            </a>
            <a href="/hotels/staybook-the-deep-hotel-kanpur-nagar#reviews">
              Reviews
            </a>
            <a href="/hotels/staybook-the-deep-hotel-kanpur-nagar#amenities">
              Amenities
            </a>
            <a
              href="/hotels/staybook-the-deep-hotel-kanpur-nagar#nearby-places">
              Nearby Places
            </a>
            <a href="/hotels/staybook-the-deep-hotel-kanpur-nagar#faqs">
              FAQs
            </a>
            <a href="/hotels/staybook-the-deep-hotel-kanpur-nagar#hotel-policies">
              Hotel Policies
            </a>
          </div>

          <div>
              <div id="hotel-info">
                  <h2>About Hotel</h2>
                  <div>
                      With a boosting terrace The Deep Hotel is conveniently located
                      from the Kanpur Nagar.The accommodation is located 15.3 Kms from
                      the Kanpur Airport (KNU), 18.8 Kms from the Kanpur Airport
                      (KNU), 7.5 Kms from the Z Square Mall, 4.1 Kms from the Regency
                      Hospital Limited, 7.9 Kms from the Govt. Polytechnic, 3.6 Kms
                      from the JK Temple.<br /><br />The hotel in Kanpur Nagar
                      provides the Nearby Spa Centre, Clean Linen, Pet Allowed,
                      Non-Smoking Area, Wake-up Service, Flat-Screen TV, Family Room,
                      Daily Newspaper, In-Room Safe, also the hotel offers currency
                      exchange and the ATM services are available 24x7 at the property
                      for the guests.<br /><br />Guests can have lunch, breakfast, and
                      dinner at the rooftop cafe with multiple options of Indian,
                      Chinese, Mediterranean, Italian, and American food at the
                      restaurant vegan options are also available and people can opt
                      for halal is also available at the on request.<br /><br />The
                      property also provides paid airport pick and drop facilities,
                      the nearest airport is Kanpur Airport (KNU) 15.3 Km and the
                      distance is 15.3 Kms from the property.Kanpur Central is the
                      closest railway station from the The Deep Hotel, couples
                      particularly like the location.<br /><br />Explore The Deep
                      Hotel Kanpur Nagar Hotel Reviews and The Deep Hotel Uttar
                      Pradesh Maps for a better understanding of the area. For
                      inquiries and reservations, please contact The Deep Hotel
                      Contact Number. Find The Deep Hotel Kanpur Nagar Address for
                      directions. To book your stay, visit The Deep Hotel Kanpur Nagar
                      Booking or simply book The Deep Hotel in Kanpur Nagar.
                  </div>
              </div>
          
              <div id="room-plans">
                <h2>Room Details</h2>

                //////////////////map the rooms list here
                <div>
                  <div>
                    <div>
                      <h2>Classic Room</h2>
                      <div>
                        <p>Twin Bed</p>
                        <p>2 guests / room</p>
                      </div>
                      <div>
                        <div>
                          <p>Room Details</p>
                          <div>
                            <p>• Max Guest - <span>4</span></p>
                            <p>• Max Child - <span>1</span></p>
                          </div>
                        </div>
                        <div>
                          <p>Charges (If Added)</p>
                          <div>
                            <p>
                              • Extra Adult -
                              <span>₹1200</span>
                            </p>
                            <p>
                              • Per Child -
                              <span>₹500</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <a
                        href="/hotels/staybook-the-deep-hotel-kanpur-nagar#selection-card"
                      >
                        Show Price
                      </a>
                      <button>Show Price</button>
                    </div>
                  </div>
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
                    /////////////////////// map the reviews
                    <div>
                      <div>
                        <div>
                          <h3>Srimoyee Mukherjee</h3>
                          <p><span>5/5</span>Google</p>
                        </div>
                      </div>
                      <div>
                        <p>
                          Very good... well behaved staffs and helpful as well
                          Rooms:5 Service:5 Location:5
                        </p>
                      </div>
                      <div>
                        <p>- 10 months ago on Google</p>
                      </div>
                    </div>
                  </div>
                </div>
                <button>Show all reviews</button>
              </div>

              <div id="amenities" class="navLink">
                <h2>Hotel Amenities</h2>
                <div>
                /////////////////////// map the amenities list here
                  <div>
                    <div></div>
                    <h3>Nearby Spa Centre</h3>
                  </div>
                </div>
              </div>

              <div id="nearby-places">
                <h2>Best Places to Visit Nearby</h2>
                <div>
                /////////////////////// map the nearby places list here
                  <a
                    target="_blank"
                    title="map"
                    href="https://maps.app.goo.gl/aVjuMoNJrfiuRzts6"
                  >
                    <div
                      class="my-0.5 flex items-start gap-1 py-2 text-sm font-medium lg:text-base"
                    >
                      <span>•</span>
                      <h3>
                        <p>Kanpur Airport (KNU)</p>
                        <p>(15.3 Km)</p>
                      </h3>
                    </div>
                  </a>
                </div>
              </div>

              <div id="faqs" class="navLink">
                <h2>FAQs</h2>
                <div>
                  <div>
                    <h3>
                      Q. What types of rooms are available at The Deep Hotel?
                    </h3>
                    <h4>
                      Ans. The Deep Hotel offers an array of room options,
                      including . For detailed information and to check
                      availability, please visit our website.
                    </h4>
                  </div>
                </div>
              </div>

              <div id="hotel-policies" class="navLink">
                <h2>Privacy Policies</h2>
                <div>
                  ///////////////////////////// dangerously eliment
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
            <button>Other Cities</button>
            <p class="text-md my-4 hidden font-semibold lg:block">
              Other Cities
            </p>
            <div>
              <a title="Thrissur" href="/hotels-in-thrissur">
                Hotels in Thrissur
              </a>
            </div>
          </div>

          <div>
            <button>Other Hotels in City</button>
            <p>Other Hotels in City</p>
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

  return textContent;
}
