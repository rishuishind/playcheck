import { test } from "@playwright/test";

test("Booking Via Region Page Test", async ({ page, context }) => {
  test.setTimeout(60000);
  await page.goto("http://localhost:3000/");
  await page.getByRole("link", { name: "delhi_image New Delhi Where" }).click();
  await page.getByPlaceholder("New Delhi").click();
  await page.getByPlaceholder("New Delhi").fill("Karol Bagh");
  await page.getByText("Karol BaghRegion").click();
  await page.getByRole("button", { name: "CHECKIN Select Date Range" }).click();
  await page.getByRole("button", { name: "Next month" }).click();
  await page.getByRole("button", { name: "Next month" }).click();
  await page.getByRole("button", { name: "17" }).first().click();
  await page.getByRole("button", { name: "20" }).first().click();
  await page
    .locator("div")
    .filter({ hasText: /^2$/ })
    .getByRole("button")
    .first()
    .click();
  await page
    .locator("div")
    .filter({ hasText: /^0$/ })
    .getByRole("button")
    .nth(1)
    .click();
  await page
    .locator("div")
    .filter({ hasText: /^Children1$/ })
    .getByRole("button")
    .nth(1)
    .dblclick();
  await page.getByRole("combobox").first().selectOption("5");
  await page.getByRole("combobox").nth(1).selectOption("8");
  await page.getByRole("combobox").nth(2).selectOption("7");
  await page.getByRole("button", { name: "Proceed" }).click();
  // Function to scroll incrementally until the target hotel is visible
  async function scrollIncrementallyUntilHotelVisible() {
    let isVisible = false;
    while (!isVisible) {
      // Check if the hotel is now visible
      isVisible = await page
        .locator(
          "text=Staybook Hotel AiraPaharganj, New Delhi4.6 / 5587 Ratings",
        )
        .isVisible();

      if (isVisible) break; // Break the loop if the hotel is found

      // Scroll down by a small amount (incrementally)
      await page.evaluate(() => {
        window.scrollBy(0, window.innerHeight); // Scroll full window height
      });

      // Wait for new content to load after scrolling
      await page.waitForTimeout(1000); // Adjust based on loading speed
    }
  }
  await scrollIncrementallyUntilHotelVisible();

  const [page1] = await Promise.all([
    context.waitForEvent("page"), // Wait for a new tab to open
    page
      .locator("text=Staybook Hotel AiraPaharganj, New Delhi4.6 / 5587 Ratings")
      .click(), // Click on the hotel
  ]);

  await page1.goto(
    "http://localhost:3000/hotels/staybook-aira-xing-new-delhi/rooms?checkin=17-11-2024&checkout=20-11-2024&num_nights=3&num_guests=2&num_adults=1&num_rooms=1&num_children=2&child_age=0_5&child_age=1_8&webpage=true",
  );
  await page1.getByRole("button", { name: "Book Now" }).click();
  await page1.getByPlaceholder("Enter your first name").click();
  await page1.getByPlaceholder("Enter your first name").fill("Rishabh");
  await page1.getByPlaceholder("Enter your first name").press("Tab");
  await page1
    .getByPlaceholder("Enter your last name")
    .fill("Testing_Playwright_Region");
  await page1.getByPlaceholder("Enter your last name").press("Tab");
  await page1.getByPlaceholder("Enter your email").fill("hespnod45@gmail.com");
  await page1.getByPlaceholder("Enter your email").press("Tab");
  await page1.getByPlaceholder("1 (702) 123-").fill("+91 92050-97674");
  await page1
    .getByRole("button", { name: "Proceed To Payment Options" })
    .click();
  await page1.getByText("Pay at Hotel₹").click();
  await page1.getByRole("button", { name: "Proceed to pay at Hotel" }).click();
  await page1.goto(
    "http://localhost:3000/bookingInformation/w2x570f9a875y3hg31jb?booking_status=Booking+Successful&hotel_Id=staybook-aira-xing-new-delhi&hotel_Name=Staybook+Hotel+Aira&user_Name=Rishabh+Testing_Playwright_Region&user_Email=hespnod45%40gmail.com&user_Phone=919205097674&booking_receipt=lHk3OlIFU",
  );
});
