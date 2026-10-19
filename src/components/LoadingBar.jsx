import { Progress } from "reactstrap"

const LoadingBar = () => {
  return (
    <div className="px-4">
        <Progress animated striped color="primary" value={100}/>
    </div>
  )
}

export default LoadingBar