import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import DetailInput from "./DetailInput";
import { StButton, StDiv } from "../style/DetailContentStyle";
import validateInput from "../../shared/validateInput";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteExpense, getExpense, updateExpense } from "../../api/Expense";

const DetailContent = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const { data: clickedExpense, isLoading } = useQuery({
    queryKey: ["expense", id],
    queryFn: () => getExpense(id),
  });

  const date = useRef(null);
  const item = useRef(null);
  const amount = useRef(null);
  const description = useRef(null);

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteExpense,
    onSuccess: () => {
      queryClient.invalidateQueries(["expenses"]);
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateExpense,
    onSettled: (updatedExpense) => {
      queryClient.invalidateQueries(["expenses", updatedExpense.id]);
    },
  });

  const onUpdateHandler = () => {
    if (
      validateInput(
        date.current.value,
        item.current.value,
        +amount.current.value,
        description.current.value
      )
    ) {
      updateMutation.mutate({
        ...clickedExpense,
        date: date.current.value,
        item: item.current.value,
        amount: +amount.current.value,
        description: description.current.value,
      });
      alert("내역이 수정되었습니다.");
      navigate("/");
    }
  };

  const onDeleteHandler = () => {
    const result = confirm("정말로 이 지출 내역을 삭제하시겠습니까?");
    if (result) {
      deleteMutation.mutate(clickedExpense.id);
      alert("내역이 삭제되었습니다.");
      navigate("/");
    }
  };

  const gotoHomePage = () => {
    navigate("/");
  };

  useEffect(() => {
    date.current.value = clickedExpense?.date;
    item.current.value = clickedExpense?.item;
    amount.current.value = clickedExpense?.amount;
    description.current.value = clickedExpense?.description;
  }, [clickedExpense]);

  return (
    <>
      <DetailInput engName={"date"} korName={"날짜"} value={date} />
      <DetailInput engName={"item"} korName={"항목"} value={item} />
      <DetailInput engName={"amount"} korName={"금액"} value={amount} />
      <DetailInput
        engName={"description"}
        korName={"내용"}
        value={description}
      />
      <StDiv>
        <StButton $color={"blue"} onClick={onUpdateHandler}>
          수정
        </StButton>
        <StButton $color={"red"} onClick={onDeleteHandler}>
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
