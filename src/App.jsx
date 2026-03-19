import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import './styles/variables.css';
import './index.css';

import { Navbar, Footer, FloatingReserveBtn } from './components';
import { Home, Menu, Reservations, Gallery, Contact, AboutUs, Login, Signup } from './pages';
import { AuthContext, AuthProvider } from './context';

function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function Layout({ children, footerVariant = 'full' }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <FloatingReserveBtn />
      <Footer variant={footerVariant} />
    </>
  );
}

function AuthLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/"             element={<Layout><Home /></Layout>} />
          <Route path="/menu"         element={<Layout><Menu /></Layout>} />
          <Route path="/reservations" element={
            <ProtectedRoute>
              <Layout><Reservations /></Layout>
            </ProtectedRoute>
          } />
          <Route path="/gallery"      element={<Layout footerVariant="light"><Gallery /></Layout>} />
          <Route path="/contact"      element={<Layout><Contact /></Layout>} />
          <Route path="/about"        element={<Layout><AboutUs /></Layout>} />
          <Route path="/login"        element={<AuthLayout><Login /></AuthLayout>} />
          <Route path="/signup"       element={<AuthLayout><Signup /></AuthLayout>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
