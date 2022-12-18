import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginCoordinatorPage from "./pages/loginpages/login_coordinator_page";
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
import HomePage from "./pages/homepage/homepage";
import AdminMainpage from "./pages/admin_mainpage/admin_mainpage";
import InstructorMainPage from "./pages/instructor_mainpage/instructor_mainpage";
import LoginSelectionPage from "./pages/login_selection_page/login_selection_page";
import LoginInstructorPage from "./pages/loginpages/login_instructor_page";
import LoginStudentPage from "./pages/loginpages/login_student_page";
import LoginAdminPage from "./pages/loginpages/login_admin_page";
import InstructorHelpPage from "./pages/instructor_help_page/instructor_help_page";
import InstructorProfileComponent from "./components/instructor_profile_component/instructor_profile_component";
import InstructorToDoPage from "./pages/instructor_todo_page/instructor_todo_page";

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route
                        path="/loginSelection"
                        element={<LoginSelectionPage />}
                    />
                    <Route
                        exact
                        path="/loginCoordinator"
                        element={<LoginCoordinatorPage />}
                    />
                    <Route
                        exact
                        path="/loginAdmin"
                        element={<LoginAdminPage />}
                    />
                    <Route
                        exact
                        path="/loginStudent"
                        element={<LoginStudentPage />}
                    />
                    <Route
                        exact
                        path="/loginInstructor"
                        element={<LoginInstructorPage />}
                    />
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
                    <Route path="/" element={<HomePage />} />
                    <Route path="/admin" element={<AdminMainpage />} />
                    <Route
                        path="/instructor"
                        element={<InstructorMainPage />}
                    />
                    <Route
                        path="/instructor/help"
                        element={<InstructorHelpPage />}
                    />
                    <Route
                        path="/instructor/profile"
                        element={<InstructorProfileComponent />}
                    />
                    <Route
                        path="/instructor/todoPage"
                        element={<InstructorToDoPage />}
                    />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
