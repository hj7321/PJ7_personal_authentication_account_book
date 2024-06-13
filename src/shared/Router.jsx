import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../components/pages/HomePage";
import DetailPage from "../components/pages/DetailPage";
import Login from "./../components/pages/Login";
import SignUp from "../components/pages/SignUp";
import HeaderNav from "../components/HeaderNav";
import MyPage from "../components/pages/MyPage";
import { AuthProvider } from "../context/AuthContext";

const Router = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HeaderNav />}>
            <Route index element={<HomePage />} />
            <Route path="profile" element={<MyPage />} />
            <Route path="detail/:id" element={<DetailPage />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default Router;
