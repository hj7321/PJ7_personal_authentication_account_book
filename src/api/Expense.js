import axios from "axios";

export const getExpenses = async () => {
  const { data } = await axios.get("http://localhost:5000/expenses");
  return data;
};

export const getExpense = async (id) => {
  const { data } = await axios.get(`http://localhost:5000/expenses/${id}`);
  return data;
};

export const addExpense = (newExpense) => {
  return axios.post("http://localhost:5000/expenses", newExpense);
};
