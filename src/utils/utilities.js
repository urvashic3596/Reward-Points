//method to calculate reward points
//2 points for every dollar spent over $100 in a transaction
//1 point for every dollar spent between $50 and $100 in a transaction
export const calculateRewardPoints = (price) => {
  let points = 0;
  if (price > 100) points += Math.floor(price - 100) * 2;
  if (price > 50) points += Math.floor(Math.min(price, 100) - 50);
  return points;
};

//method for aggregating points by both month and year
export const aggregateMonthlyRewards = (transactions) => {
  return transactions.reduce((acc, transaction) => {
    const { customerId, name, purchaseDate, price } = transaction;
    const date = new Date(purchaseDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");

    const key = `${customerId}-${year}-${month}`;
    const rewardPoints = calculateRewardPoints(price);

    if (!acc.has(key)) {
      acc.set(key, { customerId, name, year, month, rewardPoints: 0 });
    }

    acc.get(key).rewardPoints += rewardPoints;
    return acc;
  }, new Map());
};

//method to calculate total rewards
export const calculateTotalRewards = (transactions) =>
  transactions.reduce((acc, { name, price }) => {
    if (!acc.has(name)) {
      acc.set(name, 0);
    }
    acc.set(name, acc.get(name) + calculateRewardPoints(price));
    return acc;
  }, new Map());

//method to get last three months data
export const getLatestData = () => {
  const today = new Date();
  const months = [];

  for (let i = 0; i < 3; i++) {
    // Clone today to avoid mutating the original date
    const monthDate = new Date(today.getFullYear(), today.getMonth() - i, 1);
    const year = monthDate.getFullYear();
    const month = String(monthDate.getMonth() + 1).padStart(2, "0"); // Ensure 2-digit format
    months.push(`${year}-${month}`); // Format as YYYY-MM
  }

  return months;
};
