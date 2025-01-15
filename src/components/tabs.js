import React from "react";
import { useHistory } from "react-router-dom";

const Tabs = ({ activeTab }) => {
  const history = useHistory();

  const tabs = [
    {
      key: "transactions",
      label: "Transactions",
      path: "/transactions",
    },
    {
      key: "monthly-rewards",
      label: "Monthly Rewards",
      path: "/monthly-rewards",
    },
    {
      key: "total-rewards",
      label: "Total Rewards",
      path: "/total-rewards",
    },
  ];

  return (
    <div className="tabs">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          className={`tab ${activeTab === tab.key ? "active" : ""}`}
          onClick={() => history.push(tab.path)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
