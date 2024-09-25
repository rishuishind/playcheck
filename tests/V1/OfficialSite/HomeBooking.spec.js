import { test } from '@playwright/test';

test('Root Testing', async ({ page }) => {
  test.setTimeout(60000);
  await page.goto('http://localhost:3000/');
  await page.getByPlaceholder('Search Hotel / City / Region').click();
  await page.getByPlaceholder('Search Hotel / City / Region').fill('New Delhi');
  await page.getByText('New DelhiCity').click();
  await page.getByRole('button', { name: 'Next month' }).click();
  await page.getByRole('button', { name: '17' }).nth(1).click();
  await page.getByRole('button', { name: '21' }).nth(1).click();
  await page.getByRole('button', { name: 'Proceed' }).click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByText('Staybook Hotel Jai Balaji New Delhi Railway StationPaharganj, New Delhi4.2 /').click();
  const page1 = await page1Promise;
  await page1.goto('http://localhost:3000/hotels/staybook-hotel-jai-balaji-new-delhi-railway-station-new-delhi/rooms?checkin=17-11-2024&checkout=21-11-2024&num_nights=4&num_guests=2&num_adults=2&num_rooms=1&num_children=0&child_age=&webpage=true');
  await page1.getByRole('button', { name: 'Book Now' }).click();
  await page1.getByPlaceholder('Enter your first name').click();
  await page1.getByPlaceholder('Enter your first name').fill('Rishabh');
  await page1.getByPlaceholder('Enter your first name').press('Tab');
  await page1.getByPlaceholder('Enter your last name').fill('Testing_Official_Root');
  await page1.getByPlaceholder('Enter your last name').press('Tab');
  await page1.getByPlaceholder('Enter your email').fill('hespnod45@gmail.com');
  await page1.getByPlaceholder('Enter your email').press('Tab');
  await page1.getByPlaceholder('1 (702) 123-').fill('+91 92050-97674');
  await page1.getByRole('button', { name: 'Proceed To Payment Options' }).click();
  await page1.getByText('Pay at Hotel₹').click();
  await page1.getByRole('button', { name: 'Proceed to pay at Hotel' }).click();
});