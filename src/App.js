import "./App.css";
import React, { useState, useEffect } from "react";
import Card from "./Components/Card";
import Home from "./Home";
import NotFound from "./NotFound";
import { HashRouter, Route, Routes } from "react-router-dom";

function App() {
    return (
        <HashRouter>
            <main className="App">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/channel/:id" element={<Card />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
        </HashRouter>
    );
}

export default App;
