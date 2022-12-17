import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/loginpage/login_page";
import StudentMainPage from "./pages/student_mainpage/student_mainpage";
import StudentCoursePage from "./pages/student_course_page/student_course_page";
import StudentPreapprovalPage from "./pages/student_preapproval_page/student_preapproval_page";
import StudentProfilePage from "./pages/student_profile_page/student_profile_page";
import StudentLearningAgreementPage from "./pages/student_learning_agreement_page/student_learning_agreement_page";
import StudentHelpPage from "./pages/student_help_page/student_help_page";
import CoordinatorProfilePage from "./pages/coordinator_profile_page/coordinator_profile_page";
import CoordinatorFCTFPage from "./pages/coordinator_fctf_page/coordinator_fctf_page";
import CoordinatorHelpPage from "./pages/coordinator_help_page/coordinator_help_page";
import CoordinatorPreapprovalPage from "./pages/coordinator_prepproval_page/coordinator_prepproval_page";
import CoordinatorLAPage from "./pages/coordinator_learning_agreement_page/coordinator_learning_agreement_page";
import CoordinatorPage from "./pages/coordinator_mainpage/coordinator_mainpage";
import CoordinatorWaitingLAComponent from "./components/coordinator_waiting_la_component/coordinator_waiting_la_component";
import CoordinatorWaitingPreapprovalComponent from "./components/coordinator_waiting_preapproval_component/coordinator_waiting_preapproval_component";
import CoordinatorWaitingListComponent from "./components/coordinator_waiting_list_component/coordinator_waiting_list_component";
import CoordinatorToDoPage from "./pages/coordinator_todo_page/coordinator_todo_page";

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route exact path="/loginPage" element={<LoginPage />} />
                    <Route path="/student" element={<StudentMainPage />} />
                    <Route
                        path="/student/courses"
                        element={<StudentCoursePage />}
                    />
                    <Route
                        path="/student/preapprovalForms"
                        element={<StudentPreapprovalPage />}
                    />
                    <Route
                        path="/student/profile"
                        element={<StudentProfilePage />}
                    />
                    <Route
                        path="/student/learningAgreement"
                        element={<StudentLearningAgreementPage />}
                    />
                    <Route path="/student/help" element={<StudentHelpPage />} />

                    <Route path="/coordinator" element={<CoordinatorPage />} />
                    <Route
                        path="/coordinator/profile"
                        element={<CoordinatorProfilePage />}
                    />
                    <Route
                        path="/coordinator/fctfUpload"
                        element={<CoordinatorFCTFPage />}
                    />
                    <Route
                        path="/coordinator/help"
                        element={<CoordinatorHelpPage />}
                    />
                    <Route
                        path="/coordinator/preapprovalForms"
                        element={<CoordinatorPreapprovalPage />}
                    />
                    <Route
                        path="/coordinator/learningAgreement"
                        element={<CoordinatorLAPage />}
                    />
                    <Route
                        path="/coordinator/learningAgreement"
                        element={<CoordinatorLAPage />}
                    />
                    <Route
                        path="/coordinator/waitingAgreements"
                        element={<CoordinatorWaitingLAComponent />}
                    />
                    <Route
                        path="/coordinator/waitingPreapprovals"
                        element={<CoordinatorWaitingPreapprovalComponent />}
                    />
                    <Route
                        path="/coordinator/waitingList"
                        element={<CoordinatorWaitingListComponent />}
                    />
                    <Route
                        path="/coordinator/todoPage"
                        element={<CoordinatorToDoPage />}
                    />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
