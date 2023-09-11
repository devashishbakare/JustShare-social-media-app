import HomePage from "./components/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../src/components/Login/LoginPage";
import ResisterPage from "./components/Login/ResisterPage";
import Profile from "./components/ProfilePage/Profile";
import { ProfilePost } from "./components/ProfilePost";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<ResisterPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profilePost" element={<ProfilePost />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
