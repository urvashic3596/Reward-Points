import React from "react";
import { render, screen } from "@testing-library/react";
import UserMonthlyRewards from "../../components/userMonthlyRewards";
import { MemoryRouter } from "react-router-dom"; // To handle routing in tests

describe("UserMonthlyRewards Component", () => {
  it("renders without crashing when rewards are provided", () => {
    const mockRewards = [
      [
        "key1",
        {
          customerId: 1,
          name: "Alice",
          year: 2025,
          month: "January",
          rewardPoints: 100,
        },
      ],
    ];

    render(
      <MemoryRouter>
        <UserMonthlyRewards rewards={mockRewards} />
      </MemoryRouter>
    );
    // Check that the table is rendered
    expect(screen.getByTestId("monthly-rewards-table")).toBeInTheDocument();
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
  });
});
