import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./admin/Admin";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import FanDashboard from "./pages/FanDashboard";
import DiscoverArtists from "./pages/DiscoverArtists";
import ArtistProfile from "./pages/ArtistProfile";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      {

      }
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/artists" element={<DiscoverArtists />} />
      <Route path="/artists/:id" element={<ArtistProfile />} />

      {

      }
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <FanDashboard />
          </ProtectedRoute>
        } 
      />

      {
        
      }
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute roleRequired="admin">
            <Admin />
          </ProtectedRoute>
        } 
      />

      {
        
      }
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}