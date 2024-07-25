import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages";

// const fonts = [
//     "Arial, sans-serif",
//     "Courier New, monospace",
//     "Georgia, serif",
//     "Times New Roman, serif",
//     "Trebuchet MS, sans-serif",
//     "Verdana, sans-serif",
//     "Lucida Console, monospace",
//     "Comic Sans MS, cursive, sans-serif",
// ];

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </Router>
    );
}

export default App;
