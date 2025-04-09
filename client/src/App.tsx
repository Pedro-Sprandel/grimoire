import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import { AuthProvider } from "./contexts/authProvider";
import ProtectedRoute from "./components/wrappers/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home";
import "./styles/tailwind.css";
import Layout from "./components/wrappers/Layout";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <Layout>
                <Home />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
