import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import AdminLayout from "../Layout/AdminLayout";

/* ================= PAGES ================= */

import Teacher from "./Pages/Teacher/Teacher";
import Testimonial from "./Pages/Testimonial/Testimonial";
import CommentManagement from "./Pages/CommentManagement/CommentManagement";
import NewsPosting from "./Pages/NewsPosting/NewsPosting";

import StudentAdmission from "./Pages/StudentAdmission/StudentAdmission";
import StudentAdmsnDetails from "./Pages/StudentAdmsnDetails/StudentAdmsnDetails";

import FeeCollection from "./Component/FeeCollection/FeeCollection";
import FeeType from "./Component/FeeType/FeeType";

import ProFilePicture from "./Pages/ProFilePicture/ProFilepicture";

import DashBoard from "./Pages/DashBoard/DashBoard";

import ColdLead from "./Component/ColdLead/ColdLead";
import Galleryposting from "./Component/Galleryposting/Galleryposting";
import AdmissionTable from "./Component/AdmissionTable/AdmissionTable";
import ColdLeadTable from "./Component/ColdLeadTable/ColdLeadTable";

import ClassesAdmin from "./Pages/ClassesAdmin/ClassesAdmin";
import SubjectAdmin from "./Pages/SubjectAdmin/SubjectAdmin";
import ClassWiseSubjectAdmin from "./Pages/ClassWiseSubjectAdmin/ClassWiseSubjectAdmin";

import ExamResult from "./Pages/ExamResult/ExamResult";
import ExamResultAdmin from "./Pages/ExamResultAdmin/ExamResultAdmin";
import ExamTypeAdmin from "./Pages/ExamTypeAdmin/ExamTypeAdmin";
import ExamProgressReport from "./Pages/ExamProgressReport/ExamProgressReport";

import StudentAttendance from "./Pages/Studentattendance/Studentattendance";
import Studentleave from "./Pages/Studentleave/Studentleave";
import AttendanceReport from "./Pages/AttendanceReport/AttendanceReport";

import AddExpense from "./Pages/AddExpense/AddExpense";
import ExpenseSearch from "./Pages/ExpenseSearch/ExpenseSearch";
import ExpenseHead from "./Pages/ExpenseHead/ExpenseHead";

import LoginForm from "./Pages/LoginForm/LoginForm";

import ClassPost from "./Pages/ClassPost/ClassPost";

/* ================= PROTECTED ROUTE ================= */

const ProtectedRoute = ({ children }) => {
  const isLoggedIn =
    localStorage.getItem("adminAuth") === "true";

  return isLoggedIn ? (
    children
  ) : (
    <Navigate to="/login" replace />
  );
};

/* ================= APP ================= */

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* ================= LOGIN ================= */}

        <Route
          path="/login"
          element={<LoginForm />}
        />

        {/* ================= ADMIN LAYOUT ================= */}

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >

          {/* DASHBOARD */}
          <Route
            index
            element={<DashBoard />}
          />

          {/* ================= NEWS MANAGEMENT ================= */}

          <Route
            path="admin/newsposting"
            element={<NewsPosting />}
          />

          <Route
            path="admin/comment-management"
            element={<CommentManagement />}
          />

          {/* ================= TEACHER ================= */}

          <Route
            path="admin/teacherposting"
            element={<Teacher />}
          />

          {/* ================= TESTIMONIAL ================= */}

          <Route
            path="admin/testimonial"
            element={<Testimonial />}
          />

          {/* ================= STUDENT ================= */}

          <Route
            path="student/admission"
            element={<StudentAdmission />}
          />

          <Route
            path="student/admission/details"
            element={<StudentAdmsnDetails />}
          />

          {/* ================= FEES ================= */}

          <Route
            path="fee-collect"
            element={<FeeCollection />}
          />

          <Route
            path="fee-type"
            element={<FeeType />}
          />

          {/* ================= PROFILE ================= */}

          <Route
            path="admin/profile"
            element={<ProFilePicture />}
          />

          {/* ================= GALLERY ================= */}

          <Route
            path="admin/gallery"
            element={<Galleryposting />}
          />

          {/* ================= ADMISSION ================= */}

          <Route
            path="admin/Admission-Table"
            element={<AdmissionTable />}
          />

          {/* ================= COLD LEAD ================= */}

          <Route
            path="admin/cold-lead"
            element={<ColdLead />}
          />

          <Route
            path="admin/cold-lead-table"
            element={<ColdLeadTable />}
          />

          {/* ================= CLASS POST ================= */}

          <Route
            path="class-post"
            element={<ClassesAdmin />}
          />

          {/* ================= SUBJECT POST ================= */}

          <Route
            path="subject-post"
            element={<SubjectAdmin />}
          />

          {/* ================= CLASSWISE SUBJECT ================= */}

          <Route
            path="classwise-subject"
            element={<ClassWiseSubjectAdmin />}
          />

          {/* ================= EXAM RESULT ================= */}

          <Route
            path="exam-result"
            element={<ExamResult />}
          />

          <Route
            path="exam-result-manager"
            element={<ExamResultAdmin />}
          />

          <Route
            path="exam-type"
            element={<ExamTypeAdmin />}
          />

          <Route
            path="exam-report"
            element={<ExamProgressReport />}
          />

          {/* ================= ATTENDANCE ================= */}

          <Route
            path="attendance/student-attendance"
            element={<StudentAttendance />}
          />

          <Route
            path="attendance/student-leave"
            element={<Studentleave />}
          />

          <Route
            path="attendance/attendance-report"
            element={<AttendanceReport />}
          />

          {/* ================= EXPENSE ================= */}

          <Route
            path="expense/details"
            element={<AddExpense />}
          />

          <Route
            path="expense-search"
            element={<ExpenseSearch />}
          />

          <Route
            path="expense-head"
            element={<ExpenseHead />}
          />

          {/* ================= CLASS POST PAGE ================= */}

          <Route
            path="class/post"
            element={<ClassPost />}
          />

        </Route>

        {/* ================= INVALID ROUTE ================= */}

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;