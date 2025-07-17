import { Route, Routes, useLocation } from "react-router"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer";
import Home from "./pages/Home";


function App() {
  const isOwnerPath = useLocation().pathname.includes("owner");

  return (
   <div>
      {!isOwnerPath && <Navbar />}
      <div className="min-h-[70vh]">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
      <Footer />  
   </div>
  )
}

export default App
