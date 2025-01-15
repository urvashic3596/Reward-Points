import {
  calculateRewardPoints,
  aggregateMonthlyRewards,
  calculateTotalRewards,
  getLatestData,
} from "../../utils/utilities";

describe("Reward Points Calculation", () => {
  test("calculateRewardPoints should calculate points correctly for valid inputs", () => {
    expect(calculateRewardPoints(150)).toBe(150);
    expect(calculateRewardPoints(75)).toBe(25); // 25 points for $50 to $100 range
    expect(calculateRewardPoints(50)).toBe(0); // No points for $50 or less
  });

  test("calculateRewardPoints should return 0 for negative values", () => {
    expect(calculateRewardPoints(-50)).toBe(0); // Negative values should return 0 points
    expect(calculateRewardPoints(-1)).toBe(0); // Even with very small negative values, return 0 points
  });

  test("calculateRewardPoints should handle large numbers correctly", () => {
    const largeNumber = 1e6; // 1,000,000
    expect(calculateRewardPoints(largeNumber)).toBe(
      (largeNumber - 100) * 2 + 50
    ); // Points for large values
  });

  test("calculateRewardPoints should return 0 for null or undefined", () => {
    expect(calculateRewardPoints(null)).toBe(0); // null should return 0 points
    expect(calculateRewardPoints(undefined)).toBe(0); // undefined should return 0 points
  });

  test("calculateRewardPoints should return 0 for string inputs", () => {
    expect(calculateRewardPoints("50")).toBe(0); // String input representing the lower limit
    expect(calculateRewardPoints("abc")).toBe(0); // Invalid string should return 0 points
  });

  test("calculateRewardPoints should return 0 for non-numeric values", () => {
    expect(calculateRewardPoints({})).toBe(0); // Object input should return 0 points
    expect(calculateRewardPoints([])).toBe(0); // Array input should return 0 points
  });

  test("calculateRewardPoints should return 0 for zero input", () => {
    expect(calculateRewardPoints(0)).toBe(0); // No points for zero dollar transaction
  });

  test("calculateRewardPoints should handle floating-point numbers correctly", () => {
    expect(calculateRewardPoints(99.99)).toBe(49); // Should calculate correctly for floating point values
    expect(calculateRewardPoints(100.99)).toBe(50); // Should handle values above 100 correctly
  });

  test("calculateRewardPoints should correctly calculate reward points for boundary values", () => {
    expect(calculateRewardPoints(50)).toBe(0); // No points for exactly $50
    expect(calculateRewardPoints(100)).toBe(50); // No points for exactly $100
  });

  test("calculateRewardPoints should calculate points correctly for small positive numbers over $50", () => {
    expect(calculateRewardPoints(50.01)).toBe(0); // Should return 0 because it's just above $50 but doesn't qualify
    expect(calculateRewardPoints(99.99)).toBe(49); // Should return 49 points for the $50 to $100 range
  });

  test("calculateRewardPoints should handle large number with fractional points", () => {
    expect(calculateRewardPoints(100.99)).toBe(50); // Should correctly calculate reward points even for fractional dollar amounts
  });
});

describe("Aggregate Monthly Rewards", () => {
  const transactions = [
    { customerId: 1, name: "Alice", purchaseDate: "2025-01-15", price: 120 },
    { customerId: 1, name: "Alice", purchaseDate: "2025-01-20", price: 80 },
    { customerId: 2, name: "Bob", purchaseDate: "2025-01-10", price: 60 },
    { customerId: 1, name: "Alice", purchaseDate: "2025-02-15", price: 110 },
    { customerId: 2, name: "Bob", purchaseDate: "2025-02-20", price: 55 },
  ];

  test("aggregateMonthlyRewards should correctly aggregate points by customer and month", () => {
    const result = aggregateMonthlyRewards(transactions);
    expect(result.size).toBe(4); // 4 unique month-year-customer combinations

    // Alice January 2025
    expect(result.get("1-2025-01").rewardPoints).toBe(120);

    // Bob January 2025
    expect(result.get("2-2025-01").rewardPoints).toBe(10);

    // Alice February 2025
    expect(result.get("1-2025-02").rewardPoints).toBe(70);

    // Bob February 2025
    expect(result.get("2-2025-02").rewardPoints).toBe(5);
  });
});

describe("Total Rewards Calculation", () => {
  const transactions = [
    { name: "Alice", price: 120 },
    { name: "Alice", price: 80 },
    { name: "Bob", price: 60 },
    { name: "Alice", price: 110 },
    { name: "Bob", price: 55 },
  ];

  test("calculateTotalRewards should correctly calculate total rewards for each customer", () => {
    const result = calculateTotalRewards(transactions);

    // Total points for Alice: 90 (from 120) + 30 (from 80) + 70 (from 110) = 235
    expect(result.get("Alice")).toBe(190);

    // Total points for Bob: 10 (from 60) + 5 (from 55) = 15
    expect(result.get("Bob")).toBe(15);
  });
});

describe("Get Latest Data", () => {
  test("getLatestData should return the last three months correctly", () => {
    const today = new Date();
    const expectedMonths = [];

    // Generate expected months dynamically in descending order, accounting for year transition
    for (let i = 0; i < 3; i++) {
      const monthDate = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const year = monthDate.getFullYear();
      const month = String(monthDate.getMonth() + 1).padStart(2, "0"); // Ensure 2-digit format
      expectedMonths.push(`${year}-${month}`); // Use unshift to insert at the beginning to keep the order
    }

    const latestMonths = getLatestData();

    // Assert that the returned months match the expected months
    expect(latestMonths).toEqual(expectedMonths);
  });
});
