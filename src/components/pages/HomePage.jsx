import Form from "../home/Form";
import Calendar from "../home/Calendar";
import Graph from "../home/Graph";
import Category from "../home/Category";
import { useState } from "react";

const HomePage = () => {
  const [month, setMonth] = useState(
    JSON.parse(localStorage.getItem("month")) || 1
  );

  return (
    <>
      <Form />
      <Calendar month={month} setMonth={setMonth} />
      <Graph month={month} />
      <Category month={month} />
    </>
  );
};

export default HomePage;
