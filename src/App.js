import React from "react";
import './App.css';

import NavigationRouter from "./navigation/NavigationRouter";
import RequiredFooter from "./components/RequiredFooter"
import Header from "./components/Header"

function App() {
    return (
        <div className="App">
            <NavigationRouter />
            <RequiredFooter />
        </div>
    );
}

export default App;
