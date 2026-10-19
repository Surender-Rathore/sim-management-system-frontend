import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddSim from "./pages/AddSim.jsx";
import SimList from "./pages/SimList.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import EditSim from "./pages/EditSim.jsx";
import { Toaster } from "react-hot-toast";
import Layout from "./components/Layout.jsx";
function App() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Toaster />

      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-sim" element={<AddSim />} />
            <Route path="/sim-list" element={<SimList />} />
            <Route path="/sim-edit/:id" element={<EditSim />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
