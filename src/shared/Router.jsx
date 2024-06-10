import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../components/pages/HomePage";
import DetailPage from "../components/pages/DetailPage";
import Login from "./../components/pages/Login";
import SignUp from "../components/pages/SignUp";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="detail/:id" element={<DetailPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
