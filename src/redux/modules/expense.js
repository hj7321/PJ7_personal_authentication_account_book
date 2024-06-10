import initialExpense from "../../data/dummyData.json";

// 초기 상태값
const initialState = {
  expense: initialExpense,
};

// Action Value
const ADD_EXPENSE = "ADD_EXPENSE";
const UPDATE_EXPENSE = "UPDATE_EXPENSE";
const DELETE_EXPENSE = "DELETE_EXPENSE";

// Action Creator
export const addExpense = (payload) => {
  return { type: ADD_EXPENSE, payload };
};
export const updateExpense = (payload) => {
  return { type: UPDATE_EXPENSE, payload };
};
export const deleteExpense = (payload) => {
  return { type: DELETE_EXPENSE, payload };
};

// 리듀서
const expense = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EXPENSE:
      return {
        ...state,
        expense: [...state.expense, action.payload],
      };
    case UPDATE_EXPENSE:
      const { date, item, amount, description } = action.payload;
      return {
        ...state,
        expense: state.expense.map((obj) =>
          obj.id === action.payload.id
            ? {
                ...obj,
                date,
                item,
                amount: +amount,
                description,
              }
            : obj
        ),
      };
    case DELETE_EXPENSE:
      return {
        ...state,
        expense: state.expense.filter((obj) => obj.id !== action.payload.id),
      };
    default:
      return state;
  }
};

// 모듈 파일에서는 리듀서를 export default함
export default expense;
