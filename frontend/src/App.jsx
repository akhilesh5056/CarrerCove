import './App.css'
import AdminJobs from './components/admin/AdminJobs'
import ProtectedRoute from './components/admin/AdminRoute'
import Applicants from './components/admin/Applicants'
import Companies from './components/admin/Companies'
import CompanyCreate from './components/admin/CompanyCreate'
import CompanySetUp from './components/admin/CompanySetUp'
import PostJob from './components/admin/PostJob'
import Login from './components/auth/Login'
import SignUp from './components/auth/SignUp'
import Browse from './components/Browse'
import Home from './components/Home'
import JobDescription from './components/JobDescription'
import Jobs from './components/Jobs'
import Profile from './components/Profile'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

function App() {
  const appRouter=createBrowserRouter([
    {
      path:"/",
      element:<Home/>
    },
    {
      path:"/login",
      element:<Login/>
    },
    {
      path:"/signUp",
      element:<SignUp/>
    },
    {
      path:"/jobs",
      element:<Jobs/>
    },
    {
      path:"/description/:id",
      element:<JobDescription/>
    },
    {
      path:"/browse",
      element:<Browse/>
    },
    {
      path:"/profile",
      element:<Profile/>
    },
    
    {
      path:"/admin/companies",
      element:<ProtectedRoute><Companies/></ProtectedRoute>
    },
    {
      path:"/admin/companies/create",
      element:<CompanyCreate/>
    },
    {
      path:"/admin/companies/:id",
      element:<CompanySetUp/>
    },
    {
      path:"/admin/jobs",
      element:<AdminJobs/>
    },
    {
      path:"/admin/jobs/create",
      element:<PostJob/>
    },
    {
      path:"/admin/jobs/:id/applicants",
      element:<Applicants/>
    },

  ])

  return (
    <>
      <RouterProvider router={appRouter} ></RouterProvider>
    </>
  )
}

export default App
