import './App.css'
import Header from "./components/main/Header";
import CoinsTable from "./components/table/CoinsTable";
import CurrencyChooseWrapper from "./components/main/CurrencyChooseWrapper";

function App() {
  return (
    <div className="h-screen bg-dark-sub">
      <Header name={"coinViewer"}/>
      <div className="container mx-auto">
        <CurrencyChooseWrapper/>
        <CoinsTable />
      </div>
    </div>
  )
}

export default App
