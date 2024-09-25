import { test } from "@playwright/test";

test("ARI - Staybook T1", async ({ page }) => {
  test.setTimeout(60000);
  await page.goto(
    "http://localhost:3000/hotels/staybook-aira-xing-new-delhi/rooms?checkin=17-11-2024&checkout=21-11-2024&roomId=555e16f34668&planId=273fb714672a&num_nights=4&num_guests=2&num_adults=2&num_children=0&num_rooms=1&user_country=IN&selection_type=hotel&hotel_ad_selection=&room_bundle_ad_selection=",
  );
  await page.getByRole("button", { name: "Book Now" }).click();
  await page.getByRole("button").first().click();
  await page
    .locator("div")
    .filter({ hasText: /^HOTEL INFO$/ })
    .getByRole("button")
    .click();
  await page.getByPlaceholder("Enter your first name").click();
  await page.getByPlaceholder("Enter your first name").fill("Rishabh");
  await page.getByPlaceholder("Enter your first name").press("Tab");
  await page.getByPlaceholder("Enter your last name").fill("AB Testing_ARI");
  await page.getByPlaceholder("Enter your last name").press("Tab");
  await page.getByPlaceholder("Enter your email").fill("hespnod45@gmail.com");
  await page.getByPlaceholder("Enter your email").press("Tab");
  await page.getByPlaceholder("1 (702) 123-").fill("+91 92050-97674");
  await page
    .getByRole("button", { name: "Proceed To Payment Options" })
    .click();
  await page.getByText("Pay at Hotel₹").click();
  await page.getByRole("button", { name: "Proceed to pay at Hotel" }).click();
});
