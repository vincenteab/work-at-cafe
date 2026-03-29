import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import Home from "./pages/Home";
import AddCafe from "./pages/AddCafe";
import Login from "./pages/Login";
import { Button } from "@/components/ui/button";
import { AuthProvider, useAuth } from "./context/AuthContext";

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white border-b p-4 mb-8">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Study Spots
        </Link>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <span className="text-sm text-gray-600">
                Welcome, {user?.name || "User"}!
              </span>
              <Link to="/add">
                <Button variant="outline">Add a Cafe</Button>
              </Link>
              <Button onClick={handleLogout} variant="ghost">
                Log Out
              </Button>
            </>
          ) : (
            <Link to="/login">
              <Button>Log In</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    // 1. Wrap the entire app in the AuthProvider
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50 font-sans">
          {/* 2. Insert the smart Navbar */}
          <Navbar />

          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add" element={<AddCafe />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
