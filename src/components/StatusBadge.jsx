
const StatusBadge = ({status}) => {
  const key = (status || "").toLowerCase();
        return (
        <span className={`status-${key}`}>{(status || "").toUpperCase()}</span>
        )
}

export default StatusBadge