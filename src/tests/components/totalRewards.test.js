import React from "react";
import { render, screen } from "@testing-library/react"; // Import 'render' and 'screen' here
import TotalRewards from "../../components/totalRewards"; // Your TotalRewards component

describe("TotalRewards Component", () => {
  it("renders without crashing", () => {
    render(<TotalRewards totals={{}} />);
    expect(screen.getByTestId("total-rewards-table")).toBeInTheDocument();
  });

  it("renders the table headers correctly", () => {
    render(<TotalRewards totals={{}} />);
    expect(screen.getByText(/Customer Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Reward Points/i)).toBeInTheDocument();
  });

  it("renders the correct data in rows", () => {
    const mockTotals = {
      Alice: 150,
      Bob: 200,
      Charlie: 100,
    };

    render(<TotalRewards totals={mockTotals} />);

    // Check that all rows are rendered
    Object.entries(mockTotals).forEach(([name, points]) => {
      expect(screen.getByText(name)).toBeInTheDocument();
      expect(screen.getByText(points.toString())).toBeInTheDocument();
    });
  });
});
