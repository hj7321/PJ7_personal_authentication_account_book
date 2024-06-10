import { Link } from "react-router-dom";
import { StSection } from "../style/CalendarStyle";
import { StDiv, StP } from "../style/CategoryStyle";
import { useSelector } from "react-redux";
import SortedOption from "./SortedOption";
import { useEffect, useState } from "react";

const Category = () => {
  const { expense } = useSelector((state) => state.expense);
  const { month } = useSelector((state) => state.month);

  // console.log("expense: ", expense);
  // console.log("month: ", month);

  const changeExpense = () => {
    return expense.filter((obj) => obj.date.split("-")[1] == month);
  };

  const [filteredExpense, setFilteredExpense] = useState(changeExpense);

  useEffect(() => {
    setFilteredExpense(changeExpense);
  }, [expense, month]);

  // console.log("filteredExpense: ", filteredExpense);

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
                  [{obj.item}] {obj.description}
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
