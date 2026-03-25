import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AdminAuthProvider } from './context/AdminAuthProvider';
import { Header } from './components/Header';
import { LandingPage } from './pages/LandingPage';
import { ApplyForm } from './pages/ApplyForm';
import { AdminPage } from './pages/AdminPage';

export default function App() {
  return (
    <BrowserRouter>
      <AdminAuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/apply" element={<ApplyForm />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </AdminAuthProvider>
    </BrowserRouter>
  );
}