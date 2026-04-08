import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "./Layout/AdminLayout"; // ✅ FIXED

import NewsPosting from "./Pages/NewsPosting/NewsPosting";
import DashBoard from "./Pages/DashBoard/DashBoard";
import Testimonial from "./Pages/Testimonial/Testimonial";
import Teacher from "./Pages/Teacher/Teacher";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AdminLayout />}>
         <Route path="/" element={<DashBoard />} />
          <Route path="/admin/newsposting" element={<NewsPosting/>}/>
          <Route path="/admin/testimonial" element={<Testimonial/>}/>
          <Route path="/admin/teacherposting" element={<Teacher/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;