import { Suspense, lazy, useEffect, useLayoutEffect, useRef } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import gsap from "gsap";
import { GlobalProvider } from "./context/GlobalContext";
import { MainLayout } from "./components/templates/MainLayout";
import ProtectedRoute from "./components/utilities/ProtectedRoute";
import HomePage from "./pages/HomePage";
import "./index.css";

const CertificatesPage = lazy(() => import("./pages/CertificatesPage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));

const RouteLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900">
    <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
  </div>
);

const PageTransition = ({ children }) => {
  const containerRef = useRef(null);
  const location = useLocation();

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    gsap.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.35, ease: "power2.out" }
    );
  }, [location.pathname]);

  return (
    <div ref={containerRef} className="w-full">
      {children}
    </div>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();

  useEffect(() => {
    if (!location.state?.scrollTo) {
      window.scrollTo(0, 0);
      if (window.lenis) {
        window.lenis.scrollTo(0, { immediate: true });
      }
    }
  }, [location.pathname, location.state]);

  return (
    <MainLayout>
      <Suspense fallback={<RouteLoader />}>
        <PageTransition>
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
        </PageTransition>
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
