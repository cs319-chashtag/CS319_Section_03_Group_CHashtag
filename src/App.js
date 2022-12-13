import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/loginpage/login_page";
import StudentPage from "./pages/studentpage/student_page";

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route exact path="/loginPage" element={<LoginPage />} />
                    <Route path="/studentActions" element={<StudentPage />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
