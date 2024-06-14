import { useNavigate } from "react-router-dom";
import { StSection } from "../style/CalendarStyle";
import { StDiv, StP } from "../style/CategoryStyle";
import SortedOption from "./SortedOption";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getExpenses } from "../../api/Expense";
import { AuthContext } from "./../../context/AuthContext";

const Category = ({ month }) => {
  const navigate = useNavigate();

  const { userInfo } = useContext(AuthContext);

  const {
    isPending,
    isFetching,
    data: expenses,
  } = useQuery({
    queryKey: ["expenses"],
    queryFn: getExpenses,
    select: (expenses) => expenses,
  });

  const changeExpense = () => {
    return expenses?.filter((obj) => obj.month === month) || [];
  };

  const checkUser = (userId, id) => {
    if (userId !== userInfo.id)
      return alert("본인이 작성한 목록만 수정 및 삭제가 가능합니다.");
    navigate(`/detail/${id}`);
  };

  const [filteredExpense, setFilteredExpense] = useState([]);

  useEffect(() => {
    if (expenses) setFilteredExpense(changeExpense);
  }, [expenses, month]);

  if (isPending) {
    return <h1>Loading...</h1>;
  }

  return (
    <StSection>
      <ul>
        {filteredExpense.length ? (
          <SortedOption
            filteredExpense={filteredExpense}
            setFilteredExpense={setFilteredExpense}
          />
        ) : (
          "지출이 없습니다."
        )}
        {filteredExpense.map((obj) => (
          <li key={obj.id} onClick={() => checkUser(obj.userId, obj.id)}>
            <div>
              <p>{obj.date}</p>
              <StP>
                [{obj.item}] {obj.description} (by {obj.createdBy})
              </StP>
            </div>
            <StDiv>{obj.amount.toLocaleString()}원</StDiv>
          </li>
        ))}
      </ul>
    </StSection>
  );
};

export default Category;
