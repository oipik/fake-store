export function getRandomDate() {
  const today = new Date();
  const startDate = new Date();
  startDate.setDate(today.getDate() - 10);

  const randomTime = startDate.getTime() + Math.random() * (today.getTime() - startDate.getTime());
  const randomDate = new Date(randomTime);

  const day = String(randomDate.getDate()).padStart(2, '0');
  const month = String(randomDate.getMonth() + 1).padStart(2, '0');
  const year = randomDate.getFullYear();

  return `${day}.${month}.${year}`;
}