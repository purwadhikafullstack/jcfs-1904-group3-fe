import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/user/landingPage";
import MuiNavBar from "./component/navigation/users";
import ProductList from "./pages/user/productList";
import ProductListCategory from "./pages/user/productList/category";
import ProductListSearch from "./pages/user/productList/search";
import ProductDetail from "./pages/user/productDetail";
import AdminModifyProducts from "./pages/admin/warehouseAdmin/modifyProducts";
import SalesReport from "./pages/admin/warehouseAdmin/salesReport";

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
        <Route path="/admin/sales-report" element={<SalesReport />} />
        <Route path="/admin/products" element={<AdminModifyProducts />} />
        <Route path="product-detail/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
