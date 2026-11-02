import { Button } from "reactstrap";
import Jumbotron from "../Jumbotron/jumbotron";
import { Row } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { getAllSimCards } from "../api/simCard";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import "../styles/home.css"
import { FiList, FiPlusCircle } from "react-icons/fi";
import { STAT_META } from './../components/dash/statMeta';
import StatCard from "../components/dash/StatCard";

const Home = () => {
  const navigate = useNavigate();

  const [simData, setSimData] = useState([])

  useEffect(()=>{
    getAllSimCards().then((res)=> setSimData(res.data)).catch(()=> toast.error("Failed to load SIM data!!"))
  },[])
  const countByStatus = (status) => status === "TOTAL" ? simData.length : simData.filter((sim) => sim.status === status).length;
  return (
    <div>
      <div>
        <Jumbotron>
          <h1 className="text-center fw-bold">
            WELCOME TO SIM MANAGEMENT SYSTEM
          </h1>
          <p className="home-hero-sub">
            Track, manage and control every SIM from one place.
          </p>
        </Jumbotron>

        <div className="container">
          <Row className="text-center g-3 justify-content-center mb-5 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5">
            {
              STAT_META.map(({key, label, Icon})=>(
                <StatCard
                key={key}
                label={label}
                value={countByStatus(key)}
                Icon={Icon}
                tone={key.toLowerCase()}
                 />
              ))
            }
          </Row>
        </div>

        <hr className="my-4" style={{ width: "80%", margin: "20px auto" }} />

        <p className="text-center text-muted my-3">
          Manage your SIM inventory below
        </p>

        <div className="text-center my-4">
          <hr style={{ width: "60%", margin: "0 auto 15px" }} />
          <p className="text-muted mb-3">Quick Actions</p>
        </div>

        <div className="d-flex justify-content-center flex-wrap gap-3 mb-4">
          <Button color="success" className="home-action-btn" onClick={() => navigate(`/sim-list`)}>
            <FiList /> View All SIMs
          </Button>
          <Button
            className="home-action-btn"
            color="primary"
            onClick={() => navigate(`/add-sim`)}
          >
            <FiPlusCircle /> Register New Sim
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
