# **Reward Program**


**Overview**

This project implements a rewards program for a retailer, where customers earn points based on their purchase. The project calculates rewards for individual customers based on monthly and yearly data while dynamically sorting and aggregating the data. It also simulates API calls and includes loading states.

**Approach**

*Reward Points Calculation:*


Each transaction calculates reward points as:

* 2 points for every dollar spent over $100.

* 1 point for every dollar spent between $50 and $100.

*Aggregation:*


* Data is grouped and sorted dynamically by year and month. 

* Sorting logic is handled during rendering or fetching, not stored in state.

*Dynamic Loading:*


* A loading state ensures the UI updates based on real response times. 

* This state is toggled before and after fetching data.

*Error Handling:*


* If the API fails, users see a friendly error message instead of a blank screen.

```
**Directory Structure**

root
├── public
│   ├── index.html                     // HTML template
│   ├── mockData.json                  // Mock data for development
├── src
│   ├── components                     // Reusable UI components
│   │   ├── landingPage.js             // Displays the reward points dashboard
│   │   ├── tabs.js                    // Manages tab navigation
│   │   ├── totalRewards.js            // Displays total rewards for customers
│   │   ├── transactions.js            // Displays sorted transaction details
│   │   ├── userMonthlyRewards.js      // Aggregates rewards by month and year
│   ├── screens
│   │   ├── driver.js                  // Driver-specific views
│   ├── services
│   │   ├── api.js                     // Simulates API calls
│   ├── tests                          // Test files
│   │   ├── app.test.js                // Main app tests
│   │   ├── components                 // Tests for individual components
│   │   │   ├── landingPage.test.js
│   │   │   ├── tabs.test.js
│   │   │   ├── totalRewards.test.js
│   │   │   ├── transactions.test.js
│   │   │   ├── userMonthlyRewards.test.js
│   │   ├── screens
│   │   │   ├── driver.test.js
│   │   ├── services
│   │   │   ├── api.test.js
│   │   ├── utils
│   │       ├── utilities.test.js
│   ├── utils                          // Utility functions
│   │   ├── logger.js                  // Logging utility
│   │   ├── utilities.js               // Helper functions
│   ├── app.js                         // Main React component
│   ├── app.css                        // Styling for the application
│   ├── index.js                       // Entry point for the React app
│   ├── index.css                      // Global CSS
│   ├── setupTests.js                  // Test setup
├── package.json                       // Project dependencies
├── readMe.md                          // Project documentation
```

**Installation**


* Clone the repository

* cd reward-program

* npm install

* npm start

* Open your browser at http://localhost:3000.


**Technologies Used**


* React JS: For building the user interface.

* CSS: For styling the application.

* JavaScript: For business logic.

* Mock Data: Simulating backend transactions.


**Future Improvements**


* Integrate with a real backend API for fetching transaction data.

* Add pagination for large datasets.

* Enhance CSS for mobile compatibility.

* Introduce advanced sorting and filtering options.


**Project Screenshot**



* *Running State*

![Dashboard](/assets/appDashboard.png)
![Transactions Table](/assets/transactionsTable.png)
![Total Rewards Table](/assets/totalRewardsTable.png)
![User Monthly Rewards Table](/assets/monthlyRewardsTable.png)

* *Loading State*

![Loading](/assets/loading.png)

* *Error State*

![Error](/assets/error.png)
![No Data Available](/assets/noDataAvailable.png)

* *Test Cases*

![Test Cases](/assets/testCasesPassed.png)





