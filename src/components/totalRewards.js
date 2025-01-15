import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import Tabs from "./tabs";

const TotalRewards = ({ totals }) => {
  const history = useHistory();
  // If totals is a Map, use Array.from() to convert it to an array of entries
  const totalsArray =
    totals instanceof Map
      ? Array.from(totals.entries())
      : Object.entries(totals);
  return (
    <div className="container">
      <Tabs activeTab="total-rewards" />
      <table data-testid="total-rewards-table">
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Total Reward Points</th>
          </tr>
        </thead>
        <tbody>
          {totalsArray.map(([name, points]) => (
            <tr key={name}>
              <td>{name}</td>
              <td>{points}</td>
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

TotalRewards.propTypes = {
  totals: PropTypes.object.isRequired,
};

export default TotalRewards;
