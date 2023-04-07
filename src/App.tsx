import './App.css'
import Header from "./components/main/Header";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Start from "./pages/Start";
import Favourite from "./pages/Favourite";
import MainWidgetContainer from "./Containers/MainWidgetContainer";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-dark-sub min-h-screen antialiased">
        <Header name={"coinViewer"}/>
        <div className="container mx-auto">
        <MainWidgetContainer />
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
