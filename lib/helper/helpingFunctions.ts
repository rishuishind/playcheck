export function getRandomItems<T>(array: T[], maxItems: number): T[] {
  // Shuffle the array
  const shuffled = array.slice().sort(() => Math.random() - 0.5);
  // Return the first maxItems elements
  return shuffled.slice(0, maxItems);
}

export function capitalizeWords(str: string): string {
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
