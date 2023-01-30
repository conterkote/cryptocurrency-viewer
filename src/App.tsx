import './App.css'
import Header from "./components/main/Header";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Start from "./pages/Start";
import Favourite from "./pages/Favourite";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-dark-sub antialiased">
        <Header name={"coinViewer"}/>
        <div className="h-screen">
          <Routes>
            <Route path={"/"} element={<Start />}/>
            <Route path={"/favourite"} element={<Favourite />}/>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
