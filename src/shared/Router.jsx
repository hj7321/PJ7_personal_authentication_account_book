import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../components/pages/HomePage";
import DetailPage from "../components/pages/DetailPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="detail/:id" element={<DetailPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
