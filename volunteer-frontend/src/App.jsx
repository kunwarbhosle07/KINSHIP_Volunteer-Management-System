import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Events from "./pages/Events";
import MyVolunteering from "./pages/MyVolunteering";
import Coordinator from "./pages/Coordinator";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>

          <Route path="/events" element={<Events />} />

          <Route
            path="/my-volunteering"
            element={<MyVolunteering />}
          />

          <Route
            path="/coordinator"
            element={<Coordinator />}
          />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;