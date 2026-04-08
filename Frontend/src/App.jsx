import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

/* Layout Components */
import Topbar from "./Pages/Topbar/Topbar";
import Navbar from "./Pages/Navbar/Navbar";
import Footer from "./Pages/Footer/Footer";
import FloatingForm from "./Pages/FloatingForm/FloatingForm";
import FloatingIcons from "./Pages/FloatingIcons/FloatingIcons";
import Home from "./Pages/Home/Home";


function App() {
  return (
    <Router>
      {/* 🔝 Global Components */}
      <Topbar />
      <Navbar />

      {/* 🔄 Routes */}
      <Routes>
        
       <Route path="/" element={<Home />} />

      </Routes>

      {/* 🔥 Floating UI */}
      <FloatingIcons />
      <FloatingForm />

      {/* 🔻 Footer */}
      <Footer />
    </Router>
  );
  
  
}

export default App;