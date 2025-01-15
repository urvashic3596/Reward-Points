// src/services/api.test.js
import { fetchTransactions } from "../../services/api";

// Mock the fetch function globally
global.fetch = jest.fn();

describe("fetchTransactions", () => {
  // Reset the mock before each test to ensure a clean slate
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return data when the API call is successful", async () => {
    // Mock the successful fetch response
    const mockData = [
      { id: 1, amount: 100 },
      { id: 2, amount: 200 },
    ];
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    const result = await fetchTransactions();

    // Assert the result is correct
    expect(result).toEqual(mockData);
    expect(fetch).toHaveBeenCalledTimes(1); // Check if fetch was called once
    expect(fetch).toHaveBeenCalledWith("/mockData.json"); // Verify the URL
  });

  it("should throw an error when the API call fails", async () => {
    // Mock the failed fetch response
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    });

    // Assert that the function throws an error
    await expect(fetchTransactions()).rejects.toThrow(
      "Failed to fetch transactions: 500"
    );
    expect(fetch).toHaveBeenCalledTimes(1); // Check if fetch was called once
    expect(fetch).toHaveBeenCalledWith("/mockData.json"); // Verify the URL
  });

  it("should handle network errors gracefully", async () => {
    // Mock a network error (e.g., fetch fails)
    fetch.mockRejectedValueOnce(new Error("Network Error"));

    // Assert that the function throws a network error
    await expect(fetchTransactions()).rejects.toThrow("Network Error");
    expect(fetch).toHaveBeenCalledTimes(1); // Check if fetch was called once
  });
});
