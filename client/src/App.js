import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterLogin from "./components/RegisterLogin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegisterLogin />} />
        <Route path="/Register" element={<RegisterLogin />} />
        <Route path="/Login" element={<RegisterLogin isLogin={true} />} />
      </Routes>
    </Router>
  );
}

export default App;
