import React from "react";

const Modal = (props) => {
  return (
    <>
      <div className="modal-overlay" onClick={() => props.closeModal(false)} />
      <div className="modal">
        <input
          type="text"
          placeholder="Enter field name"
          onChange={(e) => props.setEditableItemValue(e.target.value)}
        />
        <div className="modal-actions">
          <button className="btn-save" onClick={() => props.handleEdit()}>
            Save
          </button>
          <button className="btn-close" onClick={() => props.closeModal(false)}>
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default Modal;
