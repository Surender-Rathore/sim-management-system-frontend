import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Spinner } from "reactstrap";
import Jumbotron from "../Jumbotron/jumbotron";
import SimForm from "../components/SimForm";
import { getSimCardById, updateSimCard } from "../api/simCard";

const EditSim = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [simData, setSimData] = useState(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    getSimCardById(id)
      .then((res) => setSimData(res.data))
      .catch(() => {
        setFailed(true);
        toast.error("Failed to load SIM details!");
      });
  }, [id]);

  const handleUpdate = (values) =>
    updateSimCard(id, values)
      .then(() => {
        toast.success("Updated Successfully!");
        navigate("/");
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.detail || "Failed to update SIM details!",
        );
      });

  return (
    <div>
      <Jumbotron>
        <h1 className="text-center fw-bold">EDIT SIM DETAILS</h1>
      </Jumbotron>
      <div className="container" style={{ overflowX: "hidden" }}>
        {simData ? (
          <SimForm
            heading="Edit Your SIM Detail"
            initialValues={simData}
            activationHint="Activation date can not be changed after registration"
            submitLabel="Submit"
            onSubmit={handleUpdate}
          />
        ) : (
          <div className="text-center my-5">
            {failed ? "Could not load this SIM." : <Spinner />}
          </div>
        )}
      </div>
    </div>
  );
};

export default EditSim;