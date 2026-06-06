import World from "./components/3d/World"
import MainPage from "./components/pages/Main"
import { PictureProvider } from "./context/PictureContext"

function App() {
  return (
   <PictureProvider>
    <div className="bg-teal-200 relative ">
     <MainPage />
     <World />
    </div>
   </PictureProvider>
  )
}

export default App
