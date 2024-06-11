import { useState } from "react";
import { StSection } from "../style/CalendarStyle";
import { StH3 } from "../style/LoginStyle";

const MyPage = () => {
  const [nickname, setNickname] = useState("원래 닉네임");

  <StSection>
    <p>왜 안뜨나요</p>
    <StH3>{"원래 닉네임"}님의 프로필</StH3>
    <label>
      닉네임
      <input type="text" value={nickname} />
    </label>
    <button>수정하기</button>
  </StSection>;
};

export default MyPage;
