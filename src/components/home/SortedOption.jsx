const SortedOption = ({ filteredExpense, setFilteredExpense }) => {
  const handleSortChange = (e) => {
    const sortedValue = e.target.value;

    if (sortedValue === "date") sortByDate();
    else if (sortedValue === "item") sortByItem();
    else if (sortedValue === "amount") sortByAmount();
  };

  let sortedExpense = [];

  // 날짜순 정렬
  const sortByDate = () => {
    sortedExpense = [];
    const timeSortedExpense = filteredExpense
      .map((obj) => [obj.date, obj.item, obj.description, obj.id])
      .sort((a, b) => {
        if (a[0] !== b[0]) return new Date(a[0]) - new Date(b[0]);
        else if (a[1] !== b[1]) return a[1].localeCompare(b[1]);
        else return a[2].localeCompare(b[2]);
      });
    for (let i = 0; i < timeSortedExpense.length; i++) {
      filteredExpense.forEach((obj) => {
        if (obj.id === timeSortedExpense[i][3]) sortedExpense.push(obj);
      });
    }
    setFilteredExpense(sortedExpense);
  };

  // 항목순 정렬
  const sortByItem = () => {
    sortedExpense = [];
    const itemSortedExpense = filteredExpense
      .map((obj) => [obj.item, obj.description, obj.id])
      .sort((a, b) => {
        if (a[0] !== b[0]) return a[0].localeCompare(b[0]);
        else if (a[1] !== b[1]) return a[1].localeCompare(b[1]);
      });
    for (let i = 0; i < itemSortedExpense.length; i++) {
      filteredExpense.forEach((obj) => {
        if (obj.id === itemSortedExpense[i][2]) sortedExpense.push(obj);
      });
    }
    setFilteredExpense(sortedExpense);
  };

  // 가격순 정렬
  const sortByAmount = () => {
    sortedExpense = [];
    const amountSortedExpense = filteredExpense
      .map((obj) => [obj.amount, obj.date, obj.item, obj.description, obj.id])
      .sort((a, b) => {
        if (a[0] !== b[0]) return a[0] - b[0];
        else if (a[1] !== b[1]) return new Date(a[1]) - new Date(b[1]);
        else if (a[2] !== b[2]) return a[2].localeCompare(b[2]);
        else return a[3].localeCompare(b[3]);
      });
    for (let i = 0; i < amountSortedExpense.length; i++) {
      filteredExpense.forEach((obj) => {
        if (obj.id === amountSortedExpense[i][4]) sortedExpense.push(obj);
      });
    }
    setFilteredExpense(sortedExpense);
  };

  return (
    <select onChange={handleSortChange}>
      <option value="date">날짜순</option>
      <option value="item">항목순</option>
      <option value="amount">가격순</option>
    </select>
  );
};

export default SortedOption;
