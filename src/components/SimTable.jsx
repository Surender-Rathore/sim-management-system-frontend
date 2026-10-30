import { useEffect, useState } from "react";
import { Button, Input, InputGroup, Modal, ModalBody, ModalFooter, ModalHeader, Table } from "reactstrap";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  deleteSimCard,
  getAllSimCards,
  searchByMsisdn,
} from "./../api/simCard";
import LoadingBar from "./LoadingBar";
import StatusBadge from "./StatusBadge";

const SimTable = () => {
  const navigate = useNavigate();
  const [simData, setSimData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const simToDelete = simData.find((sim)=> sim.id === deleteId);

  useEffect(() => {
    getAllSimCards()
      .then((resp) => setSimData(resp.data))
      .catch(() => toast.error("Failed to load SIM cards!"))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = (id) => {
    deleteSimCard(id)
      .then(() => {
        const updatedSims = simData.filter((sim) => sim.id !== id);
        setSimData(updatedSims);
        toast.success("Deleted Successfully!");
      })
      .catch(() => toast.error("Delete Failed!"));
  };

  const confirmDelete = () =>{
    const id = deleteId;
    setDeleteId(null);
    handleDelete(id);
  };

  const handleSearch = () => {
    if (!searchValue.trim()) {
      getAllSimCards()
        .then((resp) => setSimData(resp.data))
        .catch(() => toast.error("Failed to load SIM cards !"));
      return;
    }

    searchByMsisdn(searchValue)
      .then((resp) => setSimData(resp.data))
      .catch(() => toast.error("Search failed !"));
  };
  return (
    <div className="px-4 text-center">

      <InputGroup className="mb-3 rounded-1" style={{maxWidth:"400px", margin: "0 auto 1rem", overflow:"hidden"}}>
      <Input 
      placeholder="Search by phone number"
      value={searchValue}
      onChange={(e)=> setSearchValue(e.target.value)}
      onKeyDown={(e)=> e.key === "Enter" && handleSearch()}
      />
      <Button color="primary" onClick={handleSearch}>
        Search
      </Button>
      </InputGroup>
      {loading ? (
        <LoadingBar />
      ) : (
        <div className="table-responsive">
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Phone Number</th>
                <th>Name</th>
                <th>Status</th>
                <th>Edit / Delete</th>
              </tr>
            </thead>
            <tbody>
              {simData.map((sim) => (
                <tr key={sim.id}>
                  <th scope="row">{sim.id}</th>
                  <td>{sim.msisdn}</td>
                  <td>{sim.assignedTo ?? "-"}</td>
                  <td><StatusBadge status = {sim.status} /></td>
                  <td className="mx-2">
                    <div className="d-flex justify-content-center align-items-center gap-2 flex-nowrap">
                      <Button
                        color="primary"
                        onClick={() => navigate(`/sim-edit/${sim.id}`)}
                      >
                        Edit
                      </Button>
                      <Button
                        color="danger"
                        className="ms-2"
                        onClick={() => setDeleteId(sim.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      <Modal 
      isOpen={deleteId != null}
      toggle={()=> setDeleteId(null)}
      centered
      >
        <ModalHeader toggle={()=> setDeleteId(null)}>
          Confirm Delete
        </ModalHeader>
          <ModalBody>
          Are you sure you want to delete SIM {" "}
          <strong>{simToDelete?.msisdn}</strong>
          {simToDelete?.assignedTo ? `(${simToDelete.assignedTo})` : ""} ? This action cannot be undone.
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={()=> setDeleteId(null)}>Cancel</Button>
            <Button color="danger" onClick={confirmDelete}>Yes, Delete</Button>
          </ModalFooter>

      </Modal>
    </div>
  );
};

export default SimTable;
