import { test } from "@playwright/test";

test("Static City Page Filters Test", async ({ page }) => {
  test.setTimeout(60000);
  await page.goto("http://localhost:3000/");
  await page.getByRole("link", { name: "delhi_image New Delhi Where" }).click();
  await page.getByText("4 Star", { exact: true }).click();
  await page.getByText("Upto ₹").click();
  const page1Promise = page.waitForEvent("popup");
  await page
    .getByText("Staybook Hotel AiraPaharganj, New Delhi4.6 / 5587 Ratings")
    .click();
  const page1 = await page1Promise;
  await page1.getByPlaceholder("Checkin Date").click();
  await page1.getByRole("button", { name: "Next month" }).dblclick();
  await page1.getByRole("button", { name: "17" }).first().click();
  await page1.getByRole("button", { name: "20" }).first().click();
  await page1
    .locator("div")
    .filter({ hasText: /^2$/ })
    .getByRole("button")
    .first()
    .click();
  await page1
    .locator("div")
    .filter({ hasText: /^0$/ })
    .getByRole("button")
    .nth(1)
    .click();
  await page1
    .locator("div")
    .filter({ hasText: /^Children1$/ })
    .getByRole("button")
    .nth(1)
    .dblclick();
  await page1.getByRole("combobox").first().selectOption("8");
  await page1.getByRole("combobox").nth(1).selectOption("8");
  await page1.getByRole("combobox").nth(2).selectOption("8");
  await page1.getByRole("button", { name: "Proceed" }).click();
  await page1.goto(
    "http://localhost:3000/hotels/staybook-aira-xing-new-delhi/rooms?checkin=17-11-2024&checkout=20-11-2024&num_nights=3&num_guests=3&num_adults=1&num_rooms=1&num_children=2&child_age=0_8&child_age=1_4",
  );
  await page1.locator(".flex > .h-10").first().click();
  await page1.getByRole("button", { name: "Book Now" }).click();
  await page1.getByPlaceholder("Enter your first name").click();
  await page1.getByPlaceholder("Enter your first name").fill("Rishabh");
  await page1.getByPlaceholder("Enter your first name").press("Tab");
  await page1
    .getByPlaceholder("Enter your last name")
    .fill("Testing_Playwright_Filters_Static");
  await page1.getByPlaceholder("Enter your last name").press("Tab");
  await page1.getByPlaceholder("Enter your email").fill("hespnod45@gmail.com");
  await page1.getByPlaceholder("Enter your email").press("Tab");
  await page1.getByPlaceholder("1 (702) 123-").fill("+91 92050-97674");
  await page1
    .getByRole("button", { name: "Proceed To Payment Options" })
    .click();
  await page1.getByText("Pay at Hotel₹").click();
  await page1.getByRole("button", { name: "Proceed to pay at Hotel" }).click();
});
