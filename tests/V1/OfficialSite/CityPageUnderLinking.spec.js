import { test, expect } from "@playwright/test";

test("City Page Test Star and Price", async ({ page }) => {
  test.setTimeout(60000);
  await page.goto("http://localhost:3000/");
  await page.getByRole("link", { name: "delhi_image New Delhi Where" }).click();
  const page1Promise = page.waitForEvent("popup");
  await page.getByRole("link", { name: "Hotels in Karol Bagh" }).click();
  const page1 = await page1Promise;
  const page2Promise = page.waitForEvent("popup");
  await page
    .getByRole("link", { name: "Hotels in new-delhi under 5000" })
    .click();
  const page2 = await page2Promise;
  const page3Promise = page.waitForEvent("popup");
  await page
    .getByRole("link", { name: "Hotels in new-delhi under 2000" })
    .click();
  const page3 = await page3Promise;
  const page4Promise = page.waitForEvent("popup");
  await page
    .getByRole("link", { name: "Hotels in new-delhi under 1000" })
    .click();
  const page4 = await page4Promise;
  const page5Promise = page4.waitForEvent("popup");
  await page4
    .getByText(
      "Staybook Hotel Jai Balaji New Delhi Railway StationPaharganj, New Delhi4.2 /",
    )
    .click();
  const page5 = await page5Promise;
  await page5.getByPlaceholder("Checkin Date").click();
  await page5.getByRole("button", { name: "Next month" }).dblclick();
  await page5.getByRole("button", { name: "17" }).first().click();
  await page5.getByRole("button", { name: "20" }).first().click();
  await page5
    .locator("div")
    .filter({ hasText: /^2$/ })
    .getByRole("button")
    .first()
    .click();
  await page5
    .locator("div")
    .filter({ hasText: /^0$/ })
    .getByRole("button")
    .nth(1)
    .click();
  await page5
    .locator("div")
    .filter({ hasText: /^Children1$/ })
    .getByRole("button")
    .nth(1)
    .dblclick();
  await page5.getByRole("combobox").first().selectOption("5");
  await page5.getByRole("combobox").nth(1).selectOption("4");
  await page5.getByRole("combobox").nth(2).selectOption("5");
  await page5.getByRole("button", { name: "Proceed" }).click();
  await page5.goto(
    "http://localhost:3000/hotels/staybook-hotel-jai-balaji-new-delhi-railway-station-new-delhi/rooms?checkin=17-11-2024&checkout=20-11-2024&num_nights=3&num_guests=3&num_adults=1&num_rooms=1&num_children=2&child_age=0_5&child_age=1_0",
  );
  await page5.getByRole("button", { name: "Book Now" }).click();
  await page5.locator("body").press("Enter");
  await page5.getByPlaceholder("Enter your first name").click();
  await page5.getByPlaceholder("Enter your first name").fill("Rishabh");
  await page5.getByPlaceholder("Enter your first name").press("Tab");
  await page5
    .getByPlaceholder("Enter your last name")
    .fill("Testing_Playwright_UnderLinking");
  await page5.getByPlaceholder("Enter your last name").press("Tab");
  await page5.getByPlaceholder("Enter your email").fill("hespnod45@gmail.com");
  await page5.getByPlaceholder("Enter your email").press("Tab");
  await page5.getByPlaceholder("1 (702) 123-").fill("+91 92050-97674");
  await page5
    .getByRole("button", { name: "Proceed To Payment Options" })
    .click();
  await page5.getByText("Pay at Hotel", { exact: true }).click();
  await page5.getByRole("button", { name: "Proceed to pay at Hotel" }).click();
});
