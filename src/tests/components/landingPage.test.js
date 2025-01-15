import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import LandingPage from "../../components/landingPage";

describe("LandingPage", () => {
  const renderComponent = (hasData) => {
    render(
      <Router>
        <LandingPage hasData={hasData} />
      </Router>
    );
  };

  test("renders landing page with navigation cards when hasData is false", () => {
    renderComponent(false);

    // Check if the navigation cards are rendered
    expect(screen.getByText("Transactions")).toBeInTheDocument();
    expect(screen.getByText("Monthly Rewards")).toBeInTheDocument();
    expect(screen.getByText("Total Rewards")).toBeInTheDocument();

    // Check if the descriptions are correct
    expect(screen.getByText("View all transactions")).toBeInTheDocument();
    expect(screen.getByText("See monthly rewards")).toBeInTheDocument();
    expect(screen.getByText("Check total rewards")).toBeInTheDocument();
  });

  test("renders 'No data available' message when hasData is true", () => {
    renderComponent(true);

    // Check if the 'No data available' message is displayed
    expect(screen.getByText("No data available")).toBeInTheDocument();
  });

  test("clicking on a card navigates to the correct path", () => {
    renderComponent(false);

    // Simulate a click on the 'Transactions' card
    fireEvent.click(screen.getByText("Transactions"));

    // The path should be /transactions
    expect(window.location.pathname).toBe("/transactions");

    // Simulate a click on the 'Monthly Rewards' card
    fireEvent.click(screen.getByText("Monthly Rewards"));

    // The path should be /monthly-rewards
    expect(window.location.pathname).toBe("/monthly-rewards");

    // Simulate a click on the 'Total Rewards' card
    fireEvent.click(screen.getByText("Total Rewards"));

    // The path should be /total-rewards
    expect(window.location.pathname).toBe("/total-rewards");
  });
});
