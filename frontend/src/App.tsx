import { useEffect, useState } from "react";
import { Button } from "./components/ui/button";

// 1. Define the TypeScript shape so React knows what to expect
interface Cafe {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

function App() {
  // 2. Set up React State to hold the data
  const [cafes, setCafes] = useState<Cafe[]>([]);
  const [error, setError] = useState<string | null>(null);

  // 3. The useEffect hook runs once when the page loads
  useEffect(() => {
    // **ENTER YOUR BACKEND URL HERE**
    fetch(`${import.meta.env.VITE_API_URL}/cafes`)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch");
        return response.json();
      })
      .then((data) => setCafes(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>My Study Spots</h1>
      <Button variant={"outline"}>Button</Button>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {cafes.length === 0 && !error ? (
        <p>Loading cafes...</p>
      ) : (
        <ul>
          {cafes.map((cafe) => (
            <li key={cafe.id} style={{ marginBottom: "10px" }}>
              <strong>{cafe.name}</strong>
              <br />
              <small>
                Lat: {cafe.latitude}, Lng: {cafe.longitude}
              </small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
