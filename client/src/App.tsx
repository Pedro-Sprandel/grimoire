import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import { AuthProvider } from "./providers/authProvider";
import ProtectedRoute from "./components/wrappers/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home";
import "./styles/tailwind.css";
import Layout from "./components/wrappers/Layout";
import BookPage from "./pages/BookPage";

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
          <Route path="/books/:id" element={
            <ProtectedRoute>
              <Layout>
                <BookPage />
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
