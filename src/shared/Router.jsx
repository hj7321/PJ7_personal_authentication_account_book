import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../components/pages/HomePage";
import DetailPage from "../components/pages/DetailPage";
import Login from "./../components/pages/Login";
import SignUp from "../components/pages/SignUp";
import HeaderNav from "./HeaderNav";

const Router = () => {
  return (
    <BrowserRouter>
      <HeaderNav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/detail/:id" element={<DetailPage />} />
        </Routes>
      </HeaderNav>
    </BrowserRouter>
  );
};

export default Router;
