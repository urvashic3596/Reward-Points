import React from "react";
import { useHistory } from "react-router-dom";

const LandingPage = ({ hasData }) => {
  const history = useHistory();

  const cards = [
    {
      title: "Transactions",
      description: "View all transactions",
      path: "/transactions",
    },
    {
      title: "Monthly Rewards",
      description: "See monthly rewards",
      path: "/monthly-rewards",
    },
    {
      title: "Total Rewards",
      description: "Check total rewards",
      path: "/total-rewards",
    },
  ];

  return (
    <div className="landing-page">
      <h1 className="landing-page-title">Reward Points Dashboard</h1>
      {!hasData ? (
        <div className="card-container">
          {cards.map((card, index) => (
            <div
              key={index}
              className="card"
              role="button"
              tabIndex="0"
              onClick={() => history.push(card.path)}
              onKeyPress={(event) =>
                (event.key === "Enter" || event.key === " ") &&
                history.push(card.path)
              }
              aria-label={`Navigate to ${card.title}`}
            >
              <h2>{card.title}</h2>
              <p>{card.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-data-message">No data available</p>
      )}
    </div>
  );
};

export default LandingPage;
