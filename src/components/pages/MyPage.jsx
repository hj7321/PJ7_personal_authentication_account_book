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
import axiosInstance from "../../shared/axiosInstance";

const MyPage = () => {
  const { userInfo, setUserInfo } = useContext(AuthContext);
  const [newNickname, setNewNickname] = useState("");
  const [newImage, setNewImage] = useState(null); // 기본값을 null로 설정

  const changeProfile = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("accessToken");
      const formData = new FormData();
      formData.append("nickname", newNickname);
      if (newImage) formData.append("avatar", newImage);
      else formData.append("avatar", userInfo.avatar);

      const { data } = await axiosInstance.patch("/profile", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.success) {
        setUserInfo((prev) => ({
          ...prev,
          nickname: data.nickname,
          avatar: data.avatar,
        }));
        alert("프로필이 변경되었습니다.");
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

  useEffect(() => {
    if (userInfo) setNewNickname(userInfo.nickname);
  }, [userInfo]);

  return (
    <StSection>
      <StH3>{userInfo?.nickname}님의 프로필</StH3>
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
