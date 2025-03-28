import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Editor from "./components/Editor";
import MainLayout from "./components/MainLayout";
import "./index.css";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Login page */}
        <Route path="/" element={<Login />} />

        {/* Default editor workspace */}
        <Route
          path="/editor"
          element={
            <MainLayout>
              <Editor />
            </MainLayout>
          }
        />

        {/* Optional: Open specific editor directly from the sidebar */}
        <Route
          path="/editor/:year/:date/:id"
          element={
            <MainLayout>
              <Editor />
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
