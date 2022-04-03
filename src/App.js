import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/user/landingPage";
import MuiNavBar from "./component/navigation";
import ProductList from "./pages/user/productList";
import ProductListCategory from "./pages/user/productList/category";
import ProductCard from "./component/productCard";
import ProductDetail from "./pages/user/productDetail";

function App() {
  return (
    <Router>
      <MuiNavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/productList" element={<ProductList />} />
        <Route
          path="/productList/:category"
          element={<ProductListCategory />}
        />
        <Route path="/test" element={<ProductCard />} />
        <Route path="productDetail/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
