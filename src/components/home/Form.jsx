import { StButton, StForm } from "../style/FormStyle";
import HomeInput from "./HomeInput";
import validateInput from "../../shared/validateInput";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addExpense } from "../../api/Expense";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Form = () => {
  const { userInfo } = useContext(AuthContext);

  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: addExpense,
    onSuccess: () => {
      queryClient.invalidateQueries(["expenses"]);
    },
  });

  const onAddHandler = (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    const date = data.get("date");
    const item = data.get("item");
    const amount = +data.get("amount");
    const description = data.get("description");
    const createdBy = userInfo.nickname;
    const month = +date.split("-")[1];

    if (validateInput(date, item, amount, description)) {
      addMutation.mutate({ date, item, amount, description, createdBy, month });

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
