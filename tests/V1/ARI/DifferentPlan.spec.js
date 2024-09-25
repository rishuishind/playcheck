import { test, expect } from "@playwright/test";

test("Different Plan Test", async ({ page }) => {
  test.setTimeout(60000);
  await page.goto(
    "http://localhost:3000/hotels/staybook-aira-xing-new-delhi/rooms?checkin=17-11-2024&checkout=20-11-2024&num_nights=3&num_guests=3&num_adults=1&num_rooms=1&num_children=2&child_age=0_8&child_age=1_4",
  );
  await page.locator("#booking-card svg").click();
  await page.getByRole("button", { name: "Add Room down" }).first().click();
  await page.getByRole("button", { name: "2", exact: true }).click();
  await page.getByRole("button", { name: "2", exact: true }).click();
  await page
    .locator("div")
    .filter({ hasText: /^Deluxe Double Room\(EP Plan\)$/ })
    .locator("svg")
    .click();
  await page.getByText("Deluxe Family Room", { exact: true }).click();
  await page.getByRole("button", { name: "Add Room down" }).nth(3).click();
  await page.getByRole("button", { name: "Add Room", exact: true }).click();
  await page.getByRole("button", { name: "Book Now" }).click();
  await page.getByPlaceholder("Enter your first name").click();
  await page.getByPlaceholder("Enter your first name").fill("Rishabh");
  await page.getByPlaceholder("Enter your first name").press("Tab");
  await page
    .getByPlaceholder("Enter your last name")
    .fill("Testing_Playwright_Dif_Plan");
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
