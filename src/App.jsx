import Footer from "./components/Footer"
import PasswordNavbar from "./components/PasswordNavbar"
import Manager from "./components/Manager"
import Home from "./pages/Home"
import Contact from "./pages/Contact"
import Faq from "./pages/Faq"
import About from "./pages/About"
import GenNavbar from "./components/GeneralNavbar"
import HomeNavbar from "./components/HomeNavbar"
import Register from "./auth/Register"
import Login from "./auth/Login"
import Enable2FA from "./auth/Enable2FA"
import PswdReset from "./auth/PswdReset"
import ForgetPswd from "./auth/ForgetPswd"
import TwoFactorSetupAgain from "./auth/TwoFactorSetupAgain"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

function App() {
  const router = createBrowserRouter ([
    {
      path: "/",
      element: <><HomeNavbar/><Home/><Footer/></>
    },
    {
      path: "/about",
      element: <><GenNavbar/><About/><Footer/></>
    },
    {
      path: "/password",
      element: <><div className="flex"><PasswordNavbar/><Manager/></div><Footer/></>
    },
    {
      path: "/contact",
      element: <><GenNavbar/><Contact/><Footer/></>
    },
    {
      path: "/faq",
      element: <><GenNavbar/><Faq/><Footer/></>
    },
    {
      path: "/register",
      element: <><Register/></>
    },
    {
      path: "/login",
      element: <><Login/></>
    },
    {
      path: "/2fa",
      element: <><Enable2FA/></>
    },
    {
      path: "/2fa/reset-password",
      element: <><PswdReset/></>
    }, 
    {
      path: "/2fa/forgetPswd",
      element: <><ForgetPswd/></>
    },
    {
      path: "/2fa/set2fa",
      element: <><TwoFactorSetupAgain/></>
    }
  ])
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
