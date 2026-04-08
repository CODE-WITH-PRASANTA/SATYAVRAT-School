import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "./Layout/AdminLayout"; // ✅ FIXED
import DashBoard from "./Pages/DashBoard/DashBoard";
import NewsPosting from "./Pages/NewsPosting/NewsPosting";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AdminLayout />}>
          <Route path="/" element={<DashBoard/>}/>
          <Route path="/admin/newsposting" element={<NewsPosting/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;