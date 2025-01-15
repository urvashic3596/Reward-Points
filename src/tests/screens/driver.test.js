import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // Import MemoryRouter
import Driver from "../../screens/driver";
import * as api from "../../services/api";
import * as utilities from "../../utils/utilities";

jest.mock("../../services/api", () => ({
  fetchTransactions: jest.fn(),
}));

jest.mock("../../utils/utilities", () => ({
  calculateRewardPoints: jest.fn(),
  getLatestData: jest.fn(() => ["2023-11", "2023-12", "2024-01"]),
  aggregateMonthlyRewards: jest.fn(),
  calculateTotalRewards: jest.fn(),
}));

describe("Driver Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders with fetched data", async () => {
    const mockTransactions = [
      { id: 1, price: 100, purchaseDate: "2024-01-01" },
    ];
    api.fetchTransactions.mockResolvedValue(mockTransactions); // Mock API
    utilities.calculateRewardPoints.mockImplementation((price) => price * 2);
    utilities.calculateTotalRewards.mockReturnValue(200);
    utilities.aggregateMonthlyRewards.mockReturnValue([
      { year: 2024, month: 1, rewards: 200 },
    ]);

    render(
      <MemoryRouter initialEntries={["/transactions"]}>
        <Driver />
      </MemoryRouter>
    );
  });
});
