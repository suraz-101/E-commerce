import { useNavigate } from "react-router-dom";
import { removeToken } from "../utils/sessionManager";

export const AdminNavbar = () => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    removeToken("token");
    removeToken("currentUser");
    navigate("/");
  };
  return (
    <div className="border text-center p-2">
      <button
        className="border border-gray-200 px-4 py-1 bg-sky-500 text-white"
        onClick={(e) => {
          handleSubmit(e);
        }}
      >
        Logout
      </button>
    </div>
  );
};
