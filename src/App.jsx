import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ConsumerFeed from "./pages/ConsumerFeed";
import PhotoDetail from "./pages/PhotoDetail";
import CreatorUpload from "./pages/CreatorUpload";
import NotFound from "./pages/NotFound";
import RequireAuth from "./auth/RequireAuth";
import RequireRole from "./auth/RequireRole";

export default function App() {
  return (
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<ConsumerFeed />} />
          <Route path="/photo/:id" element={<PhotoDetail />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<RequireAuth />}>
            <Route element={<RequireRole role="Creator" />}>
              <Route path="/creator/upload" element={<CreatorUpload />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
  );
}
