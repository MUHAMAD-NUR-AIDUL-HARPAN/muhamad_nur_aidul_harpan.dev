import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { GlobalProvider } from "./context/GlobalContext";
import { MainLayout } from "./components/templates/MainLayout";
import HomePage from "./pages/HomePage";
import CertificatesPage from "./pages/CertificatesPage";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/utilities/ProtectedRoute";
import "./index.css"; //
// Wrapper component to use useLocation hook inside Router
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <MainLayout>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/certificates" element={<CertificatesPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </AnimatePresence>
    </MainLayout>
  );
};

function App() {
  return (
    <GlobalProvider>
      <Router>
        <AnimatedRoutes />
      </Router>
    </GlobalProvider>
  );
}

export default App;
