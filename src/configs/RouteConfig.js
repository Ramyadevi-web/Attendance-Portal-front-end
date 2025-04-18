import ForgotPassword from "../controller/Authentication/ForgotPassword"
import Login from "../controller/Authentication/Login"
import Signup from "../controller/Authentication/Signup"
import AdminDashboard from "../controller/Dashboard/AdminController/AdminDashboard"
import AddUser from "../controller/Dashboard/AdminController/AddUser.jsx"
import ManageUsers from "../controller/Dashboard/AdminController/ManageUsers.jsx"
import EditUser from "../controller/Dashboard/AdminController/EditUser.jsx"
import StudentDashboard from "../controller/Dashboard/StudentDashboard.jsx"
import TeacherDashboard from "../controller/Dashboard/TeacherController/TeacherDashboard.jsx"
import viewAttendance from "../controller/Dashboard/TeacherController/viewAttendance.jsx"
import ResetPassword from "../controller/Authentication/ResetPassword.jsx"

export const PRIVATE_ROUTES = [
    {
        title:'Student Dashboard',
        Component: StudentDashboard,
        path:'/student-dashboard',
        role:"Student"
    },
    {
        title:'Teacher Dashboard',
        Component: TeacherDashboard,
        path:'/teacher-dashboard',
        role:"Teacher"
    },
    {
        title:'Admin Dashboard',
        Component : AdminDashboard,
        path:'/admin-dashboard',
        role:"Admin"
    },
    {
        title:'Add User',
        Component : AddUser,
        path:'/add-user',
        role:"Admin"
    },
    {
        title:'Manage User',
        Component : ManageUsers,
        path:'/manage-users',
        role:"Admin"
    },
    {
        title:'Edit User',
        Component : EditUser,
        path:'/manage-users/edit-user',
        role:"Admin"
    },
    {
        title:'Teacher Dashboard',
        Component: TeacherDashboard,
        path:'/teacher-dashboard',
        role:'Teacher'
    },
    {
        title:'View Attendance',
        Component: viewAttendance,
        path:'/teacher-dashboard/view-attendance',
        role:'Teacher'
    },
    {
        title:'Student Dashboard',
        Component: StudentDashboard,
        path:'/student-dashboard',
        role:'Student'
    }
]

export const PUBLIC_ROUTES = [
    {
        title:'Login',
        Component: Login,
        path:'/'
    },
    {
        title:'Signup',
        Component: Signup,
        path:'/signup'
    },
    {
        title:'Forgot Password',
        Component: ForgotPassword,
        path:'/forgot-password'
    },
    {
        title:'Reset Password',
        Component: ResetPassword,
        path:'/reset-password/:token'
    }
]