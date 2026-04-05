import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { SimpleAlertDialog } from "@/components/ui/alert-dialog";
import { favouriteService } from "../services/favouriteApi";
import { useAuth } from "@/context/AuthContext";

interface Cafe {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export default function Home() {
  const [cafes, setCafes] = useState<Cafe[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  const handleDelete = async (cafeId: number) => {
    setError(null);
    setIsLoading(true);
    try {
      await favouriteService.delete(cafeId);
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to delete favourite");
    } finally {
      // Refresh cafe list after deletion
      setIsLoading(false);
      setCafes((prev) => prev.filter((cafe) => cafe.id !== cafeId));
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      favouriteService
        .getAll()
        .then((data) => {
          setCafes(data);
          setIsLoading(false);
        })
        .catch((err: any) => {
          if (err.response?.status === 404) {
            setCafes([]);
            setError(null);
          } else {
            setError(err.message || "Failed to fetch favourites");
          }
          setIsLoading(false);
        });
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-[80vh] font-sans">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Welcome to Study Spots!</h2>
          <p className="text-gray-500 mb-6">
            Please log in to view and manage your favorite cafes.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 font-sans">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Study Spots</h1>
          <p className="text-gray-500 mt-2">
            Find your perfect work environment
          </p>
        </div>
      </div>

      {error && (
        <div className="p-4 mb-6 bg-red-50 text-red-600 rounded-md border border-red-200">
          Error: {error}
        </div>
      )}

      {isLoading ? (
        <p className="text-gray-500 animate-pulse">Loading cafes...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cafes.map((cafe) => (
            <Card key={cafe.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">{cafe.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 mb-1">
                  <span className="font-semibold">Lat:</span> {cafe.latitude}
                </p>
                <p className="text-sm text-gray-500">
                  <span className="font-semibold">Lng:</span> {cafe.longitude}
                </p>
              </CardContent>
              <CardFooter>
                <Link to={`/edit/${cafe.id}`} state={{ cafe }}></Link>
                <SimpleAlertDialog
                  title="Delete"
                  description={`Are you sure you want to delete "${cafe.name}"? This action cannot be undone.`}
                  confirmText="Delete"
                  onConfirm={() => handleDelete(cafe.id)}
                  triggerContent={
                    <Button variant="destructive">Remove Cafe</Button>
                  }
                ></SimpleAlertDialog>
              </CardFooter>
            </Card>
          ))}

          {cafes.length === 0 && !error && (
            <p className="text-gray-500 col-span-full text-center py-10">
              No cafes found. Be the first to add one!
            </p>
          )}
        </div>
      )}
    </div>
  );
}
