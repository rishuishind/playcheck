import { test } from "@playwright/test";

test("Booking Via Region T1", async ({ page }) => {
  test.setTimeout(60000);
  await page.goto("http://localhost:3000/");
  await page.getByRole("link", { name: "delhi_image New Delhi Where" }).click();
  const page1Promise = page.waitForEvent("popup");
  await page.getByRole("link", { name: "Karol Bagh", exact: true }).click();
  const page1 = await page1Promise;
  await page1.goto("http://localhost:3000/hotels-in-new-delhi/karol-bagh");
  const page2Promise = page1.waitForEvent("popup");
  await page1
    .getByText("Staybook Hotel AiraPaharganj, New Delhi4.6 / 5587 Ratings")
    .click();
  const page2 = await page2Promise;
  await page2.goto("http://localhost:3000/hotels/staybook-aira-xing-new-delhi");
  await page2.getByPlaceholder("Checkin Date").click();
  await page2.getByRole("button", { name: "Next month" }).dblclick();
  await page2.getByRole("button", { name: "17" }).first().click();
  await page2.getByRole("button", { name: "20" }).first().click();
  await page2
    .locator("div")
    .filter({ hasText: /^2$/ })
    .getByRole("button")
    .first()
    .click();
  await page2
    .locator("div")
    .filter({ hasText: /^0$/ })
    .getByRole("button")
    .nth(1)
    .click();
  await page2
    .locator("div")
    .filter({ hasText: /^Children1$/ })
    .getByRole("button")
    .nth(1)
    .dblclick();
  await page2.getByRole("combobox").first().selectOption("7");
  await page2.getByRole("combobox").nth(1).selectOption("4");
  await page2.getByRole("combobox").nth(2).selectOption("2");
  await page2.getByRole("button", { name: "Proceed" }).click();
  await page2.goto(
    "http://localhost:3000/hotels/staybook-aira-xing-new-delhi/rooms?checkin=17-11-2024&checkout=20-11-2024&num_nights=3&num_guests=3&num_adults=1&num_rooms=1&num_children=2&child_age=0_7&child_age=1_4"
  );
  await page2.getByRole("button", { name: "Book Now" }).click();
  await page2.getByPlaceholder("Enter your first name").click();
  await page2.getByPlaceholder("Enter your first name").fill("Rishabh");
  await page2.getByPlaceholder("Enter your first name").press("Tab");
  await page2
    .getByPlaceholder("Enter your last name")
    .fill("Testing_Playwright_RegionPage");
  await page2.getByPlaceholder("Enter your last name").press("Tab");
  await page2.getByPlaceholder("Enter your email").fill("hespnod45@gmail.com");
  await page2.getByPlaceholder("Enter your email").press("Tab");
  await page2.getByPlaceholder("1 (702) 123-").fill("+91 92050-97674");
  await page2
    .getByRole("button", { name: "Proceed To Payment Options" })
    .click();
  await page2.getByText("Pay at Hotel₹").click();
  await page2.getByRole("button", { name: "Proceed to pay at Hotel" }).click();
  await page2.goto(
    "http://localhost:3000/bookingInformation/0jfrtksy3utz4kvnrekn?booking_status=Booking+Successful&hotel_Id=staybook-aira-xing-new-delhi&hotel_Name=Staybook+Hotel+Aira&user_Name=Rishabh+Testing_Playwright_RegionPage&user_Email=hespnod45%40gmail.com&user_Phone=919205097674&booking_receipt=HlJzrRr5J"
  );
});
