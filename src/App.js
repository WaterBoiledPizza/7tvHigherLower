import "./App.css";
import React, { useState, useEffect } from "react";
import Card from "./Components/Card";
import Home from "./Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
    return (
        <Router>
            <main className="App">
                {/* <Card /> */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/channel/:id" element={<Card />} />
                </Routes>
            </main>
        </Router>
    );
}

export default App;
