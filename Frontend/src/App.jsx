import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Topbar from "./Pages/Topbar/Topbar";
import Navbar from "./Pages/Navbar/Navbar";
import Footer from "./Pages/Footer/Footer";
import FloatingForm from "./Pages/FloatingForm/FloatingForm";
import FloatingIcons from "./Pages/FloatingIcons/FloatingIcons";

function App() {
  return (
    <Router>
      <Topbar />
      <Navbar />

      <Routes>
        {/* Add routes here */}
      </Routes>
      <FloatingIcons />
      <FloatingForm />
      <Footer />
    </Router>
  );
}

export default App;