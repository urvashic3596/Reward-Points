import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import Tabs from "./tabs";

const TransactionsTable = ({ transactions }) => {
  const history = useHistory();

  return (
    <div className="container">
      <Tabs activeTab="transactions" />
      <table data-testid="transactions-table">
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Customer Name</th>
            <th>Purchase Date</th>
            <th>Product</th>
            <th>Price</th>
            <th>Reward Points</th>
          </tr>
        </thead>
        <tbody>
          {transactions?.map((transaction) => (
            <tr key={transaction.transactionId}>
              <td>{transaction.transactionId}</td>
              <td>{transaction.name}</td>
              <td>{transaction.purchaseDate}</td>
              <td>{transaction.product}</td>
              <td>${transaction.price?.toFixed(2)}</td>
              <td>{transaction.rewardPoints}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="back-btn" onClick={() => history.push("/")}>
        Back
      </button>
    </div>
  );
};

TransactionsTable.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      transactionId: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      purchaseDate: PropTypes.string.isRequired,
      product: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      rewardPoints: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default TransactionsTable;
