import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/user/landingPage";
import MuiNavBar from "./component/navigation/muiNavbar";

function App() {
  return (
    <Router>
      <MuiNavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
