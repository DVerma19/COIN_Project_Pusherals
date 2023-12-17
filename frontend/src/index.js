import * as React from "react";
import * as ReactDOM from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import App from "./App";
import Signup from "./pages/Signup";
import Signin from './pages/Signin';
import theme from "./theme";

const PrivateRoute = ({ element, ...props }) => {
  const jwtToken = localStorage.getItem('pusheralsToken');

  if (!jwtToken) {
    // Redirect to sign-in if the JWT token is not found
    return <Navigate to="/signin" />;
  }

  // Render the private route
  return React.cloneElement(element, props);
};

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <ThemeProvider theme={theme}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
    <ToastContainer />
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={<PrivateRoute element={<App />} />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </div>
    </Router>
  </ThemeProvider>
);
