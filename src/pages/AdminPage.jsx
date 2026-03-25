import { useAdminAuth } from '../context/AdminAuthProvider';
import { AdminDashboard } from './AdminDashboard';
import { AdminLoginForm } from '../components/AdminLoginForm';

export function AdminPage() {
  const { isAdmin } = useAdminAuth();

  if (!isAdmin) {
    return <AdminLoginForm />;
  }

  return <AdminDashboard />;
}