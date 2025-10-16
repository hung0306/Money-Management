import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AOS from 'aos';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Method from './components/Method';
import ScrollToTop from './components/ScrollTopTop';
import Footer from './components/Footer';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Income from './income/Income';
import Expenses from './expenses/Expenses';
import Reports from './reports/Reports';
import ProtectedRoute from './middleware/ProtectedRoute';

function App() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Hero />
              <Problem />
              <Method />
              <Pricing />
              <Testimonials />
              <Footer />
            </>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          }
        />
        <Route
          path="/expenses"
          element={
            <ProtectedRoute>
              <Expenses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/income"
          element={
            <ProtectedRoute>
              <Income />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
