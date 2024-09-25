import { test } from "@playwright/test";

test("Children Age Testing with Infinite Scroll and Popup Tab", async ({ page, context }) => {
  test.setTimeout(90000); // Extend the test timeout to 90 seconds for better coverage

  // Go to the homepage
  await page.goto("http://localhost:3000/");

  // Perform search for 'New Delhi'
  await page.getByPlaceholder("Search Hotel / City / Region").click();
  await page.getByPlaceholder("Search Hotel / City / Region").fill("New Delhi");
  await page.getByText("New DelhiCity").click();

  // Select check-in and check-out dates
  await page.getByRole("button", { name: "Next month" }).dblclick();
  await page.getByRole("button", { name: "17" }).first().click();
  await page.getByRole("button", { name: "20" }).first().click();

  // Click to select rooms and guests
  await page.locator(".p-1\\.5 > .flex > button").first().click();
  await page.locator(".grid > div:nth-child(3) > .flex > button:nth-child(3)").dblclick();
  await page.getByRole("combobox").first().selectOption("8");
  await page.getByRole("combobox").nth(1).selectOption("4");
  await page.getByRole("button", { name: "Proceed" }).click();

  // Go to the hotels list page with the appropriate query parameters
  await page.goto(
    "http://localhost:3000/hotels-in-new-delhi?checkin=17-11-2024&checkout=20-11-2024&num_nights=3&num_guests=3&num_adults=1&num_rooms=1&num_children=2&hotelSlugFromSearch=&child_age=0_8&child_age=1_4"
  );

  // Wait for 8 seconds for the hotels to load
  await page.waitForTimeout(9000);

  // Function to scroll incrementally until the target hotel is visible
  async function scrollIncrementallyUntilHotelVisible() {
    let isVisible = false;
    while (!isVisible) {
      // Check if the hotel is now visible
      isVisible = await page
        .locator("text=Staybook Hotel AiraPaharganj, New Delhi4.6 / 5587 Ratings")
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

  // Call the function to scroll incrementally until the hotel is visible
  await scrollIncrementallyUntilHotelVisible();

  // Capture the new popup/tab when clicking the hotel
  const [newTab] = await Promise.all([
    context.waitForEvent('page'), // Wait for a new tab to open
    page.locator("text=Staybook Hotel AiraPaharganj, New Delhi4.6 / 5587 Ratings").click(), // Click on the hotel
  ]);

  // Wait for the new tab to load completely
  await newTab.waitForLoadState('domcontentloaded');

  // Automate actions on the new tab
  await newTab.getByRole("button", { name: "Book Now" }).click();
  await newTab.waitForTimeout(5000);
  await newTab.getByPlaceholder("Enter your first name").click();
  await newTab.getByPlaceholder("Enter your first name").fill("Rishabh");
  await newTab.getByPlaceholder("Enter your first name").press("Tab");
  await newTab.getByPlaceholder("Enter your last name").fill("Testing_Playwright_Children");
  await newTab.getByPlaceholder("Enter your last name").press("Tab");
  await newTab.getByPlaceholder("Enter your email").fill("hespnod45@gmail.com");
  await newTab.getByPlaceholder("Enter your email").press("Tab");
  await newTab.getByPlaceholder("1 (702) 123-").fill("+91 92050-97674");

  // Proceed to payment
  await newTab.getByRole("button", { name: "Proceed To Payment Options" }).click();
  await newTab.getByText("Pay at Hotel₹").click();
  await newTab.getByRole("button", { name: "Proceed to pay at Hotel" }).click();
});
