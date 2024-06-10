// 초기 상태값
const initialState = {
  month: JSON.parse(localStorage.getItem("month")) || 1,
};

// Action Value
const CHANGE_MONTH = "CHANGE_MONTH";

// Action Creator
export const changeMonth = (payload) => {
  return { type: CHANGE_MONTH, payload };
};

// 리듀서
const month = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_MONTH:
      return {
        month: action.payload,
      };
    default:
      return state;
  }
};

// 모듈 파일에서는 리듀서를 export default함
export default month;
