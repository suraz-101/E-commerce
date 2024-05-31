import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./components/Route";
import { AdminLayout } from "./layout/AdminLayout";
import { AppLayout } from "./layout/AppLayout";
import { Home } from "./pages/admin/Home";
import { CheckOut } from "./pages/CheckOut";
import { HomePage } from "./pages/HomePage";
import { Login } from "./pages/Login";
import { ProductDetail } from "./pages/ProductDetail";
import { Products } from "./pages/Products";
import { Profile } from "./pages/Profile";
import { Registration } from "./pages/Registration";

function App() {
  return (
    <>
      <Routes>
        <Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Route>

        {/* users route */}
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="profile" element={<Profile />} />
          <Route path="products" element={<Products />} />
          <Route path="productsDetail/:id" element={<ProductDetail />} />
          <Route path="checkOut" element={<CheckOut />} />
        </Route>

        {/* admin route */}
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
