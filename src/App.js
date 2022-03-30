import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/user/landingPage";
import MuiNavBar from "./component/navigation";
import ProductListPage from "./pages/user/productList";
import ProductCard from "./component/productCard";

function App() {
  return (
    <Router>
      <MuiNavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/productList" element={<ProductListPage />} />
        <Route path="/test" element={<ProductCard />} />
      </Routes>
    </Router>
  );
}

export default App;
