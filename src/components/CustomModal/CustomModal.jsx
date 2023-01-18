import React, { useEffect } from "react";
import Modal from "react-modal";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function CustomModal({ ...props }) {
  useEffect(() => {
    Modal.setAppElement("body");
  }, []);
  return (
    <Modal isOpen={props.isModalOpen} style={customStyles}>
      <div> Loading... </div>
    </Modal>
  );
}

export default CustomModal;
