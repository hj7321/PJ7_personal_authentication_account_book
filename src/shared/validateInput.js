const validateInput = (date, item, amount, description) => {
  const regex =
    /^(?:(?!0000)\d{4})-(?:(?:0[1-9]|1[0-2]))-(?:(?:0[1-9]|1\d|2[0-8])|(?:29|30)(?!(?:02))|31(?=(?:0[13578]|1[02])))$|^(?:(?:(?!0000)\d{2}(?:0[48]|[2468][048]|[13579][26])|(?:[02468][048]|[13579][26])00)-02-29)$/;

  if (!date.trim()) return alert("날짜를 입력해주세요.");
  else if (!regex.test(date)) return alert("알맞은 날짜 형식을 입력해주세요.");
  else if (!item.trim()) return alert("지출 항목을 입력해주세요.");
  else if (!amount) return alert("지출 금액을 입력해주세요.");
  else if (amount <= 0) return alert("알맞은 지출 금액을 입력해주세요.");
  else if (!description.trim()) return alert("지출 내용을 입력해주세요.");
  return true;
};

export default validateInput;
