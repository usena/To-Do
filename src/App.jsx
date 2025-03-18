import { Routes, Route } from "react-router";
import { Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { getCurrentUser } from "./services/authService";
import Signup from "./pages/Signup"
import Profile from "./pages/Profile";

function App() {
  const PrivateRoute = ({ children }) => {
    return getCurrentUser() ? children : <Navigate to="/signin" />;
  };

  return (
    <>
      <Toaster />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        
        <Route path="/signup" element={<Signup/>} />
        <Route path="/signin" element={<LoginPage />} />
        <Route path="/profile" element={<Profile/>}/>

        {/* prevent user after login */}
        <Route path="*" element={<Navigate to="/signin" />} />
      </Routes>
    </>
  );
}

export default App;
