import { useQuery } from "@tanstack/react-query";
import {
  BarSegment,
  ColorBox,
  GraphContainer,
  StH3,
  StSection,
  SummaryContainer,
  SummaryItem,
} from "../style/GraphStyle";
import { getExpenses } from "../../api/Expense";

const Graph = ({ month }) => {
  const {
    isPending,
    isFetching,
    data: expenses,
  } = useQuery({
    queryKey: ["expenses"],
    queryFn: getExpenses,
    select: (expenses) => expenses,
  });

  const filteredExpense = expenses?.filter((obj) => obj.month === month) || [];

  const totalAmount = filteredExpense.reduce((amount, obj) => {
    return amount + obj.amount;
  }, 0);

  const itemObj = filteredExpense.reduce((accObj, curObj) => {
    if (accObj[curObj.item]) accObj[curObj.item] += curObj.amount;
    else accObj[curObj.item] = curObj.amount;
    return accObj;
  }, {});

  const changeArrToItemObj = Object.entries(itemObj).sort(
    (a, b) => b[1] - a[1]
  );

  const top4Items = changeArrToItemObj.slice(0, 4);
  const otherItemsTotal = changeArrToItemObj
    .slice(4)
    .reduce((sum, [, amount]) => sum + amount, 0);

  const getColor = (index) => {
    const colors = ["#007bff", "#28a745", "#dc3545", "#ffc107", "#17a2b8"];
    return colors[index % colors.length];
  };

  return (
    <StSection>
      <StH3>
        {month}월 총 지출: 💸
        {filteredExpense.length ? totalAmount.toLocaleString() : 0}원
      </StH3>
      <GraphContainer $length={filteredExpense.length}>
        {top4Items.map(([item, amount], index) => {
          const percentage = ((amount / totalAmount) * 100).toFixed(2);
          return (
            <BarSegment key={item} color={getColor(index)} width={percentage} />
          );
        })}
        {otherItemsTotal > 0 && (
          <BarSegment
            color={getColor(4)}
            width={((otherItemsTotal / totalAmount) * 100).toFixed(2)}
          />
        )}
      </GraphContainer>
      <SummaryContainer $length={filteredExpense.length}>
        {top4Items.map(([item, amount], index) => {
          const percentage = ((amount / totalAmount) * 100).toFixed(2);
          return (
            <SummaryItem key={item}>
              <ColorBox color={getColor(index)} />
              {item}: {amount.toLocaleString()} 원 ({percentage}%)
            </SummaryItem>
          );
        })}
        {otherItemsTotal > 0 && (
          <SummaryItem>
            <ColorBox color={getColor(4)} />
            기타: {otherItemsTotal.toLocaleString()} 원 (
            {((otherItemsTotal / totalAmount) * 100).toFixed(2)}%)
          </SummaryItem>
        )}
      </SummaryContainer>
    </StSection>
  );
};

export default Graph;
