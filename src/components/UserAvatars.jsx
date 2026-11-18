import { getInitials } from "../utils/userFormat";
import PropTypes from "prop-types";
const UserAvatar = ({ name, src, size = 36 }) => {
  const style = { width: size, height: size, fontSize: size * 0.4 };
  if (src) {
    return <img src={src} alt={name} className="user-avatar" style={style} />;
  }
  return (
    <div
      className="user-avatar user-avatar-initials"
      style={style}
      role="img"
      aria-label={name}
    >
      {getInitials(name)}
    </div>
  );
};

UserAvatar.propTypes = {
  name: PropTypes.string.isRequired,
  src: PropTypes.string,
  size: PropTypes.number,
};

export default UserAvatar;