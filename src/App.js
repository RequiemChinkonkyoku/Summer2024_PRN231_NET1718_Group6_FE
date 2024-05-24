import logo from "./logo.svg";
import "./App.css";
import Sidebar from "./components/Sidebar";
import DashboardHead from "./components/DashboardHead";
import Table from "./components/Table";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS
import "./assets/css/nucleo-icons.css"; // Local CSS file for icons
import "./assets/css/nucleo-svg.css"; // Local CSS file for SVGs
import "./assets/css/material-dashboard.css"; // Local CSS for material dashboard

function App() {
  return (
    <div>
      <DashboardHead />
      <Sidebar />
      <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
        <div class="container fluid py-4">
          <div class="row">
            <Table />
          </div>
        </div>
      </main>
    </div>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
