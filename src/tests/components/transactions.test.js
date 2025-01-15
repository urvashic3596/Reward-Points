import React from "react";
import { render, screen } from "@testing-library/react";
import TransactionsTable from "../../components/transactions";

describe("TransactionsTable Component", () => {
  const mockTransactions = [
    {
      transactionId: 1,
      name: "Alice",
      purchaseDate: "2023-01-15",
      product: "Laptop",
      price: 1200,
      rewardPoints: 1150,
    },
    {
      transactionId: 2,
      name: "Bob",
      purchaseDate: "2023-02-10",
      product: "Phone",
      price: 800,
      rewardPoints: 650,
    },
  ];

  it("renders without crashing", () => {
    render(<TransactionsTable transactions={[]} />);
    expect(screen.getByTestId("transactions-table")).toBeInTheDocument();
  });

  it("renders table headers correctly", () => {
    render(<TransactionsTable transactions={[]} />);
    expect(screen.getByText(/Transaction ID/i)).toBeInTheDocument();
    expect(screen.getByText(/Customer Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Purchase Date/i)).toBeInTheDocument();
    expect(screen.getByText(/Product/i)).toBeInTheDocument();
    expect(screen.getByText(/Price/i)).toBeInTheDocument();
    expect(screen.getByText(/Reward Points/i)).toBeInTheDocument();
  });

  it("renders transactions data correctly", () => {
    render(<TransactionsTable transactions={mockTransactions} />);
    mockTransactions.forEach((transaction) => {
      expect(screen.getByText(transaction.transactionId)).toBeInTheDocument();
      expect(screen.getByText(transaction.name)).toBeInTheDocument();
      expect(screen.getByText(transaction.purchaseDate)).toBeInTheDocument();
      expect(screen.getByText(transaction.product)).toBeInTheDocument();
      expect(
        screen.getByText(`$${transaction.price.toFixed(2)}`)
      ).toBeInTheDocument();
      expect(screen.getByText(transaction.rewardPoints)).toBeInTheDocument();
    });
  });
});
