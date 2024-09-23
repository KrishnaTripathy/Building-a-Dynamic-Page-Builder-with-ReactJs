import React from "react";
import { useDroppable } from "@dnd-kit/core";


export function Droppable(props) {
  const { items, setItems } = props;

  const { isOver, setNodeRef } = useDroppable({
    id: "droppable",
  });

  const handleDelete = (id) => {
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
  };

  const handleEdit = (id) => {
    props.setEditableItem(id);
    props.openModal(true);
  };

  function getDroppableItem() {
    return items.map((dragged) => {
      const type = dragged.type;
      switch (type) {
        case "label":
          return (
            <div key={dragged.id} className="droppable-item">
              <label>{dragged.name}</label>
              <button
                className="btn-edit"
                onClick={() => handleEdit(dragged.id)}
              >
                Edit
              </button>
              <button
                className="btn-delete"
                onClick={() => handleDelete(dragged.id)}
              >
                Delete
              </button>
            </div>
          );
        case "input":
          return (
            <div key={dragged.id} className="droppable-item">
              <input type="text" placeholder={"Enter your name"} />
              <button
                className="btn-delete"
                onClick={() => handleDelete(dragged.id)}
              >
                Delete
              </button>
            </div>
          );
        case "checkbox":
          return (
            <div key={dragged.id} className="droppable-item">
              <input type="checkbox" />
              <button
                className="btn-delete"
                onClick={() => handleDelete(dragged.id)}
              >
                Delete
              </button>
            </div>
          );
        case "button":
          return (
            <div key={dragged.id} className="droppable-item">
              <button>{dragged.name}</button>
              <button
                className="btn-edit"
                onClick={() => handleEdit(dragged.id)}
              >
                Edit
              </button>
              <button
                className="btn-delete"
                onClick={() => handleDelete(dragged.id)}
              >
                Delete
              </button>
            </div>
          );
        case "table":
          return (
            <div key={dragged.id} className="droppable-item">
              <p>Table</p>
              <button className="btn-edit">Edit</button>
              <button
                className="btn-delete"
                onClick={() => handleDelete(dragged.id)}
              >
                Delete
              </button>
            </div>
          );
        default:
          return null;
      }
    });
  }

  return (
    <div className="droppable-container" ref={setNodeRef} style={{ backgroundColor: isOver ? "#d1ffd1" : "#f9f9f9" }}>
      {items.length ? (
        getDroppableItem()
      ) : (
        <div className="droppable-placeholder">Drag Here</div>
      )}
    </div>
  );
}
