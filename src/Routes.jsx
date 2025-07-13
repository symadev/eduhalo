import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./Components/MainLayout";
import Home from "./Components/Home";
import ParentDashboard from "./Components/Dashboard/Parents/ParentDashboard";
import TeacherDashboard from "./Components/Dashboard/Teacher/TeacherDashboard";
import AdminDashboard from "./Components/Dashboard/Admin/AdminDashboard";
import Child from "./Components/Dashboard/Parents/Child";
import ManageTeachers from "./Components/Dashboard/Admin/ManageTeachers";
import ManageParents from "./Components/Dashboard/Admin/ManageParents";
import ManageStudents from "./Components/Dashboard/Admin/ManageStudents";




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
        element:<ParentDashboard></ParentDashboard>,
          children: [
            {
        path: "child",
        element: <Child></Child>,

      },

          ],

      },
        {
        path: "/dashboard/teacher",
        element:<TeacherDashboard></TeacherDashboard>,

      },
        {
        path: "/dashboard/admin",
        element:<AdminDashboard></AdminDashboard>,
        children: [
            {
        path: "teachers",
        element:<ManageTeachers></ManageTeachers>,

      },
            {
        path: "parents",
        element:<ManageParents></ManageParents>,

      },
            {
        path: "students",
        element:<ManageStudents></ManageStudents>,

      },

          ],

      },
      
      
    ],
   

  },
]);



export default router;