// Admin page guard: check localStorage session instead of Internet Identity
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Re-export the existing admin content
import AdminDashboard from "./AdminDashboardContent";
import { getAdminSession } from "./AdminLoginPage";

export default function AdminPage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!getAdminSession()) {
      navigate("/admin-login");
    }
  }, [navigate]);

  if (!getAdminSession()) return null;

  return <AdminDashboard />;
}
