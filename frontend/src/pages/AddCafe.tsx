import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cafeService } from "../services/cafeApi";

export default function AddCafe() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await cafeService.create({
        name,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        // We hardcode userId: 2 for now until we build the login system!
        userId: 2,
      });

      // Redirects user back to homepage if success
      navigate("/");
    } catch (err: any) {
      setError(
        err.response?.data?.error ||
          "Failed to create cafe. Make sure User #2 exists!",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white border rounded-lg shadow-sm font-sans">
      <h1 className="text-2xl font-bold mb-6">Add a New Study Spot</h1>

      {error && (
        <div className="p-3 mb-4 text-sm text-red-600 bg-red-50 rounded-md border border-red-200">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Input */}
        <div className="space-y-2">
          <Label htmlFor="name">Cafe Name</Label>
          <Input
            id="name"
            placeholder="e.g. The Daily Grind"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Should save an address instead of lat and long */}
        <div className="space-y-2">
          <Label htmlFor="latitude">Latitude</Label>
          <Input
            id="latitude"
            type="number"
            step="any"
            placeholder="e.g. 49.2827"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="longitude">Longitude</Label>
          <Input
            id="longitude"
            type="number"
            step="any"
            placeholder="e.g. -123.1207"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            required
          />
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Cafe"}
        </Button>
      </form>
    </div>
  );
}
