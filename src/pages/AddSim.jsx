import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Jumbotron from "../Jumbotron/jumbotron";
import SimForm from "../components/SimForm";
import { createSimCard } from "../api/simCard";

const AddSim = () => {
  const navigate = useNavigate();

  const initialValues = {
    iccid: "",
    cnic: "",
    msisdn: "",
    carrier: "",
    planType: "",
    status: "",
    assignedTo: "",
    activationDate: new Date().toLocaleDateString("en-CA"),
  };

  const handleAdd = (values) =>
    createSimCard(values)
      .then(() => {
        toast.success("SIM Added Successfully!");
        navigate("/");
      })
      .catch((err) => {
        toast.error(err?.response?.data?.detail || "Failed to add SIM!");
      });

  return (
    <div>
      <Jumbotron>
        <h1 className="text-center fw-bold">REGISTER NEW SIM</h1>
      </Jumbotron>
      <div className="container" style={{ overflowX: "hidden" }}>
        <SimForm
          heading="Add Your SIM Details"
          initialValues={initialValues}
          activationHint="Automatically set to today's date"
          submitLabel="Add SIM"
          onSubmit={handleAdd}
        />
      </div>
    </div>
  );
};

export default AddSim;
