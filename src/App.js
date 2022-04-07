import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/user/landingPage";
import MuiNavBar from "./component/navigation/users";
import ProductList from "./pages/user/productList";
import ProductListCategory from "./pages/user/productList/category";
import ProductListSearch from "./pages/user/productList/search";
import ProductCard from "./component/productCard";
import ProductDetail from "./pages/user/productDetail";
import Test from "./pages/admin/warehouseAdmin/inputProducts/index";

function App() {
  return (
    <Router>
      {/* <MuiNavBar /> */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/product-list" element={<ProductList />} />
        <Route
          path="/product-list/:category"
          element={<ProductListCategory />}
        />
        <Route
          path="/product-list/search/:keyWord"
          element={<ProductListSearch />}
        />
        <Route path="/test" element={<Test />} />
        <Route path="product-detail/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
