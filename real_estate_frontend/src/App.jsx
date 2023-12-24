import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import Profile from "./pages/profile";
import Signup from "./pages/signup";
import Signin from "./pages/signin";
import Navbar from "./components/navbar";
import CreateListing from "./pages/createListing";
import ProtectedRoute from "./components/protectedroute";
import PrivateRoute from "./components/privateroute";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-listing" element={<CreateListing />} />
          {/* <Route
            path="/update-listing/:listingId"
            element={<UpdateListing />}
          /> */}
        </Route>
        <Route path="/*" element={<h1>404 Page not found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
