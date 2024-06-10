import { v4 as uuidv4 } from "uuid";
import { StButton, StForm } from "../style/FormStyle";
import HomeInput from "./HomeInput";
import validateInput from "../../shared/validateInput";
import { useDispatch } from "react-redux";
import { addExpense } from "../../redux/slices/expenseSlice";

const Form = () => {
  const dispatch = useDispatch();

  const onAddHandler = (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    const date = data.get("date");
    const item = data.get("item");
    const amount = +data.get("amount");
    const description = data.get("description");

    if (validateInput(date, item, amount, description)) {
      const newExpense = {
        id: uuidv4(),
        date,
        item,
        amount,
        description,
      };

      dispatch(addExpense(newExpense));

      e.target.reset();
    }
  };

  return (
    <StForm onSubmit={onAddHandler}>
      <HomeInput engName={"date"} korName={"날짜"} placeholder={"YYYY-MM-DD"} />
      <HomeInput engName={"item"} korName={"항목"} placeholder={"지출 항목"} />
      <HomeInput
        engName={"amount"}
        korName={"금액"}
        placeholder={"지출 금액"}
      />
      <HomeInput
        engName={"description"}
        korName={"내용"}
        placeholder={"지출 내용"}
      />
      <StButton type="submit">저장</StButton>
    </StForm>
  );
};

export default Form;
