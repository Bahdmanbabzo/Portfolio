import Loader from "./components/Loader"
import World from "./components/World"
import Page from "./components/pages/Page"
function App() {
  return (
   <div className="bg-teal-200 relative h-screen">
    {/* <Loader /> */}
    <Page />
    <World />
   </div>
  )
}

export default App
