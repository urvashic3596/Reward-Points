import React from "react";
import { useHistory } from "react-router-dom";
import Tabs from "./tabs";

const UserMonthlyRewards = ({ rewards }) => {
  const history = useHistory();
  return (
    <div className="container">
      <Tabs activeTab="monthly-rewards" />
      <table data-testid="monthly-rewards-table">
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>Name</th>
            <th>Year</th>
            <th>Month</th>
            <th>Reward Points</th>
          </tr>
        </thead>
        <tbody>
          {rewards?.map(([key, details]) => (
            <tr key={`${details.customerId}-${details.year}-${details.month}`}>
              <td>{details.customerId}</td>
              <td>{details.name}</td>
              <td>{details.year}</td>
              <td>{details.month}</td>
              <td>{details.rewardPoints}</td>
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

export default UserMonthlyRewards;
