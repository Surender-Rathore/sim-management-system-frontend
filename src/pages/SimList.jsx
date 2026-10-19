import SimTable from "../components/SimTable"
import Jumbotron from "../Jumbotron/jumbotron"

const SimList = () => {
  return (
    <div>
      <Jumbotron>
        <h1 className="text-center fw-bold">ALL SIM DETAIL</h1>
      </Jumbotron>
      <SimTable />
    </div>
  )
}

export default SimList