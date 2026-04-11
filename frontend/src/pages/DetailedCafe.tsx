import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";
import { favouriteService } from "@/services/favouriteApi";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

export default function DetailedCafe() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const state = location.state as { cafe: any };
  const { user } = useAuth();
  const name = state.cafe.name;
  const latitude = state.cafe.latitude;
  const longitude = state.cafe.longitude;
  const cafeId = state.cafe.id;
  const [isFavourite, setIsFavourite] = useState<boolean>(false);
  const [isChecking, setIsChecking] = useState<boolean>(true);

  useEffect(() => {
    const checkIfFavourite = async () => {
      if (!user) {
        setIsChecking(false);
        return;
      }
      try {
        const favourites = await favouriteService.getAll();
        const favourited = favourites.some(
          (favCafe: any) => favCafe.id === cafeId,
        );
        setIsFavourite(favourited);
      } catch (err) {
        console.error("Failed to check favourite status", err);
      } finally {
        setIsChecking(false);
      }
    };
    checkIfFavourite();
  }, [cafeId, user]);

  const handleFavourite = async () => {
    if (!user) {
      setError("You must be logged in to favourite a cafe.");
      return;
    }

    setError(null);
    setIsLoading(true);
    try {
      await favouriteService.create({
        cafeId: cafeId,
      });
      setIsFavourite(true);
      toast.success("Cafe added to favourites!");
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed favourite cafe");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setError(null);
    setIsLoading(true);
    try {
      await favouriteService.delete(cafeId);
      setIsFavourite(false);
      toast.success("Cafe removed from favourites!");
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to delete favourite");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white border rounded-lg shadow-sm font-sans">
      <h1 className="text-2xl font-bold mb-6">{name}</h1>
      <p className="text-lg text-gray-600 mb-4">
        <span className="font-semibold">Latitude:</span> {latitude}
      </p>
      <p className="text-lg text-gray-600 mb-4">
        <span className="font-semibold">Longitude:</span> {longitude}
      </p>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {!isChecking &&
        (isFavourite ? (
          <Button variant="outline" onClick={handleDelete} disabled={isLoading}>
            {isLoading ? "Removing..." : "Remove Favourite"}
          </Button>
        ) : (
          <Button
            variant="outline"
            onClick={handleFavourite}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Favourite"}
          </Button>
        ))}
    </div>
  );
}
