import React from "react";
import { BrowserRouter, BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/loginpage/login_page";
import StudentMainPage from "./pages/student_mainpage/student_mainpage";
import StudentCoursePage from "./pages/student_course_page/student_course_page";
import StudentPreapprovalPage from "./pages/student_preapproval_page/student_preapproval_page";
import StudentProfilePage from "./pages/student_profile_component/student_profile_page";
function App() {
    return (
        <div className="App">
        
            <Router>
                <Routes>
                    <Route exact path="/loginPage" element={<LoginPage />} />
                    <Route
                        path="/studentActions"
                        element={<StudentMainPage />}
                    />
                    <Route path="/courses" element={<StudentCoursePage />} />
                    <Route
                        path="/preapprovalForms"
                        element={<StudentPreapprovalPage />}
                    />
                    <Route
                        path="/studentProfile"
                        element={<StudentProfilePage />}
                    />
                </Routes>
            </Router>
        
        </div>
    );
}

export default App;
