import { StSection, StButton } from "../style/CalendarStyle";
import { useEffect } from "react";

const Calendar = ({ month, setMonth }) => {
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
              setMonth(monthNum);
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
