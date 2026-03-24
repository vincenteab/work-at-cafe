import Home from "./pages/Home";
import { Button } from "./components/ui/button";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import AddCafe from "./pages/AddCafe";
import EditCafe from "./pages/EditCafe";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        {/* A simple global navigation bar */}
        <nav className="bg-white border-b p-4 mb-8">
          <div className="max-w-5xl mx-auto flex justify-between items-center">
            <Link to="/" className="text-xl font-bold">
              Study Spots
            </Link>
            <Link to="/add">
              <Button variant="outline">Add a Cafe</Button>
            </Link>
          </div>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddCafe />} />
            <Route path="/edit/:id" element={<EditCafe />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
