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

export const deleteExpense = async (id) => {
  await axios.delete(`http://localhost:5000/expenses/${id}`);
};

export const updateExpense = async (updatedExpense) => {
  const { data } = await axios.patch(
    `http://localhost:5000/expenses/${updatedExpense.id}`,
    updatedExpense
  );
  return data;
};
