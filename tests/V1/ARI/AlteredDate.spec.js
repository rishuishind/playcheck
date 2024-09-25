import { test } from '@playwright/test';

test('test', async ({ page }) => {
  test.setTimeout(60000);
  await page.goto('http://localhost:3000/hotels/staybook-aira-xing-new-delhi/rooms?checkin=17-11-2024&checkout=20-11-2024&num_nights=3&num_guests=2&num_adults=2&num_rooms=1&num_children=0');
  await page.getByRole('button', { name: 'CHECKIN - CHECKOUT Nov 17,' }).click();
  await page.getByRole('button', { name: '24' }).nth(1).click();
  await page.getByRole('button', { name: '27' }).first().click();
  await page.locator('div').filter({ hasText: /^2$/ }).getByRole('button').first().click();
  await page.locator('div').filter({ hasText: /^0$/ }).getByRole('button').nth(1).click();
  await page.getByRole('combobox').selectOption('6');
  await page.locator('div').filter({ hasText: /^Children1$/ }).getByRole('button').nth(1).click();
  await page.getByRole('combobox').nth(1).selectOption('3');
  await page.getByRole('button', { name: 'Proceed' }).click();
  await page.goto('http://localhost:3000/hotels/staybook-aira-xing-new-delhi/rooms?checkin=24-11-2024&checkout=27-11-2024&num_nights=3&num_guests=3&num_adults=1&num_rooms=1&num_children=2&child_age=0_6&child_age=1_3');
  await page.getByRole('button', { name: 'Book Now' }).click();
  await page.getByPlaceholder('Enter your first name').click();
  await page.getByPlaceholder('Enter your first name').fill('Rishabh');
  await page.getByPlaceholder('Enter your first name').press('Tab');
  await page.getByPlaceholder('Enter your last name').fill('Testing_ARI');
  await page.getByPlaceholder('Enter your last name').press('Tab');
  await page.getByPlaceholder('Enter your email').fill('hespnod45@gmail.com');
  await page.getByPlaceholder('Enter your email').press('Tab');
  await page.getByPlaceholder('1 (702) 123-').fill('+91 92050-97674');
  await page.getByRole('button', { name: 'Proceed To Payment Options' }).click();
  await page.getByText('Pay at Hotel₹').click();
  await page.getByRole('button', { name: 'Proceed to pay at Hotel' }).click();
  await page.goto('http://localhost:3000/bookingInformation/z7mcbrcbv3i8udss05ut?booking_status=Booking+Successful&hotel_Id=staybook-aira-xing-new-delhi&hotel_Name=Staybook+Hotel+Aira&user_Name=Rishabh+Testing_ARI&user_Email=hespnod45%40gmail.com&user_Phone=919205097674&booking_receipt=cwQYa4qsg');
});