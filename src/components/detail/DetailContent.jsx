import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import DetailInput from "./DetailInput";
import { StButton, StDiv } from "../style/DetailContentStyle";
import validateInput from "../../shared/validateInput";
import { useDispatch, useSelector } from "react-redux";
import { deleteExpense, updateExpense } from "../../redux/slices/expenseSlice";

const DetailContent = () => {
  const { expense } = useSelector((state) => state.expense);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const param = useParams();
  const clickedExpense = expense.find((obj) => obj.id === param.id);

  const date = useRef(clickedExpense.date);
  const item = useRef(clickedExpense.item);
  const amount = useRef(clickedExpense.amount);
  const description = useRef(clickedExpense.description);

  const onUpdateHandler = (id) => {
    if (
      validateInput(
        date.current.value,
        item.current.value,
        amount.current.value,
        description.current.value
      )
    ) {
      dispatch(
        updateExpense({
          id,
          date: date.current.value,
          item: item.current.value,
          amount: amount.current.value,
          description: description.current.value,
        })
      );
      navigate("/");
    }
  };

  const onDeleteHandler = (id) => {
    const result = confirm("정말로 이 지출 내역을 삭제하시겠습니까?");
    if (result) {
      dispatch(deleteExpense({ id }));
      navigate("/");
    }
  };

  const gotoHomePage = () => {
    navigate("/");
  };

  useEffect(() => {
    date.current.value = clickedExpense.date;
    item.current.value = clickedExpense.item;
    amount.current.value = clickedExpense.amount;
    description.current.value = clickedExpense.description;
  }, []);

  return (
    <>
      <DetailInput engName={"date"} korName={"날짜"} state={date} />
      <DetailInput engName={"item"} korName={"항목"} state={item} />
      <DetailInput engName={"amount"} korName={"금액"} state={amount} />
      <DetailInput
        engName={"description"}
        korName={"내용"}
        state={description}
      />
      <StDiv>
        <StButton $color={"blue"} onClick={() => onUpdateHandler(param.id)}>
          수정
        </StButton>
        <StButton $color={"red"} onClick={() => onDeleteHandler(param.id)}>
          삭제
        </StButton>
        <StButton $color={"green"} onClick={gotoHomePage}>
          뒤로가기
        </StButton>
      </StDiv>
    </>
  );
};

export default DetailContent;
