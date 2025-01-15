import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  calculateRewardPoints,
  getLatestData,
  aggregateMonthlyRewards,
  calculateTotalRewards,
} from "../utils/utilities";
import TransactionsTable from "../components/transactions";
import UserMonthlyRewards from "../components/userMonthlyRewards";
import TotalRewards from "../components/totalRewards";
import LandingPage from "../components/landingPage";
import { fetchTransactions } from "../services/api";

const Driver = () => {
  const [transactions, setTransactions] = useState([]);
  const [monthlyRewards, setMonthlyRewards] = useState([]);
  const [totalRewards, setTotalRewards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    // Calculate the latest data (last 3 months)
    const latestData = getLatestData();
    const fetchData = async () => {
      try {
        setLoading(true);

        const data = await fetchTransactions(); // Fetch data from API
        if (data.length === 0) {
          setIsEmpty(true); // Handle empty data scenario
          return;
        }

        setIsEmpty(false); // Reset in case of subsequent successful fetches

        const purchaseData = data.map((transaction) => ({
          ...transaction,
          rewardPoints: calculateRewardPoints(transaction.price),
        }));

        // Full dataset for Transactions Table and Total Rewards
        setTransactions(purchaseData);
        setTotalRewards(calculateTotalRewards(purchaseData));

        const filteredData = purchaseData.filter((transaction) => {
          if (!transaction.purchaseDate) {
            return false;
          }
          const monthYear = transaction.purchaseDate.slice(0, 7);
          return latestData.includes(monthYear);
        });
        setMonthlyRewards(aggregateMonthlyRewards(filteredData));
      } catch (error) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(a.purchaseDate) - new Date(b.purchaseDate)
  );

  const sortedMonthlyRewards = [...monthlyRewards].sort(
    (a, b) =>
      new Date(`${a.year}-${a.month}-01`) - new Date(`${b.year}-${b.month}-01`)
  );

  return (
    <>
      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <h2>Loading...</h2>
        </div>
      ) : (
        <div>
          {error.length ? (
            <div className="error">{error}</div>
          ) : (
            <Router>
              <Switch>
                <Route exact path="/">
                  {" "}
                  <div>
                    <LandingPage hasData={isEmpty} />
                  </div>
                </Route>
                <Route path="/transactions">
                  <div>
                    <h1>Transactions</h1>
                    <TransactionsTable transactions={sortedTransactions} />
                  </div>
                </Route>
                <Route path="/monthly-rewards">
                  <div>
                    <h1>Monthly Rewards</h1>
                    <UserMonthlyRewards rewards={sortedMonthlyRewards} />
                  </div>
                </Route>
                <Route path="/total-rewards">
                  <div>
                    <h1>Total Rewards</h1>
                    <TotalRewards totals={totalRewards} />
                  </div>
                </Route>
              </Switch>
            </Router>
          )}
        </div>
      )}
    </>
  );
};

export default Driver;
