import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./components/Route";
import { AdminLayout } from "./layout/AdminLayout";
import { AppLayout } from "./layout/AppLayout";
import { Home } from "./pages/admin/Home";
import { HomePage } from "./pages/HomePage";
import { Login } from "./pages/login";
import { Profile } from "./pages/profile";
function App() {
  return (
    <>
      <Routes>
        <Route>
          <Route path="/login" element={<Login />} />
        </Route>

        {/* users route */}
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="profile" element={<Profile />} />
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
