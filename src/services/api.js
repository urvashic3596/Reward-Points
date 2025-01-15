// src/services/api.js
const BASE_URL = "/mockData.json"; // Replace with your actual API base URL

// Fetch transactions data
export const fetchTransactions = async () => {
  try {
    const response = await fetch(`${BASE_URL}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch transactions: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};
