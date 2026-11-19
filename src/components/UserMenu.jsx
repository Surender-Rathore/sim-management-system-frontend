import { useState } from "react";
import { MOCK_USER } from "../data/mockUser";
import toast from "react-hot-toast";
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import UserAvatar from "./UserAvatars";
import { maskCnic, maskPhone } from "../utils/userFormat";
import { Link } from "react-router-dom";
import {
  FiLock,
  FiLogOut,
  FiMonitor,
  FiSettings,
  FiUser,
} from "react-icons/fi";
import ConfirmModal from "./ConfirmModal";
import "../styles/user-menu.css";

const MODAL_CONFIG = {
  logout: {
    title: "Log out",
    message: "Do you want to log out of this device",
    confirmText: "Log out",
    successMessage: "Logged out (demo message)",
  },
  logoutAll: {
    title: "Log out from all devices",
    message:
      "You will be logged out of all devices. You will need to log in again.",
    confirmText: "Log out everywhere",
    successMessage: "Log out from all devices (demo)",
  },
};
const UserMenu = () => {
  const [openModal, setOpenModel] = useState(null);
  const user = MOCK_USER;
  const closeModal = () => setOpenModel(null);
  const handleConfirm = () => {
    toast.success(MODAL_CONFIG[openModal].successMessage);
    closeModal();
  };
  return (
    <>
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret className="user-menu-toggle">
          <UserAvatar name={user.name} src={user.avatarUrl} size={30} />
          <span>{user.name}</span>
        </DropdownToggle>
        <DropdownMenu end className="user-menu-dropdown">
          <div className="user-menu-header">
            <UserAvatar name={user.name} src={user.avatarUrl} size={52} />
            <div>
              <div className="user-menu-name">{user.name}</div>
              <div className="user-menu-email">{user.email}</div>
              <Badge pill className="user-role-badge">
                {user.role}
              </Badge>
            </div>
          </div>
          <div className="user-menu-details">
            <div>
              <span>CNIC</span>
              <span>{maskCnic(user.cnic)}</span>
            </div>
            <div>
              <span>Phone</span>
              <span>{maskPhone(user.phone)}</span>
            </div>
          </div>

          <DropdownItem divider className="my-0" />
          <DropdownItem tag={Link} to="/profile">
            <FiUser /> My profile
          </DropdownItem>
          <DropdownItem tag={Link} to="/settings">
            <FiSettings /> Settings
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem header>Security</DropdownItem>
          <DropdownItem tag={Link} to="/settings" state={{ tab: "security" }}>
            <FiLock /> Change password
          </DropdownItem>
          <DropdownItem onClick={() => setOpenModel("logoutAll")}>
            <FiMonitor /> Log out from all devices
          </DropdownItem>

          <DropdownItem divider />
          <DropdownItem
            className="text-danger"
            onClick={() => setOpenModel("logout")}
          >
            <FiLogOut /> Log out
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
      {openModal && (
        <ConfirmModal
          isOpen
          title={MODAL_CONFIG[openModal].title}
          message={MODAL_CONFIG[openModal].message}
          confirmText={MODAL_CONFIG[openModal].confirmText}
          confirmColor="danger"
          onConfirm={handleConfirm}
          onCancel={closeModal}
        />
      )}
    </>
  );
};

export default UserMenu;
