import Footer from "./components/Footer"
import PasswordNavbar from "./components/Navbar"
import Manager from "./components/Manager"
import Home from "./pages/Home"
import Contact from "./pages/Contact"
import Faq from "./pages/Faq"
import About from "./pages/About"
import Navbar from "./components/Navbar2"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

function App() {
  const router = createBrowserRouter ([
    {
      path: "/",
      element: <><Navbar/><Home/><Footer/></>
    },
    {
      path: "/about",
      element: <><Navbar/><About/><Footer/></>
    },
    {
      path: "/password",
      element: <><div className="flex"><PasswordNavbar/><Manager/></div><Footer/></>
    },
    {
      path: "/contact",
      element: <><Navbar/><Contact/><Footer/></>
    },
    {
      path: "/faq",
      element: <><Navbar/><Faq/><Footer/></>
    },

  ])
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
