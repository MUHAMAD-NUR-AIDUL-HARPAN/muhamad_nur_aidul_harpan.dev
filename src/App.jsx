import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { GlobalProvider } from "./context/GlobalContext";
import { MainLayout } from "./components/templates/MainLayout";
import ProtectedRoute from "./components/utilities/ProtectedRoute";
import "./index.css";

// Code splitting (Lazy loading) untuk mempercepat loading awal secara drastis
const HomePage = lazy(() => import("./pages/HomePage"));
const CertificatesPage = lazy(() => import("./pages/CertificatesPage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));

// Loading spinner minimalis saat berpindah rute lazy
const RouteLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900">
    <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
  </div>
);

// Wrapper component to use useLocation hook inside Router
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <MainLayout>
      <Suspense fallback={<RouteLoader />}>
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
      </Suspense>
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
