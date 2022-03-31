import Landing from "./pages/Landing.js";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import CategoryPage from "./components/CategoryPage.js";
import ProductDetail from "./components/ProductDetail.js";
import { useAppContext } from "./context/AppContext.js";
import Cart from "./pages/Cart.js";
import OrdersList from "./components/OrdersList.js";
import OrdersDetailPage from "./components/OrdersDetailPage.js";

function App() {
  const { loading } = useAppContext();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/categories/:categoryId" element={<CategoryPage />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<OrdersList />} />
        <Route path="/orders/:id" element={<OrdersDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
