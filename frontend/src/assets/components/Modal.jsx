import Modal from 'react-modal';
import "../styles/Modal.css";
import PropTypes from "prop-types";

const CustomModal = ({isOpen, onClose, constructor}) => {
    return(<Modal
        isOpen = {isOpen}
        onRequestClose={onClose}
        className = "modal"
        overlayClassName = "overlay"
        >
        {constructor}
        <button className='btnModal' onClick={onClose} type="button">X</button>
    </Modal>
)};

// PropTypes validálás
CustomModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,  // Ellenőrzi, hogy a isOpen boolean típusú és kötelező
    onClose: PropTypes.func.isRequired, // Ellenőrzi, hogy az onClose egy funkció és kötelező
    constructor: PropTypes.node.isRequired, // A constructor prop egy React elem, tehát node típusú
};

export default CustomModal;
