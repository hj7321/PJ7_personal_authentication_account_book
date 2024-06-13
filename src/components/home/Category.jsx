import { Link } from "react-router-dom";
import { StSection } from "../style/CalendarStyle";
import { StDiv, StP } from "../style/CategoryStyle";
import { useSelector } from "react-redux";
import SortedOption from "./SortedOption";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getExpense, getExpenses } from "../../api/Expense";

const Category = () => {
  const { month } = useSelector((state) => state.month);

  const {
    isPending,
    isFetching,
    data: expenses,
  } = useQuery({
    queryKey: ["expenses"],
    queryFn: getExpenses,
    select: (expenses) => expenses,
  });

  console.log(expenses);

  const changeExpense = () => {
    return expenses?.filter((obj) => obj.month === month) || [];
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
          <Link key={obj.id} to={`/detail/${obj.id}`}>
            <li>
              <div>
                <p>{obj.date}</p>
                <StP>
                  [{obj.item}] {obj.description} (by {obj.createdBy})
                </StP>
              </div>
              <StDiv>{obj.amount.toLocaleString()}원</StDiv>
            </li>
          </Link>
        ))}
      </ul>
    </StSection>
  );
};

export default Category;
