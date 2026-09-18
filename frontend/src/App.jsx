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

}