import PropTypes from "prop-types"
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"

const ConfirmModal = ({isOpen, title, message, confirmText = "Confirm", confirmColor = "primary", onConfirm, onCancel}) => {
  return (
        <>
        <Modal isOpen={isOpen} toggle={onCancel} centered>
                <ModalHeader toggle={onCancel}>{title}</ModalHeader>
                <ModalBody>{message}</ModalBody>
                <ModalFooter>
                        <Button color="secondary" outline onClick={onCancel}>
                                Cancel
                        </Button>
                        <Button color={confirmColor} onClick={onConfirm}>{confirmText}</Button>
                </ModalFooter>
        </Modal>
        </>
  )
}

ConfirmModal.prototypes={
        isOpen:PropTypes.bool.isRequired,
        title:PropTypes.string.isRequired,
        message:PropTypes.string.isRequired,
        confirmText:PropTypes.string,
        confirmColor:PropTypes.string,
        onConfirm:PropTypes.func.isRequired,
        onCancel:PropTypes.func.isRequired,
}

export default ConfirmModal