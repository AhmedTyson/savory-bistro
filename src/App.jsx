import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Navbar             from './components/Navbar/Navbar';
import Footer             from './components/Footer/Footer';
import FloatingReserveBtn from './components/FloatingReserveBtn/FloatingReserveBtn';

import Home         from './pages/Home/Home';
import Menu         from './pages/Menu/Menu';
import Reservations from './pages/Reservations/Reservations';
import Gallery      from './pages/Gallery/Gallery';
import Contact      from './pages/Contact/Contact';
import AboutUs      from './pages/AboutUs/AboutUs';
import Login        from './pages/Login/Login';
import Signup       from './pages/Signup/Signup'; 

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <FloatingReserveBtn />
      <Footer />
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

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login"        element={<AuthLayout><Login /></AuthLayout>} />
          <Route path="/signup"       element={<AuthLayout><Signup /></AuthLayout>} />
          <Route path="/"             element={<Layout><Home /></Layout>} />
          <Route path="/menu"         element={<Layout><Menu /></Layout>} />
          <Route path="/reservations" element={<Layout><Reservations /></Layout>} />
          <Route path="/gallery"      element={<Layout><Gallery /></Layout>} />
          <Route path="/contact"      element={<Layout><Contact /></Layout>} />
          <Route path="/about"        element={<Layout><AboutUs /></Layout>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
