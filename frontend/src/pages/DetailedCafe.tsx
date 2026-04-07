import { useLocation } from "react-router-dom";

export default function DetailedCafe() {
  const location = useLocation();
  const state = location.state as { cafe: any };
  const name = state.cafe.name;
  const latitude = state.cafe.latitude;
  const longitude = state.cafe.longitude;

  return (
    <div className="max-w-md mx-auto p-6 bg-white border rounded-lg shadow-sm font-sans">
      <h1 className="text-2xl font-bold mb-6">{name}</h1>
      <p className="text-lg text-gray-600 mb-4">
        <span className="font-semibold">Latitude:</span> {latitude}
      </p>
      <p className="text-lg text-gray-600 mb-4">
        <span className="font-semibold">Longitude:</span> {longitude}
      </p>
    </div>
  );
}
