import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./admin/Admin";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import FanDashboard from './pages/FanDashboard';
import DiscoverArtists from './pages/DiscoverArtists'
import ArtistProfile from "./pages/ArtistProfile";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/dashboard" element={<FanDashboard />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
      <Route path="/artists" element={<DiscoverArtists />} />
      <Route path="/artists/:id" element={<ArtistProfile />} />
    </Routes>
  );
}