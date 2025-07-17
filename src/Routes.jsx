import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./Components/MainLayout";
import Home from "./Components/Home";
import ParentDashboard from "./Components/Dashboard/Parents/ParentDashboard";
import TeacherDashboard from "./Components/Dashboard/Teacher/TeacherDashboard";
import AdminDashboard from "./Components/Dashboard/Admin/AdminDashboard";

import ManageTeachers from "./Components/Dashboard/Admin/ManageTeachers";
import ManageParents from "./Components/Dashboard/Admin/ManageParents";
import ManageStudents from "./Components/Dashboard/Admin/ManageStudents";
import MyClass from "./Components/Dashboard/Teacher/MyClass";
import Homework from "./Components/Dashboard/Teacher/Homework";
import AttendancePage from "./Components/Dashboard/Teacher/AttendancePage";
import AddResultPage from "./Components/Dashboard/Teacher/AddResultPage";
import MyChild from "./Components/Dashboard/Parents/MyChild";
import AttendanceCalendar from "./Components/Dashboard/Parents/AttendanceCalendar";
import ReportCard from "./Components/Dashboard/Parents/ReportCard";
import HomeworkParent from "./Components/Dashboard/Parents/HomeworkParent";
import AdminSetting from "./Components/Dashboard/Admin/AdminSetting";
import TeacherSettings from "./Components/Dashboard/Teacher/TeacherSettings";
import ParentSettings from "./Components/Dashboard/Parents/ParentSettings";





const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,

      },
      {
        path: "/dashboard/parent",
        element: <ParentDashboard></ParentDashboard>,
        children: [
          {
            index: true,
            element:<MyChild></MyChild> ,

          },
          {
            path: "mychild",
            element:<MyChild></MyChild> ,

          },
          {
            path: "homework",
            element:<HomeworkParent></HomeworkParent> ,

          },
          {
            path: "attendance",
            element:<AttendanceCalendar></AttendanceCalendar> ,

          },
          {
            path: "report",
            element:<ReportCard></ReportCard> ,

          },
          {
            path: "settings",
            element:<ParentSettings></ParentSettings> ,

          },

        ],

      },
      {
        path: "/dashboard/teacher",
        element: <TeacherDashboard></TeacherDashboard>,
        children: [
          {
            index: true,
            element: <MyClass></MyClass>,

          },
          {
            path: "myclass",
            element: <MyClass></MyClass>,

          },
          {
            path: "homework",
            element: <Homework></Homework>,

          },
          {
            path: "attendance",
            element: <AttendancePage></AttendancePage>,

          },
          {
            path: "result",
            element: <AddResultPage></AddResultPage>,

          },
          {
            path: "settings",
            element:<TeacherSettings></TeacherSettings>,

          },

        ],

      },
      {
        path: "/dashboard/admin",
        element: <AdminDashboard></AdminDashboard>,
        children: [
          {
            index: true,
            element: <ManageTeachers></ManageTeachers>,

          },
          {
            path: "teachers",
            element: <ManageTeachers></ManageTeachers>,

          },
          {
            path: "parents",
            element: <ManageParents></ManageParents>,

          },
          {
            path: "students",
            element: <ManageStudents></ManageStudents>,

          },
          {
            path: "setting",
            element: <AdminSetting></AdminSetting>,

          },

        ],

      },


    ],


  },
]);



export default router;