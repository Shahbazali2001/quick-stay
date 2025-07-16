import { useLocation } from "react-router"
import Navbar from "./components/Navbar"

function App() {
  const isOwnerPath = useLocation().pathname.includes("owner");

  return (
   <div>
      {!isOwnerPath && <Navbar />}
   </div>
  )
}

export default App
