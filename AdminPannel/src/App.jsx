import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import AdminLayout from "../Layout/AdminLayout";

/* ================= DASHBOARD ================= */

import DashBoard from "./Pages/DashBoard/DashBoard";

/* ================= AUTH ================= */

import LoginForm from "./Pages/LoginForm/LoginForm";

/* ================= NEWS ================= */

import NewsPosting from "./Pages/NewsPosting/NewsPosting";

import CommentManagement from "./Pages/CommentManagement/CommentManagement";

/* ================= TEACHER ================= */

import Teacher from "./Pages/Teacher/Teacher";

/* ================= TESTIMONIAL ================= */

import Testimonial from "./Pages/Testimonial/Testimonial";

/* ================= GALLERY ================= */

import Galleryposting from "./Component/Galleryposting/Galleryposting";

/* ================= COLD LEAD ================= */

import ColdLead from "./Component/ColdLead/ColdLead";

import ColdLeadTable from "./Component/ColdLeadTable/ColdLeadTable";

/* ================= ADMISSION ================= */

import AdmissionTable from "./Component/AdmissionTable/AdmissionTable";

import StudentAdmission from "./Pages/StudentAdmission/StudentAdmission";

import StudentAdmsnDetails from "./Pages/StudentAdmsnDetails/StudentAdmsnDetails";

/* ================= PROFILE ================= */

import ProFilePicture from "./Pages/ProFilePicture/ProFilepicture";

/* ================= FEES ================= */

import FeeCollection from "./Component/FeeCollection/FeeCollection";

import FeeType from "./Component/FeeType/FeeType";

/* ================= CLASS ================= */

import ClassesAdmin from "./Pages/ClassesAdmin/ClassesAdmin";

import ClassPost from "./Pages/ClassPost/ClassPost";

/* ================= SUBJECT ================= */

import SubjectAdmin from "./Pages/SubjectAdmin/SubjectAdmin";

import ClassWiseSubjectAdmin from "./Pages/ClassWiseSubjectAdmin/ClassWiseSubjectAdmin";

/* ================= EXAM ================= */

import ExamResult from "./Pages/ExamResult/ExamResult";

import ExamResultAdmin from "./Pages/ExamResultAdmin/ExamResultAdmin";

import ExamTypeAdmin from "./Pages/ExamTypeAdmin/ExamTypeAdmin";

import ExamProgressReport from "./Pages/ExamProgressReport/ExamProgressReport";

/* ================= ATTENDANCE ================= */

import StudentAttendance from "./Pages/Studentattendance/Studentattendance";

import Studentleave from "./Pages/Studentleave/Studentleave";

import AttendanceReport from "./Pages/AttendanceReport/AttendanceReport";

/* ================= EXPENSE ================= */

import AddExpense from "./Pages/AddExpense/AddExpense";

import ExpenseSearch from "./Pages/ExpenseSearch/ExpenseSearch";

import ExpenseHead from "./Pages/ExpenseHead/ExpenseHead";

/* ================= ADVERTISE ================= */

import AdvitesForm from "./Pages/AdvitesForm/AdvitesForm";

/* ================= PROTECTED ROUTE ================= */

const ProtectedRoute = ({
  children,
}) => {
  const isLoggedIn =
    localStorage.getItem(
      "adminAuth"
    ) === "true";

  return isLoggedIn ? (
    children
  ) : (
    <Navigate
      to="/login"
      replace
    />
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

        {/* ================= ADMIN ================= */}

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

          {/* ================= NEWS ================= */}

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

          {/* ================= GALLERY ================= */}

          <Route
            path="admin/gallery"
            element={<Galleryposting />}
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

          {/* ================= ADMISSION ================= */}

          <Route
            path="admin/Admission-Table"
            element={<AdmissionTable />}
          />

          {/* ================= PROFILE ================= */}

          <Route
            path="admin/profile"
            element={<ProFilePicture />}
          />

          {/* ================= STUDENTS ================= */}

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

          {/* ================= CLASS ================= */}

          <Route
            path="class-post"
            element={<ClassesAdmin />}
          />

          <Route
            path="class/post"
            element={<ClassPost />}
          />

          {/* ================= SUBJECT ================= */}

          <Route
            path="subject-post"
            element={<SubjectAdmin />}
          />

          <Route
            path="classwise-subject"
            element={<ClassWiseSubjectAdmin />}
          />

          {/* ================= EXAM ================= */}

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

          {/* ================= ADVERTISE ================= */}

          <Route
            path="admin/advites"
            element={<AdvitesForm />}
          />

        </Route>

        {/* ================= INVALID ================= */}

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;