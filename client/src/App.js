import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterLogin from "./components/RegisterLogin";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Register" element={<RegisterLogin />} />
        <Route path="/Login" element={<RegisterLogin isLogin={true} />} />
      </Routes>
    </Router>
  );
}

export default App;
