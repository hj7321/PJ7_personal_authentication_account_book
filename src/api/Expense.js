import axios from "axios";

const JSON_SERVER_HOST = "https://wise-amber-shovel.glitch.me";

export const getExpenses = async () => {
  const { data } = await axios.get(`${JSON_SERVER_HOST}/expenses`);
  return data;
};

export const getExpense = async (id) => {
  const { data } = await axios.get(`${JSON_SERVER_HOST}/expenses/${id}`);
  return data;
};

export const addExpense = (newExpense) => {
  return axios.post(`${JSON_SERVER_HOST}/expenses`, newExpense);
};

export const deleteExpense = async (id) => {
  await axios.delete(`${JSON_SERVER_HOST}/expenses/${id}`);
};

export const updateExpense = async (updatedExpense) => {
  const { data } = await axios.patch(
    `${JSON_SERVER_HOST}/expenses/${updatedExpense.id}`,
    updatedExpense
  );
  return data;
};
