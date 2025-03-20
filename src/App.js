import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Editor from "./components/Editor";
import MainLayout from "./components/MainLayout";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/editor"
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
