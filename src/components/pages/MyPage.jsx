import { useContext, useEffect, useState } from "react";
import {
  StButton,
  StH3,
  StFormBox,
  StSection,
  StInput,
  StLabel,
} from "../style/LoginStyle";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const MyPage = () => {
  const [nickname, setNickname] = useState("");
  const [newNickname, setNewNickname] = useState("");
  const [image, setImage] = useState(null);
  const [newImage, setNewImage] = useState(null); // 기본값을 null로 설정
  const [userInfo, setUserInfo] = useState(null);
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (!isAuthenticated) return;
    else {
      const fetchUserInfo = async () => {
        try {
          const token = localStorage.getItem("accessToken");
          const { data } = await axios.get(
            "https://moneyfulpublicpolicy.co.kr/user",
            {
              headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setNickname(data.nickname);
          setNewNickname(data.nickname);
          setImage(data.avatar ?? "../../images/profile.jpg");
        } catch (error) {
          alert(`사용자 정보 불러오기 실패: ${error.message}`);
        }
      };
      fetchUserInfo();
    }
  }, [isAuthenticated]);

  const changeProfile = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("accessToken");
      const formData = new FormData();
      formData.append("nickname", newNickname);
      if (newImage) formData.append("avatar", newImage);

      const { data } = await axios.patch(
        "https://moneyfulpublicpolicy.co.kr/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.success) {
        setUserInfo((prev) => ({
          ...prev,
          nickname: data.nickname,
        }));
        alert("프로필이 변경되었습니다.");
        setNickname(data.nickname);
        setImage(data.avatar);
      } else {
        alert("프로필 변경에 실패했습니다.");
      }
    } catch (error) {
      alert(`프로필 변경 실패: ${error.message}`);
    }
  };

  const changeProfileImg = (e) => {
    const file = e.target.files[0];
    if (file) setNewImage(file);
  };

  return (
    <StSection>
      <StH3>{nickname}님의 프로필</StH3>
      <StFormBox onSubmit={changeProfile}>
        <label>
          닉네임{" "}
          <StInput
            type="text"
            value={newNickname}
            onChange={(e) => setNewNickname(e.target.value)}
          />
        </label>
        <StLabel $img>
          프로필 사진{" "}
          <input type="file" accept="image/*" onChange={changeProfileImg} />
        </StLabel>
        <StButton type="submit" $margin>
          수정하기
        </StButton>
      </StFormBox>
    </StSection>
  );
};

export default MyPage;
