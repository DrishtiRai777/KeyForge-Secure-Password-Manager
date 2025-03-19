import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import Manager from "./components/Manager"
function App() {
  return (
    <>
      <div className="flex">
        <Navbar/>
        <Manager/>
      </div>
      <Footer/>
    </>
  )
}

export default App
