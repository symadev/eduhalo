import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./Components/MainLayout";
import Home from "./Components/Home";
import ParentDashboard from "./Components/Dashboard/Parents/ParentDashboard";
import TeacherDashboard from "./Components/Dashboard/Teacher/TeacherDashboard";
import AdminDashboard from "./Components/Dashboard/Admin/AdminDashboard";



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

      },
        {
        path: "/dashboard/teacher",
        element:<TeacherDashboard></TeacherDashboard>,

      },
        {
        path: "/dashboard/admin",
        element:<AdminDashboard></AdminDashboard>,

      },
      
      
    ],
   

  },
]);



export default router;