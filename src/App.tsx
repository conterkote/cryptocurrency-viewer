import './App.css'
import Header from "./components/main/Header";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Start from "./pages/Start";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-dark-sub antialiased">
        <Header name={"coinViewer"}/>
        <div className="h-screen">
          <Routes>
            <Route path={"/"} element={<Start/>}/>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
