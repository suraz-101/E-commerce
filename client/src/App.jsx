import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./components/Route";
import { AdminLayout } from "./layout/AdminLayout";
import { AppLayout } from "./layout/AppLayout";
import { AddCategory } from "./pages/admin/addCategory";
import { AddProduct } from "./pages/admin/AddPorudct";
import { CategoryManagement } from "./pages/admin/CategoryManagement";
import { CategoryUpdate } from "./pages/admin/CategoryUpdate";
import { Home } from "./pages/admin/Home";
import { ProductManagement } from "./pages/admin/ProductManagement";
import { UpdateProduct } from "./pages/admin/UpdateProduct";
import { UsersList } from "./pages/admin/UsersList";
import { CheckOut } from "./pages/CheckOut";
import { ForgerPassword } from "./pages/ForgerPassword";
import { HomePage } from "./pages/HomePage";
import { Login } from "./pages/Login";
import { ProductDetail } from "./pages/ProductDetail";
import { Products } from "./pages/Products";
import { Profile } from "./pages/Profile";
import { Registration } from "./pages/Registration";
import { VerifyOtp } from "./pages/VerifyOtp";

function App() {
  return (
    <>
      <Routes>
        <Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/forgetPassword" element={<ForgerPassword />} />
          <Route path="/verifyOtp" element={<VerifyOtp />} />
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
            <PrivateRoute role="admin">
              <AdminLayout />
            </PrivateRoute>
          }
        >
          <Route
            index
            element={
              <PrivateRoute role="admin">
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="addProduct"
            element={
              <PrivateRoute role="admin">
                <AddProduct />
              </PrivateRoute>
            }
          />
          <Route
            path="usersLists"
            element={
              <PrivateRoute role="admin">
                <UsersList />
              </PrivateRoute>
            }
          />
          <Route
            path="products"
            element={
              <PrivateRoute role="admin">
                <ProductManagement />
              </PrivateRoute>
            }
          />
          <Route
            path="updateProduct"
            element={
              <PrivateRoute role="admin">
                <UpdateProduct />
              </PrivateRoute>
            }
          />
          <Route
            path="categories"
            element={
              <PrivateRoute role="admin">
                <CategoryManagement />
              </PrivateRoute>
            }
          />
          <Route
            path="addCategory"
            element={
              <PrivateRoute role="admin">
                <AddCategory />
              </PrivateRoute>
            }
          />
          <Route
            path="categories/:id"
            element={
              <PrivateRoute role="admin">
                <CategoryUpdate />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
