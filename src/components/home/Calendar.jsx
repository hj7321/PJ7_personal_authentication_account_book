import { StSection, StButton } from "../style/CalendarStyle";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeMonth } from "../../redux/slices/monthSlice";

const Calendar = () => {
  const { month } = useSelector((state) => state.month);
  const dispatch = useDispatch();

  const monthNumArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  useEffect(() => {
    localStorage.setItem("month", JSON.stringify(month));
  }, [month]);

  return (
    <>
      <StSection>
        {monthNumArr.map((monthNum) => (
          <StButton
            key={monthNum}
            $active={month === monthNum}
            onClick={() => {
              dispatch(changeMonth(monthNum));
            }}
          >
            {monthNum}월
          </StButton>
        ))}
      </StSection>
    </>
  );
};

export default Calendar;
